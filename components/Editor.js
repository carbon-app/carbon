// Theirs
import url from 'url'
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import domtoimage from 'dom-to-image'
import ReadFileDropContainer, { DATA_URL, TEXT } from 'dropperx'
import Spinner from 'react-spinner'
import shallowCompare from 'react-addons-shallow-compare'

// Ours
import Button from './Button'
import Dropdown from './Dropdown'
import BackgroundSelect from './BackgroundSelect'
import Settings from './Settings'
import Toolbar from './Toolbar'
import Overlay from './Overlay'
import Carbon from './Carbon'
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
  DEFAULT_LANGUAGE
} from '../lib/constants'
import { serializeState, getQueryStringState } from '../lib/routing'
import { getState, escapeHtml, unescapeHtml } from '../lib/util'

const saveButtonOptions = {
  button: true,
  color: '#c198fb',
  selected: { id: 'SAVE_IMAGE', name: 'Save Image' },
  list: ['png', 'svg', 'open ↗'].map(id => ({ id, name: id.toUpperCase() }))
}

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...DEFAULT_SETTINGS,
      loading: true,
      uploading: false,
      code: props.content,
      online: true
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

  getCarbonImage({ format, type } = { format: 'png' }) {
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

    if (isPNG) {
      document.querySelectorAll('.CodeMirror-line > span > span').forEach(n => {
        if (n.innerText && n.innerText.match(/%\S\S/)) {
          n.innerText = encodeURIComponent(n.innerText)
        }
      })
    }

    const node = this.carbonNode

    const exportSize = (EXPORT_SIZES_HASH[this.state.exportSize] || DEFAULT_EXPORT_SIZE).value
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

    if (type === 'blob') {
      if (format === 'svg') {
        return domtoimage
          .toSvg(node, config)
          .then(dataUrl => dataUrl.replace(/&nbsp;/g, '&#160;'))
          .then(uri => uri.slice(uri.indexOf(',') + 1))
          .then(data => new Blob([data], { type: 'image/svg+xml' }))
          .then(data => window.URL.createObjectURL(data))
      }

      return domtoimage.toBlob(node, config).then(blob => window.URL.createObjectURL(blob))
    }

    // Twitter needs regular dataurls
    return domtoimage.toPng(node, config)
  }

  updateSetting(key, value) {
    this.setState({ [key]: value })
  }

  export({ id: format = 'png' }) {
    if (format === 'copy embed') {
      return
    }

    const link = document.createElement('a')

    const timestamp = this.state.timestamp ? `_${formatTimestamp()}` : ''

    return this.getCarbonImage({ format, type: 'blob' }).then(url => {
      if (format !== 'open ↗') {
        link.download = `carbon${timestamp}.${format}`
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

  render() {
    if (this.state.loading) {
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
    return (
      <React.Fragment>
        <div className="editor">
          <Toolbar>
            <Dropdown
              selected={THEMES_HASH[this.state.theme] || DEFAULT_THEME}
              list={THEMES}
              onChange={this.updateTheme}
            />
            <Dropdown
              selected={
                LANGUAGE_NAME_HASH[this.state.language] ||
                LANGUAGE_MIME_HASH[this.state.language] ||
                LANGUAGE_MODE_HASH[this.state.language] ||
                LANGUAGE_MODE_HASH[DEFAULT_LANGUAGE]
              }
              list={LANGUAGES}
              onChange={this.updateLanguage}
            />
            <BackgroundSelect
              onChange={this.updateBackground}
              mode={this.state.backgroundMode}
              color={this.state.backgroundColor}
              image={this.state.backgroundImage}
              aspectRatio={this.state.aspectRatio}
            />
            <Settings
              {...this.state}
              onChange={this.updateSetting}
              resetDefaultSettings={this.resetDefaultSettings}
            />
            <div className="buttons">
              {this.props.api.tweet &&
                this.state.online && (
                  <Button
                    className="tweetButton"
                    onClick={this.upload}
                    title={this.state.uploading ? 'Loading...' : 'Tweet Image'}
                    color="#57b5f9"
                    style={{ marginRight: '8px' }}
                  />
                )}
              <Dropdown {...saveButtonOptions} onChange={this.export} />
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
                  key={this.state.language}
                  config={this.state}
                  updateCode={this.updateCode}
                  onAspectRatioChange={this.updateAspectRatio}
                  titleBar={this.state.titleBar}
                  updateTitleBar={this.updateTitleBar}
                  innerRef={this.innerRef}
                >
                  {this.state.code != null ? this.state.code : DEFAULT_CODE}
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

function formatTimestamp() {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000
  const timeString = new Date(Date.now() - timezoneOffset)
    .toISOString()
    .slice(0, 19)
    .replace(/:/g, '-')
    .replace('T', '_')

  return timeString
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
