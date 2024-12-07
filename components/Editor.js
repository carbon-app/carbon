// Theirs
import React from 'react'
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
import ShareMenu from './ShareMenu'
import CopyMenu from './CopyMenu'
import Themes from './Themes'
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
import { getRouteState } from '../lib/routing'
import { getSettings, unescapeHtml, formatCode, omit } from '../lib/util'
import domtoimage from '../lib/dom-to-image'

const languageIcon = <LanguageIcon />

const SnippetToolbar = dynamic(() => import('./SnippetToolbar'), {
  loading: () => null,
})

const getConfig = omit(['code', 'titleBar'])
const unsplashPhotographerCredit = /\n\n\/\/ Photo by.+?on Unsplash/

class Editor extends React.Component {
  static contextType = ApiContext

  state = {
    ...DEFAULT_SETTINGS,
    ...this.props.snippet,
    loading: true,
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
  }

  carbonNode = React.createRef()

  getTheme = () => this.props.themes.find(t => t.id === this.state.theme) || DEFAULT_THEME

  onUpdate = debounce(updates => this.props.onUpdate(updates), 750, {
    trailing: true,
    leading: true,
  })

  sync = () => this.onUpdate(this.state)

  updateState = updates => this.setState(updates, this.sync)

  updateCode = code => this.updateState({ code })
  updateTitleBar = titleBar => this.updateState({ titleBar })
  updateWidth = width => this.setState({ widthAdjustment: false, width })

  getCarbonImage = async (
    {
      format,
      squared = this.state.squaredImage,
      exportSize = (EXPORT_SIZES_HASH[this.state.exportSize] || DEFAULT_EXPORT_SIZE).value,
    } = { format: 'png' }
  ) => {
    const node = this.carbonNode.current

    const width = node.offsetWidth * exportSize
    const height = squared ? node.offsetWidth * exportSize : node.offsetHeight * exportSize

    const config = {
      style: {
        transform: `scale(${exportSize})`,
        transformOrigin: 'top left',
        background: squared ? this.state.backgroundColor : 'none',
        alignItems: 'start',
        justifyContent: 'start',
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
        }
        return true
      },
      width,
      height,
    }

    if (format === 'svg') {
      return domtoimage
        .toSvg(node, config)
        .then(dataURL =>
          dataURL
            .replace(/&nbsp;/g, '&#160;')
            // https://github.com/tsayen/dom-to-image/blob/fae625bce0970b3a039671ea7f338d05ecb3d0e8/src/dom-to-image.js#L551
            .replace(/%23/g, '#')
            .replace(/%0A/g, '\n')
            // https://stackoverflow.com/questions/7604436/xmlparseentityref-no-name-warnings-while-loading-xml-into-a-php-file
            .replace(/&(?!#?[a-z0-9]+;)/g, '&amp;')
            // remove other fonts which are not used
            .replace(
              // current font-family used
              new RegExp(
                '@font-face\\s+{\\s+font-family: (?!"*' + this.state.fontFamily + ').*?}',
                'g'
              ),
              ''
            )
        )
        .then(uri => uri.slice(uri.indexOf(',') + 1))
        .then(data => new Blob([data], { type: 'image/svg+xml' }))
    }

    if (format === 'blob') {
      return domtoimage.toBlob(node, config)
    }

    // Twitter and Imgur needs regular dataURLs
    return domtoimage.toPng(node, config)
  }

  tweet = () => {
    this.getCarbonImage({ format: 'png' }).then(
      this.context.tweet.bind(null, this.state.code || DEFAULT_CODE)
    )
  }

  imgur = () => {
    const prefix = this.state.name || 'carbon'

    return this.getCarbonImage({ format: 'png' }).then(data => this.context.imgur(data, prefix))
  }

  exportImage = (format = 'blob', options = {}) => {
    const link = document.createElement('a')

    const prefix = options.filename || this.state.name || 'carbon'

    return this.getCarbonImage({ format })
      .then(blob => window.URL.createObjectURL(blob))
      .then(url => {
        if (!options.open) {
          link.download = `${prefix}.${format === 'svg' ? 'svg' : 'png'}`
        }
        if (
          // isFirefox
          window.navigator.userAgent.indexOf('Firefox') !== -1 &&
          window.navigator.userAgent.indexOf('Chrome') === -1
        ) {
          link.target = '_blank'
        }
        link.href = url
        document.body.appendChild(link)
        link.click()
        link.remove()
      })
  }

  copyImage = () =>
    this.getCarbonImage({ format: 'blob' })
      .then(blob =>
        navigator.clipboard.write([
          new window.ClipboardItem({
            [blob.type]: blob,
          }),
        ])
      )
      .catch(console.error)

  updateSetting = (key, value) => {
    this.updateState({ [key]: value })
    if (Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, key)) {
      this.updateState({ preset: null })
    }
  }

  resetDefaultSettings = () => {
    this.updateState(DEFAULT_SETTINGS)
    this.props.onReset()
  }

  onDrop = ([file]) => {
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

  updateLanguage = language => {
    if (language) {
      this.updateSetting('language', language.mime || language.mode)
    }
  }

  updateBackground = ({ photographer, ...changes } = {}) => {
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

  updateTheme = theme => this.updateState({ theme, highlights: null })
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
          toasts: [{ children: 'Snippet created', timeout: 3000 }],
        })
      )

  handleSnippetUpdate = () =>
    this.context.snippet.update(this.props.snippet.id, this.state).then(() =>
      this.props.setToasts({
        type: 'SET',
        toasts: [{ children: 'Snippet saved', timeout: 3000 }],
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
      titleBar,
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
            <div className="setting-buttons">
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
              <CopyMenu copyImage={this.copyImage} carbonRef={this.carbonNode.current} />
            </div>
            <div id="style-editor-button" />
            <div className="share-buttons">
              <ShareMenu tweet={this.tweet} imgur={this.imgur} />
              <ExportMenu
                onChange={this.updateSetting}
                exportImage={this.exportImage}
                exportSize={exportSize}
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
                updateWidthConfirm={this.sync}
                loading={this.state.loading}
                theme={theme}
                titleBar={titleBar}
                onTitleBarChange={this.updateTitleBar}
              >
                {code != null ? code : DEFAULT_CODE}
              </Carbon>
            </Overlay>
          )}
        </Dropzone>
        <SnippetToolbar
          state={this.state}
          snippet={this.props.snippet}
          onCreate={this.handleSnippetCreate}
          onDelete={this.handleSnippetDelete}
          onUpdate={this.handleSnippetUpdate}
          name={config.name}
          onChange={this.updateSetting}
        />
        <FontFace {...config} />
        <style jsx>
          {`
            .editor {
              background: ${COLORS.BLACK};
              border: 3px solid ${COLORS.SECONDARY};
              border-radius: 8px;
              padding: 16px;
            }

            .share-buttons,
            .setting-buttons {
              display: flex;
              height: 40px;
            }
            .share-buttons {
              margin-left: auto;
            }
            .toolbar-second-row {
              display: flex;
              flex: 1 1 auto;
            }
            .setting-buttons > :global(div) {
              margin-right: 0.5rem;
            }

            #style-editor-button {
              display: flex;
              align-items: center;
            }
            @media (max-width: 768px) {
              .toolbar-second-row {
                display: block;
              }
              #style-editor-button {
                margin-top: 0.5rem;
              }
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
