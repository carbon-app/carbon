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

const removeQueryString = str => {
  const qI = str.indexOf('?')
  return (qI >= 0 ? str.substr(0, qI) : str)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\//g, '&#x2F;')
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
      // eslint-disable-next-line
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
    this.updateCode = this.updateCode.bind(this)
    this.updateTitleBar = this.updateTitleBar.bind(this)
    this.updateAspectRatio = this.updateAspectRatio.bind(this)
    this.resetDefaultSettings = this.resetDefaultSettings.bind(this)
    this.getCarbonImage = this.getCarbonImage.bind(this)
  }

  componentDidMount() {
    // Load from localStorage instead of query params
    /* eslint-disable */
    if (!this.state._initialState) {
      const state = getState(localStorage)
      if (state) {
        this.setState(state)
        /* eslint-enable */
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

  getCarbonImage({ format } = { format: 'png' }) {
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
    const config = {
      style: {
        transform: `scale(${exportSize})`,
        'transform-origin': 'center',
        background: this.state.squaredImage ? this.state.backgroundColor : 'none'
      },
      filter: n => (n.className ? String(n.className).indexOf('eliminateOnRender') < 0 : true),
      width: node.offsetWidth * exportSize,
      height: this.state.squaredImage
        ? node.offsetWidth * exportSize
        : node.offsetHeight * exportSize
    }

    return format.toLowerCase() === 'svg'
      ? domtoimage.toSvg(node, config)
      : domtoimage.toPng(node, config)
  }

  updateCode(code) {
    this.setState({ code })
  }

  updateAspectRatio(aspectRatio) {
    this.setState({ aspectRatio })
  }

  updateTitleBar(titleBar) {
    this.setState({ titleBar })
  }

  save({ format } = { format: 'png' }) {
    this.getCarbonImage({ format }).then(dataUrl => {
      const parsedUrl = format === 'svg' ? dataUrl.split('&nbsp;').join('&#160;') : dataUrl

      const link = document.createElement('a')
      link.download = `carbon.${format}`
      link.href = parsedUrl
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
        // eslint-disable-next-line
        console.error(err)
        this.setState({ uploading: false })
      })
  }

  render() {
    return (
      <Page enableHeroText>
        <div id="editor">
          <Toolbar>
            <Dropdown
              selected={THEMES_HASH[this.state.theme] || DEFAULT_THEME}
              list={THEMES}
              onChange={theme => this.setState({ theme: theme.id })}
            />
            <Dropdown
              selected={
                LANGUAGE_NAME_HASH[this.state.language] ||
                LANGUAGE_MIME_HASH[this.state.language] ||
                LANGUAGE_MODE_HASH[this.state.language]
              }
              list={LANGUAGES}
              onChange={language => this.setState({ language: language.mime || language.mode })}
            />
            <BackgroundSelect onChange={changes => this.setState(changes)} config={this.state} />
            <Settings
              onChange={(key, value) => this.setState({ [key]: value })}
              enabled={this.state}
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
              <Dropdown
                button
                color="#c198fb"
                selected={{ id: 'SAVE_IMAGE', name: 'Save Image' }}
                list={['png', 'svg'].map(id => ({ id, name: id.toUpperCase() }))}
                onChange={saveAs => this.save({ format: saveAs.id })}
              />
            </div>
          </Toolbar>

          <ReadFileDropContainer
            readAs={file => {
              if (isImage(file)) {
                return DATA_URL
              }
              return TEXT
            }}
            onDrop={([file]) => {
              if (isImage(file)) {
                this.setState({
                  backgroundImage: file.content,
                  backgroundImageSelection: null,
                  backgroundMode: 'image'
                })
              } else {
                this.setState({ code: file.content, language: 'auto' })
              }
            }}
          >
            {({ isOver, canDrop }) => (
              <Overlay
                isOver={isOver || canDrop}
                title={`Drop your file here to import ${isOver ? '✋' : '✊'}`}
              >
                <Carbon
                  config={this.state}
                  updateCode={code => this.updateCode(code)}
                  onAspectRatioChange={this.updateAspectRatio}
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

function isImage(file) {
  return file.type.split('/')[0] === 'image'
}

export default DragDropContext(HTML5Backend)(Editor)
