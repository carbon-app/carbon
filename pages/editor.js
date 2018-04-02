// Theirs
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import domtoimage from 'dom-to-image'
import ReadFileDropContainer, { DATA_URL, TEXT } from 'dropperx'

// Ours
import Page from '../components/Page'
import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import BackgroundSelect from '../components/BackgroundSelect'
import Settings from '../components/Settings'
import Toolbar from '../components/Toolbar'
import Overlay from '../components/Overlay'
import Carbon from '../components/Carbon'
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
import { getQueryStringState, updateQueryString, serializeState } from '../lib/routing'
import { getState, saveState } from '../lib/util'

const saveButtonOptions = {
  button: true,
  color: '#c198fb',
  selected: { id: 'SAVE_IMAGE', name: 'Save Image' },
  list: ['png', 'svg'].map(id => ({ id, name: id.toUpperCase() }))
}

class Editor extends React.Component {
  static async getInitialProps({ asPath, query }) {
    const path = removeQueryString(asPath.split('/').pop())
    const queryParams = getQueryStringState(query)
    const initialState = Object.keys(queryParams).length ? queryParams : null
    try {
      // TODO fix this hack
      if (path.length >= 19 && path.indexOf('.') === -1) {
        const content = await api.getGist(path)
        return { content, initialState }
      }
    } catch (e) {
      console.log(e)
    }
    return { initialState }
  }

  constructor(props) {
    super(props)
    this.state = Object.assign(
      {
        ...DEFAULT_SETTINGS,
        uploading: false,
        code: props.content,
        _initialState: this.props.initialState
      },
      this.props.initialState
    )

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
    // Load from localStorage instead of query params
    if (!this.state._initialState) {
      const state = getState(localStorage)
      if (state) {
        this.setState(state)
      }
    }
  }

  componentDidUpdate() {
    updateQueryString(this.state)
    const s = { ...this.state }
    delete s.code
    delete s.backgroundImage
    delete s.backgroundImageSelection
    saveState(localStorage, s)
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
      filter: n => (n.className ? String(n.className).indexOf('eliminateOnRender') < 0 : true),
      width,
      height,
      // %[00 -> 19] cause failures
      filter: node => !(node.innerText && node.innerText.match(/%[0-1][0-9]/))
    }

    if (type === 'blob')
      return domtoimage
        .toBlob(node, config)
        .then(blob => window.URL.createObjectURL(blob, { type: 'image/png' }))

    if (format === 'svg')
      return domtoimage.toSvg(node, config).then(dataUrl => dataUrl.split('&nbsp;').join('&#160;'))

    return domtoimage.toPng(node, config)
  }

  updateSetting(key, value) {
    this.setState({ [key]: value })
  }

  save({ id: format = 'png' }) {
    const link = document.createElement('a')

    const type = format === 'png' ? 'blob' : undefined

    return this.getCarbonImage({ format, type }).then(url => {
      link.download = `carbon.${format}`
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
      .then(api.tweet)
      .then(() => this.setState({ uploading: false }))
      .catch(err => {
        console.error(err)
        this.setState({ uploading: false })
      })
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

  updateBackground(changes, cb) {
    this.setState(changes, cb)
  }

  render() {
    return (
      <Page enableHeroText={true}>
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
                LANGUAGE_MODE_HASH[this.state.language]
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
              <Button
                className="tweetButton"
                onClick={this.upload}
                title={this.state.uploading ? 'Loading...' : 'Tweet Image'}
                color="#57b5f9"
                style={{ marginRight: '8px' }}
              />
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
      </Page>
    )
  }
}

function removeQueryString(str) {
  const qI = str.indexOf('?')
  return (qI >= 0 ? str.substr(0, qI) : str)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\//g, '&#x2F;')
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

export default DragDropContext(HTML5Backend)(Editor)
