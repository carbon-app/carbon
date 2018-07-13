// Theirs
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import domtoimage from 'dom-to-image'
import ReadFileDropContainer, { DATA_URL, TEXT } from 'dropperx'
import Spinner from 'react-spinner'

// Ours
import Button from './Button'
import Dropdown from './Dropdown'
import BackgroundSelect from './BackgroundSelect'
import Settings from './Settings'
import Toolbar from './Toolbar'
import Overlay from './Overlay'
import Carbon from './Carbon'
import api from '../lib/api'
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
  DEFAULT_SETTINGS
} from '../lib/constants'
import { serializeState } from '../lib/routing'
import { getState } from '../lib/util'

const saveButtonOptions = {
  button: true,
  color: '#c198fb',
  selected: { id: 'SAVE_IMAGE', name: 'Save Image' },
  list: ['png', 'svg'].map(id => ({ id, name: id.toUpperCase() }))
}

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...DEFAULT_SETTINGS,
      loading: true,
      uploading: false,
      code: props.content
    }

    this.save = this.save.bind(this)
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
  }

  componentDidMount() {
    // Load from localStorage and then URL params
    this.setState({
      ...getState(localStorage),
      ...this.props.initialState,
      loading: false
    })
  }

  componentDidUpdate() {
    this.props.onUpdate(this.state)
  }

  getCarbonImage({ format, type } = { format: 'png' }) {
    // if safari, get image from api
    if (
      navigator.userAgent.indexOf('Safari') !== -1 &&
      navigator.userAgent.indexOf('Chrome') === -1 &&
      format === 'png'
    ) {
      const encodedState = serializeState(this.state)
      return api.image(encodedState)
    }

    const node = document.getElementById('export-container')

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
        // %[00 -> 19] cause failures
        if (
          n.innerText && n.innerText.match(/%[0-1][0-9]/) &&
          n.className &&
          n.className.startsWith('cm-') // is CodeMirror primitive string
        ) {
          n.innerText = n.innerText.replace('%', '%25')
        }
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

  save({ id: format = 'png' }) {
    const link = document.createElement('a')

    const timestamp = this.state.timestamp ? `_${formatTimestamp()}` : ''

    return this.getCarbonImage({ format, type: 'blob' }).then(url => {
      link.download = `carbon${timestamp}.${format}`
      link.href = url
      document.body.appendChild(link)
      link.click()
      link.remove()
    })
  }

  resetDefaultSettings() {
    this.setState(DEFAULT_SETTINGS)
    localStorage.clear()
  }

  upload() {
    this.setState({ uploading: true })
    this.getCarbonImage({ format: 'png' })
      .then(this.props.tweet.bind(null, this.state.code || DEFAULT_CODE))
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
      return <Spinner />
    }
    return (
      <React.Fragment>
        <div id="editor">
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
                'auto'
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
              {this.props.tweet && (
                <Button
                  className="tweetButton"
                  onClick={this.upload}
                  title={this.state.uploading ? 'Loading...' : 'Tweet Image'}
                  color="#57b5f9"
                  style={{ marginRight: '8px' }}
                />
              )}
              <Dropdown {...saveButtonOptions} onChange={this.save} />
            </div>
          </Toolbar>

          <ReadFileDropContainer readAs={readAs} onDrop={this.onDrop}>
            {({ isOver, canDrop }) => (
              <Overlay
                isOver={isOver || canDrop}
                title={`Drop your file here to import ${isOver ? '✋' : '✊'}`}
              >
                <Carbon
                  config={this.state}
                  updateCode={this.updateCode}
                  onAspectRatioChange={this.updateAspectRatio}
                  titleBar={this.state.titleBar}
                  updateTitleBar={this.updateTitleBar}
                >
                  {this.state.code != null ? this.state.code : DEFAULT_CODE}
                </Carbon>
              </Overlay>
            )}
          </ReadFileDropContainer>
        </div>
        <style jsx>
          {`
            #editor {
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
  const timezoneOffset = (new Date()).getTimezoneOffset() * 60000
  const timeString = (new Date(Date.now() - timezoneOffset)).toISOString()
    .slice(0, 19)
    .replace(/:/g,'-')
    .replace('T','_')

  return timeString;
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
  onUpdate: () => {}
}

export default DragDropContext(HTML5Backend)(Editor)
