// Theirs
import url from 'url'
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import domtoimage from 'dom-to-image'
import ReadFileDropContainer, { DATA_URL, TEXT } from 'dropperx'
import Spinner from 'react-spinner'
import shallowCompare from 'react-addons-shallow-compare'
import omit from 'lodash.omit'

// Ours
import Button from './Button'
import Dropdown from './Dropdown'
import BackgroundSelect from './BackgroundSelect'
import Settings from './Settings'
import Toolbar from './Toolbar'
import Overlay from './Overlay'
import Carbon from './Carbon'
import ExportMenu from './ExportMenu'
import {
  THEMES,
  THEMES_HASH,
  LANGUAGES,
  LANGUAGE_MIME_HASH,
  LANGUAGE_MODE_HASH,
  LANGUAGE_NAME_HASH,
  DEFAULT_THEME,
  DEFAULT_EXPORT_SIZE,
  COLORS,
  EXPORT_SIZES_HASH,
  DEFAULT_CODE,
  DEFAULT_SETTINGS,
  DEFAULT_LANGUAGE,
  PRESETS
} from '../lib/constants'
import { serializeState, getQueryStringState } from '../lib/routing'
import { getState, escapeHtml, unescapeHtml, formatCode } from '../lib/util'
import LanguageIcon from './svg/Language'
import ThemeIcon from './svg/Theme'

