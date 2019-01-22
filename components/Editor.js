// Theirs
import url from 'url'
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import domtoimage from 'dom-to-image'
import ReadFileDropContainer, { DATA_URL, TEXT } from 'dropperx'
import Spinner from 'react-spinner'
import dynamic from 'next/dynamic'

// Ours
import Button from './Button'
import Dropdown from './Dropdown'
import Settings from './Settings'
import Toolbar from './Toolbar'
import Overlay from './Overlay'
import Carbon from './Carbon'
import ExportMenu from './ExportMenu'
import Themes from './Themes'
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
  DEFAULT_PRESET_ID
} from '../lib/constants'
import { serializeState, getQueryStringState } from '../lib/routing'
import { getSettings, escapeHtml, unescapeHtml, formatCode, omit } from '../lib/util'
import LanguageIcon from './svg/Language'

const languageIcon = <LanguageIcon />

const BackgroundSelect = dynamic(() => import('./BackgroundSelect'), {
  loading: () => null
})

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...DEFAULT_SETTINGS,
      loading: true,
      uploading: false,
      code: props.content,
      online: true,
      preset: DEFAULT_PRESET_ID
    }

    this.export = this.export.bind(this)
    this.upload = this.upload.bind(this)
    this.updateSetting = this.updateSetting.bind(this)
    this.updateTheme = this.updateTheme.bind(this)
    this.updateLanguage = this.updateLanguage.bind(this)
    this.updateBackground = this.updateBackground.bind(this)
    this.resetDefaultSettings = this.resetDefaultSettings.bind(this)
    this.getCarbonImage = this.getCarbonImage.bind(this)
    this.onDrop = this.onDrop.bind(this)

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
      ...getSettings(localStorage),
      // and then URL params
      ...initialState,
      loading: false,
      online: Boolean(window && window.navigator && window.navigator.onLine)
    }

    // Makes sure the slash in 'application/X' is decoded
    if (newState.language) {
      newState.language = unescapeHtml(newState.language)
    }

    this.updateState(newState)

    window.addEventListener('offline', this.setOffline)
    window.addEventListener('online', this.setOnline)

    this.isSafari =
      window.navigator &&
      window.navigator.userAgent.indexOf('Safari') !== -1 &&
      window.navigator.userAgent.indexOf('Chrome') === -1
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.setOffline)
    window.removeEventListener('online', this.setOnline)
  }

  updateState = updates => this.setState(updates, () => this.props.onUpdate(this.state))

  updateCode = code => this.updateState({ code })
  updateAspectRatio = aspectRatio => this.updateState({ aspectRatio })
  updateTitleBar = titleBar => this.updateState({ titleBar })
  setOffline = () => this.updateState({ online: false })
  setOnline = () => this.updateState({ online: true })

  async getCarbonImage(
    {
      format,
      type,
      squared = this.state.squaredImage,
      exportSize = (EXPORT_SIZES_HASH[this.state.exportSize] || DEFAULT_EXPORT_SIZE).value
    } = { format: 'png' }
  ) {
    // if safari, get image from api
    const isPNG = format !== 'svg'
    if (this.props.api.image && this.isSafari && isPNG) {
      const encodedState = serializeState(this.state)
      return this.props.api.image(encodedState)
    }

    const node = this.carbonNode

    const map = new Map()
    const undoMap = value => {
      map.forEach((value, node) => (node.innerText = value))
      return value
    }

    if (isPNG) {
      node.querySelectorAll('span[role="presentation"]').forEach(node => {
        if (node.innerText && node.innerText.match(/%[A-Za-z0-9]{2}/)) {
          map.set(node, node.innerText)
          node.innerText = encodeURIComponent(node.innerText)
        }
      })
    }

    const width = node.offsetWidth * exportSize
    const height = squared ? node.offsetWidth * exportSize : node.offsetHeight * exportSize

    const config = {
      style: {
        transform: `scale(${exportSize})`,
        'transform-origin': 'center',
        background: squared ? this.state.backgroundColor : 'none'
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
              .then(dataUrl =>
                dataUrl
                  .replace(/&nbsp;/g, '&#160;')
                  // https://github.com/tsayen/dom-to-image/blob/fae625bce0970b3a039671ea7f338d05ecb3d0e8/src/dom-to-image.js#L551
                  .replace(/%23/g, '#')
                  .replace(/%0A/, '\n')
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

      // Twitter needs regular dataurls
      return await domtoimage.toPng(node, config)
    } finally {
      undoMap()
    }
  }

  updateSetting(key, value) {
    this.updateState({ [key]: value })
    if (Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, key)) {
      this.updateState({ preset: null })
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
    this.updateState({ ...DEFAULT_SETTINGS, preset: DEFAULT_PRESET_ID })
    this.props.onReset()
  }

  upload() {
    this.updateState({ uploading: true })
    this.getCarbonImage({ format: 'png' })
      .then(this.props.api.tweet.bind(null, this.state.code || DEFAULT_CODE))
      // eslint-disable-next-line
      .catch(console.error)
      .then(() => this.updateState({ uploading: false }))
  }

  onDrop([file]) {
    if (isImage(file)) {
      this.updateState({
        backgroundImage: file.content,
        backgroundImageSelection: null,
        backgroundMode: 'image',
        preset: null
      })
    } else {
      this.updateState({ code: file.content, language: 'auto' })
    }
  }

  updateTheme(theme) {
    this.updateSetting('theme', theme)
  }

  updateLanguage(language) {
    this.updateSetting('language', language.mime || language.mode)
  }

  updateBackground({ photographer, ...changes } = {}) {
    if (this.isSafari) {
      this.disablePNG = !verifyPayloadSize(changes.backgroundImage)
    }

    if (photographer) {
      this.updateState(({ code = DEFAULT_CODE }) => ({
        ...changes,
        code: code + `\n\n// Photo by ${photographer.name} on Unsplash`,
        preset: null
      }))
    } else {
      this.updateState({ ...changes, preset: null })
    }
  }

  format = () =>
    formatCode(this.state.code)
      .then(this.updateCode)
      .catch(() => {
        // create toast here in the future
      })

  applyPreset = ({ id: preset, ...settings }) => this.updateState({ preset, ...settings })

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
            <Themes key={theme} updateTheme={this.updateTheme} theme={theme} />
            <Dropdown
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
              getCarbonImage={this.getCarbonImage}
            />
            <div className="buttons">
              {this.props.api.tweet && online && (
                <Button
                  border
                  large
                  padding="0 16px"
                  margin="0 8px 0 0"
                  onClick={this.upload}
                  color="#57b5f9"
                >
                  {uploading ? 'Loading...' : 'Tweet'}
                </Button>
              )}
              <ExportMenu
                onChange={this.updateSetting}
                export={this.export}
                exportSize={exportSize}
                disablePNG={this.disablePNG}
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

const MAX_PAYLOAD_SIZE = 5e6 // bytes
function verifyPayloadSize(str) {
  if (typeof str !== 'string') return true

  return new Blob([str]).size < MAX_PAYLOAD_SIZE
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
