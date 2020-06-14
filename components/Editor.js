// Theirs
import React from 'react'
import domtoimage from 'dom-to-image'
import Dropzone from 'dropperx'
import debounce from 'lodash.debounce'
import dynamic from 'next/dynamic'

// Ours
import ApiContext from './ApiContext'
import Dropdown from './Dropdown'
import Settings from './Settings'
import Toolbar from './Toolbar'
import Overlay from './Overlay'
import BackgroundSelect from './BackgroundSelect'
import Carbon from './Carbon'
import ExportMenu from './ExportMenu'
import CopyMenu from './CopyMenu'
import Themes from './Themes'
import TweetButton from './TweetButton'
import FontFace from './FontFace'
import LanguageIcon from './svg/Language'
import {
  LANGUAGES,
  LANGUAGE_MIME_HASH,
  LANGUAGE_MODE_HASH,
  LANGUAGE_NAME_HASH,
  DEFAULT_EXPORT_SIZE,
  COLORS,
  EXPORT_SIZES_HASH,
  DEFAULT_CODE,
  DEFAULT_SETTINGS,
  DEFAULT_LANGUAGE,
  DEFAULT_THEME,
  FONTS,
} from '../lib/constants'
import { serializeState, getRouteState } from '../lib/routing'
import { getSettings, unescapeHtml, formatCode, omit } from '../lib/util'

const languageIcon = <LanguageIcon />

const SnippetToolbar = dynamic(() => import('./SnippetToolbar'), {
  loading: () => null,
})

const getConfig = omit(['code'])
const unsplashPhotographerCredit = /\n\n\/\/ Photo by.+?on Unsplash/

class Editor extends React.Component {
  static contextType = ApiContext