const SETTINGS_KEYS = Object.keys(DEFAULT_SETTINGS)

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...DEFAULT_SETTINGS,
      loading: true,
      uploading: false,
      code: props.content,
      online: true,
      presets: PRESETS
    }

    this.export = this.export.bind(this)
    this.upload = this.upload.bind(this)
    this.updateSetting = this.updateSetting.bind(this)
    this.updateCode = this.updateSetting.bind(this, 'code')
    this.updateAspectRatio = this.updateSetting.bind(this, 'aspectRatio')
    this.updateTitleBar = this.updateSetting.bind(this, 'titleBar')
    this.updateTheme = this.updateTheme.bind(this)
    this.updateLanguage = this.updateLanguage.bind(this)
    this.updateBackground = this.updateBackground.bind(this)
    this.resetDefaultSettings = this.resetDefaultSettings.bind(this)
    this.getCarbonImage = this.getCarbonImage.bind(this)
    this.onDrop = this.onDrop.bind(this)

    this.setOffline = () => this.setState({ online: false })
    this.setOnline = () => this.setState({ online: true })
    this.innerRef = node => (this.carbonNode = node)
  }

  async componentDidMount() {
    const { asPath = '' } = this.props.router
    const { query, pathname } = url.parse(asPath, true)
    const path = escapeHtml(pathname.split('/').pop())
    const queryParams = getQueryStringState(query)
    const initialState = Object.keys(queryParams).length ? queryParams : {}
    try {
      // TODO fix this hack
      if (this.props.api.getGist && path.length >= 19 && path.indexOf('.') === -1) {
        const { content, language } = await this.props.api.getGist(path)
        if (language) {
          initialState.language = language.toLowerCase()
        }
        initialState.code = content
      }
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
    }

    const newState = {
      // Load from localStorage
      ...getState(localStorage),
      // and then URL params
      ...initialState,
      loading: false,
      online: Boolean(window && window.navigator && window.navigator.onLine)
    }

    // Makes sure the slash in 'application/X' is decoded
    if (newState.language) {
      newState.language = unescapeHtml(newState.language)
    }

    this.setState(newState)

    window.addEventListener('offline', this.setOffline)
    window.addEventListener('online', this.setOnline)
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.setOffline)
    window.removeEventListener('online', this.setOnline)
  }

  componentDidUpdate(prevProps, prevState) {
    // this.props ensures props are not compared, only state
    if (shallowCompare(this, this.props, prevState)) {
      this.props.onUpdate(this.state)
    }
  }

  async getCarbonImage({ format, type } = { format: 'png' }) {
    // if safari, get image from api
    const isPNG = format !== 'svg'
    if (
      this.props.api.image &&
      navigator.userAgent.indexOf('Safari') !== -1 &&
      navigator.userAgent.indexOf('Chrome') === -1 &&
      isPNG
    ) {
      const encodedState = serializeState(this.state)
      return this.props.api.image(encodedState)
    }

    const node = this.carbonNode

    const exportSize = (EXPORT_SIZES_HASH[this.state.exportSize] || DEFAULT_EXPORT_SIZE).value

    const map = new Map()
    const undoMap = value => {
      map.forEach((value, node) => (node.innerText = value))
      return value
    }

    if (isPNG) {
      node.querySelectorAll('span[role="presentation"]').forEach(node => {
        if (node.innerText && node.innerText.match(/%\S\S/)) {
          map.set(node, node.innerText)
          node.innerText = encodeURIComponent(node.innerText)
        }
      })
    }

    const width = node.offsetWidth * exportSize
    const height = this.state.squaredImage
      ? node.offsetWidth * exportSize
      : node.offsetHeight * exportSize

    const config = {
      style: {
        transform: `scale(${exportSize})`,
        'transform-origin': 'center',
        background: this.state.squaredImage ? this.state.backgroundColor : 'none'
      },
      filter: n => {
        if (n.className) {
          return String(n.className).indexOf('eliminateOnRender') < 0
        }
        return true
      },
      width,
      height
    }

    try {
      if (type === 'blob') {
        if (format === 'svg') {
          return (
            domtoimage
              .toSvg(node, config)
              .then(dataUrl => dataUrl.replace(/&nbsp;/g, '&#160;'))
              // https://stackoverflow.com/questions/7604436/xmlparseentityref-no-name-warnings-while-loading-xml-into-a-php-file
              .then(dataUrl => dataUrl.replace(/&(?!#?[a-z0-9]+;)/g, '&amp;'))
              .then(uri => uri.slice(uri.indexOf(',') + 1))
              .then(data => new Blob([data], { type: 'image/svg+xml' }))
              .then(data => window.URL.createObjectURL(data))
          )
        }

        return await domtoimage.toBlob(node, config).then(blob => window.URL.createObjectURL(blob))
      }

      // Twitter needs regular dataurls
      return await domtoimage.toPng(node, config)
    } finally {
      undoMap()
    }
  }

  updateSetting(key, value) {
    this.setState({
      [key]: value
    })

    if (Object.prototype.hasOwnProperty(DEFAULT_SETTINGS, key)) {
      this.setState({ selectedPreset: null })
    }
  }

  export(format = 'png') {
    const link = document.createElement('a')

    const prefix = this.state.filename || 'carbon'

    return this.getCarbonImage({ format, type: 'blob' }).then(url => {
      if (format !== 'open') {
        link.download = `${prefix}.${format}`
      }
      link.href = url
      document.body.appendChild(link)
      link.click()
      link.remove()
    })
  }

  resetDefaultSettings() {
    this.setState(DEFAULT_SETTINGS)
    this.props.onReset()
  }

  upload() {
    this.setState({ uploading: true })
    this.getCarbonImage({ format: 'png' })
      .then(this.props.api.tweet.bind(null, this.state.code || DEFAULT_CODE))
      // eslint-disable-next-line
      .catch(console.error)
      .then(() => this.setState({ uploading: false }))
  }

  onDrop([file]) {
    if (isImage(file)) {
      this.setState({
        backgroundImage: file.content,
        backgroundImageSelection: null,
        backgroundMode: 'image'
      })
    } else {
      this.setState({ code: file.content, language: 'auto' })
    }
  }

  updateTheme(theme) {
    this.updateSetting('theme', theme.id)
  }

  updateLanguage(language) {
    this.updateSetting('language', language.mime || language.mode)
  }

  updateBackground({ photographer, ...changes } = {}) {
    if (photographer) {
      this.setState(({ code = DEFAULT_CODE }) => ({
        ...changes,
        code: code + `\n\n// Photo by ${photographer.name} on Unsplash`
      }))
    } else {
      this.setState(changes)
    }
  }

  format = () =>
    formatCode(this.state.code)
      .then(this.updateCode)
      .catch(() => {
        // create toast here in the future
      })

  // eslint-disable-next-line
  applyPreset = (index, { custom, ...settings }) => {
    const previousSettings = SETTINGS_KEYS.reduce(
      (obj, settingKey) => ({
        ...obj,
        [settingKey]: this.state[settingKey]
      }),
      {}
    )
    this.setState({ selectedPreset: index, previousSettings, ...settings })
  }

  // TODO: consider returning this callback from `applyPreset` and having `Presets` manage this state internally
  undoPreset = () =>
    this.setState({
      selectedPreset: null,
      previousSettings: null,
      ...this.state.previousSettings
    })

  removePreset = index =>
    this.setState(({ presets }) => ({ presets: presets.filter((_, i) => i !== index) }))

  render() {
    const {
      loading,
      theme,
      language,
      backgroundColor,
      backgroundImage,
      backgroundMode,
      aspectRatio,
      uploading,
      online,
      titleBar,
      code,
      exportSize
    } = this.state

    if (loading) {
      return (
        <div>
          <Spinner />
          <style jsx>
            {`
              div {
                height: 160px;
              }
            `}
          </style>
        </div>
      )
    }

    const config = omit(this.state, ['code', 'aspectRatio', 'titleBar'])

    return (
      <React.Fragment>
        <div className="editor">
          <Toolbar>
            <Dropdown
              icon={<ThemeIcon />}
              selected={THEMES_HASH[theme] || DEFAULT_THEME}
              list={THEMES}
              onChange={this.updateTheme}
            />
            <Dropdown
              icon={<LanguageIcon />}
              selected={
                LANGUAGE_NAME_HASH[language] ||
                LANGUAGE_MIME_HASH[language] ||
                LANGUAGE_MODE_HASH[language] ||
                LANGUAGE_MODE_HASH[DEFAULT_LANGUAGE]
              }
              list={LANGUAGES}
              onChange={this.updateLanguage}
            />
            <BackgroundSelect
              onChange={this.updateBackground}
              mode={backgroundMode}
              color={backgroundColor}
              image={backgroundImage}
              aspectRatio={aspectRatio}
            />
            <Settings
              {...config}
              onChange={this.updateSetting}
              resetDefaultSettings={this.resetDefaultSettings}
              format={this.format}
              applyPreset={this.applyPreset}
              removePreset={this.removePreset}
              undoPreset={this.undoPreset}
            />
            <div className="buttons">
              {this.props.api.tweet &&
                online && (
                  <Button
                    className="tweetButton"
                    onClick={this.upload}
                    title={uploading ? 'Loading...' : 'Tweet'}
                    color="#57b5f9"
                    style={{ marginRight: '8px' }}
                  />
                )}
              <ExportMenu
                onChange={this.updateSetting}
                export={this.export}
                exportSize={exportSize}
              />
            </div>
          </Toolbar>

          <ReadFileDropContainer readAs={readAs} onDrop={this.onDrop}>
            {({ isOver, canDrop }) => (
              <Overlay
                isOver={isOver || canDrop}
                title={`Drop your file here to import ${isOver ? '✋' : '✊'}`}
              >
                {/*key ensures Carbon's internal language state is updated when it's changed by Dropdown*/}
                <Carbon
                  key={language}
                  config={this.state}
                  updateCode={this.updateCode}
                  onAspectRatioChange={this.updateAspectRatio}
                  titleBar={titleBar}
                  updateTitleBar={this.updateTitleBar}
                  innerRef={this.innerRef}
                >
                  {code != null ? code : DEFAULT_CODE}
                </Carbon>
              </Overlay>
            )}
          </ReadFileDropContainer>
        </div>
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
          `}
        </style>
      </React.Fragment>
    )
  }
}

function isImage(file) {
  return file.type.split('/')[0] === 'image'
}

function readAs(file) {
  if (isImage(file)) {
    return DATA_URL
  }
  return TEXT
}

Editor.defaultProps = {
  api: {},
  onUpdate: () => {},
  onReset: () => {}
}

export default DragDropContext(HTML5Backend)(Editor)
