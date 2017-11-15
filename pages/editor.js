// Theirs
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import domtoimage from 'dom-to-image'
import ReadFileDropContainer from 'dropperx'

// Ours
import Page from '../components/Page'
import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import ColorPicker from '../components/ColorPicker'
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
  DEFAULT_LANGUAGE,
  DEFAULT_THEME,
  COLORS,
  DEFAULT_CODE
} from '../lib/constants'
import { getQueryStringState, updateQueryString } from '../lib/routing'
import { getState, saveState } from '../lib/util'

const removeQueryString = str => {
  const qI = str.indexOf('?')
  return qI >= 0 ? str.substr(0, qI) : str
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
        background: 'rgba(171, 184, 195, 1)',
        theme: DEFAULT_THEME.id,
        language: DEFAULT_LANGUAGE,
        dropShadow: true,
        windowControls: true,
        widthAdjustment: true,
        lineNumbers: false,
        paddingVertical: '48px',
        paddingHorizontal: '32px',
        uploading: false,
        code: props.content,
        _initialState: this.props.initialState
      },
      this.props.initialState
    )

    this.save = this.save.bind(this)
    this.upload = this.upload.bind(this)
    this.updateCode = this.updateCode.bind(this)
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
    saveState(localStorage, s)
  }

  getCarbonImage() {
    const node = document.getElementById('section')

    const config = {
      style: {
        transform: 'scale(2)',
        'transform-origin': 'center'
      },
      filter: n => (n.className ? String(n.className).indexOf('eliminateOnRender') < 0 : true),
      width: node.offsetWidth * 2,
      height: node.offsetHeight * 2
    }

    return domtoimage.toPng(node, config)
  }

  updateCode(code) {
    this.setState({ code })
  }

  save() {
    this.getCarbonImage().then(dataUrl => {
      const link = document.createElement('a')
      link.download = 'carbon.png'
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      link.remove()
    })
  }

  upload() {
    this.setState({ uploading: true })
    this.getCarbonImage()
      .then(api.tweet)
      .then(() => this.setState({ uploading: false }))
      .catch(err => {
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
            <ColorPicker
              onChange={color => this.setState({ background: color })}
              bg={this.state.background}
            />
            <Settings
              onChange={(key, value) => this.setState({ [key]: value })}
              enabled={this.state}
            />
            <div className="buttons">
              <Button
                className="tweetButton"
                onClick={this.upload}
                title={this.state.uploading ? 'Loading...' : 'Tweet Image'}
                color="#57b5f9"
                style={{ marginRight: '8px' }}
              />
              <Button onClick={this.save} title="Save Image" color="#c198fb" />
            </div>
          </Toolbar>

          <ReadFileDropContainer onDrop={([file]) => this.setState({ code: file.content })}>
            {({ isOver, canDrop }) => (
              <Overlay
                isOver={isOver || canDrop}
                title={`Drop your file here to import ${isOver ? '✋' : '✊'}`}
              >
                <Carbon config={this.state} updateCode={code => this.updateCode(code)}>
                  {this.state.code || DEFAULT_CODE}
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

export default DragDropContext(HTML5Backend)(Editor)