  constructor(props) {
    super(props)
    this.state = {
      ...DEFAULT_SETTINGS,
      ...this.props.snippet,
      loading: true,
    }

    this.exportImage = this.exportImage.bind(this)
    this.copyImage = this.copyImage.bind(this)
    this.updateSetting = this.updateSetting.bind(this)
    this.updateLanguage = this.updateLanguage.bind(this)
    this.updateBackground = this.updateBackground.bind(this)
    this.resetDefaultSettings = this.resetDefaultSettings.bind(this)
    this.getCarbonImage = this.getCarbonImage.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  async componentDidMount() {
    const { queryState } = getRouteState(this.props.router)

    const newState = {
      // IDEA: we could create an interface for loading this config, so that it looks identical
      // whether config is loaded from localStorage, gist, or even something like IndexDB
      // Load options from gist or localStorage
      ...(this.props.snippet ? null : getSettings(localStorage)),
      // and then URL params
      ...queryState,
      loading: false,
    }

    // Makes sure the slash in 'application/X' is decoded
    if (newState.language) {
      newState.language = unescapeHtml(newState.language)
    }

    if (newState.fontFamily && !FONTS.find(({ id }) => id === newState.fontFamily)) {
      newState.fontFamily = DEFAULT_SETTINGS.fontFamily
    }

    this.setState(newState)

    this.isSafari =
      window.navigator &&
      window.navigator.userAgent.indexOf('Safari') !== -1 &&
      window.navigator.userAgent.indexOf('Chrome') === -1
    this.isFirefox =
      window.navigator &&
      window.navigator.userAgent.indexOf('Firefox') !== -1 &&
      window.navigator.userAgent.indexOf('Chrome') === -1
  }

  carbonNode = React.createRef()

  getTheme = () => this.props.themes.find(t => t.id === this.state.theme) || DEFAULT_THEME

  onUpdate = debounce(updates => this.props.onUpdate(updates), 750, {
    trailing: true,
    leading: true,
  })

  updateState = updates => this.setState(updates, () => this.onUpdate(this.state))

  updateCode = code => this.updateState({ code })
  updateWidth = width => this.setState({ widthAdjustment: false, width })

  async getCarbonImage(
    {
      format,
      type,
      squared = this.state.squaredImage,
      exportSize = (EXPORT_SIZES_HASH[this.state.exportSize] || DEFAULT_EXPORT_SIZE).value,
      includeTransparentRow = false,
    } = { format: 'png' }
  ) {
    // if safari, get image from api
    const isPNG = format !== 'svg'
    if (this.context.image && this.isSafari && isPNG) {
      const themeConfig = this.getTheme()
      // pull from custom theme highlights, or state highlights
      const encodedState = serializeState({
        ...this.state,
        highlights: { ...themeConfig.highlights, ...this.state.highlights },
      })
      return this.context.image(encodedState)
    }

    const node = this.carbonNode.current

    const map = new Map()
    const undoMap = value => {
      map.forEach((value, node) => (node.innerHTML = value))
      return value
    }

    if (isPNG) {
      node.querySelectorAll('span[role="presentation"]').forEach(node => {
        if (node.innerText && node.innerText.match(/%[A-Fa-f0-9]{2}/)) {
          map.set(node, node.innerHTML)
          node.innerText.match(/%[A-Fa-f0-9]{2}/g).forEach(t => {
            node.innerText = node.innerText.replace(t, encodeURIComponent(t))
          })
        }
      })
    }

    const width = node.offsetWidth * exportSize
    const height = squared ? node.offsetWidth * exportSize : node.offsetHeight * exportSize

    const config = {
      style: {
        transform: `scale(${exportSize})`,
        'transform-origin': 'center',
        background: squared ? this.state.backgroundColor : 'none',
      },
      filter: n => {
        if (n.className) {
          const className = String(n.className)
          if (className.includes('eliminateOnRender')) {
            return false
          }
          if (className.includes('CodeMirror-cursors')) {
            return false
          }
          if (className.includes('twitter-png-fix')) {
            return includeTransparentRow
          }
        }
        return true
      },
      width,
      height,
    }

    // current font-family used
    const fontFamily = this.state.fontFamily
    try {
      // TODO consolidate type/format to only use one param
      if (type === 'objectURL') {
        if (format === 'svg') {
          return (
            domtoimage
              .toSvg(node, config)
              .then(dataUrl =>
                dataUrl
                  .replace(/&nbsp;/g, '&#160;')
                  // https://github.com/tsayen/dom-to-image/blob/fae625bce0970b3a039671ea7f338d05ecb3d0e8/src/dom-to-image.js#L551
                  .replace(/%23/g, '#')
                  .replace(/%0A/g, '\n')
                  // remove other fonts which are not used
                  .replace(
                    new RegExp('@font-face\\s+{\\s+font-family: (?!"*' + fontFamily + ').*?}', 'g'),
                    ''
                  )
              )
              // https://stackoverflow.com/questions/7604436/xmlparseentityref-no-name-warnings-while-loading-xml-into-a-php-file
              .then(dataUrl => dataUrl.replace(/&(?!#?[a-z0-9]+;)/g, '&amp;'))
              .then(uri => uri.slice(uri.indexOf(',') + 1))
              .then(data => new Blob([data], { type: 'image/svg+xml' }))
              .then(data => window.URL.createObjectURL(data))
          )
        }

        return await domtoimage.toBlob(node, config).then(blob => window.URL.createObjectURL(blob))
      }

      if (type === 'blob') {
        return await domtoimage.toBlob(node, config)
      }

      // Twitter needs regular dataurls
      return await domtoimage.toPng(node, config)
    } finally {
      undoMap()
    }
  }

  tweet = () => {
    this.getCarbonImage({ format: 'png', includeTransparentRow: true }).then(
      this.context.tweet.bind(null, this.state.code || DEFAULT_CODE)
    )
  }

  exportImage(format = 'png', options = {}) {
    const link = document.createElement('a')

    const prefix = options.filename || 'carbon'

    return this.getCarbonImage({ format, type: 'objectURL' }).then(url => {
      if (format !== 'open') {
        link.download = `${prefix}.${format}`
      }
      if (this.isFirefox) {
        link.target = '_blank'
      }
      link.href = url
      document.body.appendChild(link)
      link.click()
      link.remove()
    })
  }

  copyImage() {
    return this.getCarbonImage({ format: 'png', type: 'blob' }).then(blob =>
      navigator.clipboard.write([
        new window.ClipboardItem({
          'image/png': blob,
        }),
      ])
    )
  }

  updateSetting(key, value) {
    this.updateState({ [key]: value })
    if (Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, key)) {
      this.updateState({ preset: null })
    }
  }

  resetDefaultSettings() {
    this.updateState(DEFAULT_SETTINGS)
    this.props.onReset()
  }

  onDrop([file]) {
    if (file.type.split('/')[0] === 'image') {
      this.updateState({
        backgroundImage: file.content,
        backgroundImageSelection: null,
        backgroundMode: 'image',
        preset: null,
      })
    } else {
      this.updateState({ code: file.content, language: 'auto' })
    }
  }

  updateLanguage(language) {
    if (language) {
      this.updateSetting('language', language.mime || language.mode)
    }
  }

  updateBackground({ photographer, ...changes } = {}) {
    if (photographer) {
      this.updateState(({ code = DEFAULT_CODE }) => ({
        ...changes,
        code:
          code.replace(unsplashPhotographerCredit, '') +
          `\n\n// Photo by ${photographer.name} on Unsplash`,
        preset: null,
      }))
    } else {
      this.updateState({ ...changes, preset: null })
    }
  }

  updateTheme = theme => this.updateState({ theme })
  updateHighlights = updates =>
    this.setState(({ highlights = {} }) => ({
      highlights: {
        ...highlights,
        ...updates,
      },
    }))

  createTheme = theme => {
    this.props.updateThemes(themes => [theme, ...themes])
    this.updateTheme(theme.id)
  }

  removeTheme = id => {
    this.props.updateThemes(themes => themes.filter(t => t.id !== id))
    if (this.state.theme.id === id) {
      this.updateTheme(DEFAULT_THEME.id)
    }
  }

  applyPreset = ({ id: preset, ...settings }) => this.updateState({ preset, ...settings })

  format = () =>
    formatCode(this.state.code)
      .then(this.updateCode)
      .catch(() => {
        // create toast here in the future
      })

  handleSnippetCreate = () =>
    this.context.snippet
      .create(this.state)
      .then(data => this.props.setSnippet(data))
      .then(() =>
        this.props.setToasts({
          type: 'SET',
          toasts: [{ children: 'Snippet duplicated!', timeout: 3000 }],
        })
      )

  handleSnippetDelete = () =>
    this.context.snippet
      .delete(this.props.snippet.id)
      .then(() => this.props.setSnippet(null))
      .then(() =>
        this.props.setToasts({
          type: 'SET',
          toasts: [{ children: 'Snippet deleted', timeout: 3000 }],
        })
      )

  render() {
    const {
      highlights,
      language,
      backgroundColor,
      backgroundImage,
      backgroundMode,
      code,
      exportSize,
    } = this.state

    const config = getConfig(this.state)

    const theme = this.getTheme()

    return (
      <div className="editor">
        <Toolbar>
          <Themes
            theme={theme}
            highlights={highlights}
            update={this.updateTheme}
            updateHighlights={this.updateHighlights}
            remove={this.removeTheme}
            create={this.createTheme}
            themes={this.props.themes}
          />
          <Dropdown
            title="Language"
            icon={languageIcon}
            selected={
              LANGUAGE_NAME_HASH[language] ||
              LANGUAGE_MIME_HASH[language] ||
              LANGUAGE_MODE_HASH[language] ||
              LANGUAGE_MODE_HASH[DEFAULT_LANGUAGE]
            }
            list={LANGUAGES}
            onChange={this.updateLanguage}
          />
          <div className="toolbar-second-row">
            <BackgroundSelect
              onChange={this.updateBackground}
              updateHighlights={this.updateHighlights}
              mode={backgroundMode}
              color={backgroundColor}
              image={backgroundImage}
              carbonRef={this.carbonNode.current}
            />
            <Settings
              {...config}
              onChange={this.updateSetting}
              resetDefaultSettings={this.resetDefaultSettings}
              format={this.format}
              applyPreset={this.applyPreset}
              getCarbonImage={this.getCarbonImage}
            />
            <div id="style-editor-button" />
            <div className="buttons">
              <CopyMenu copyImage={this.copyImage} />
              <TweetButton onClick={this.tweet} />
              <ExportMenu
                onChange={this.updateSetting}
                exportImage={this.exportImage}
                exportSize={exportSize}
                backgroundImage={backgroundImage}
              />
            </div>
          </div>
        </Toolbar>

        <Dropzone accept="image/*, text/*, application/*" onDrop={this.onDrop}>
          {({ canDrop }) => (
            <Overlay
              isOver={canDrop}
              title={`Drop your file here to import ${canDrop ? '✋' : '✊'}`}
            >
              {/*key ensures Carbon's internal language state is updated when it's changed by Dropdown*/}
              <Carbon
                key={language}
                ref={this.carbonNode}
                config={this.state}
                onChange={this.updateCode}
                updateWidth={this.updateWidth}
                loading={this.state.loading}
                theme={theme}
              >
                {code != null ? code : DEFAULT_CODE}
              </Carbon>
            </Overlay>
          )}
        </Dropzone>
        {this.props.snippet && (
          <SnippetToolbar
            snippet={this.props.snippet}
            onCreate={this.handleSnippetCreate}
            onDelete={this.handleSnippetDelete}
            name={config.name}
            onChange={this.updateSetting}
          />
        )}
        <FontFace {...config} />
        <style jsx>
          {`
            .editor {
              background: ${COLORS.BLACK};
              border: 3px solid ${COLORS.SECONDARY};
              border-radius: 8px;
              padding: 16px;
            }

            .buttons {
              display: flex;
              margin-left: auto;
            }
            .toolbar-second-row {
              height: 40px;
              display: flex;
              flex: 1 1 auto;
            }
            .toolbar-second-row > :global(div:not(:last-of-type)) {
              margin-right: 0.5rem;
            }

            #style-editor-button {
              display: flex;
              align-items: center;
            }
          `}
        </style>
      </div>
    )
  }
}

Editor.defaultProps = {
  onUpdate: () => {},
  onReset: () => {},
}

export default Editor
