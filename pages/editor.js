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
  DEFAULT_LANGUAGE,
  DEFAULT_THEME,
  COLORS,
  DEFAULT_CODE
} from '../lib/constants'
import { getState, saveState, memoizeFirst } from '../lib/util'

// Only called once per href
const loadCSS = memoizeFirst(href => {
  const ss = window.document.createElement('link')
  const head = window.document.getElementsByTagName('head')[0]

  ss.rel = 'stylesheet'
  ss.href = href

  // temporarily, set media to something non-matching to ensure it'll
  // fetch without blocking render
  ss.media = '__non_blocking__'

  head.appendChild(ss)

  ss.media = 'all'
})

class Editor extends React.Component {
  /* pathname, asPath, err, req, res */
  static async getInitialProps({ asPath }) {
    try {
      // TODO fix this hack
      if (asPath.length > 30) {
        const content = await api.getGist(asPath)
        return { content }
      }
    } catch (e) {
      console.log(e)
    }
    return {}
  }

  constructor(props) {
    super(props)
    this.state = {
      background: '#ABB8C3',
      theme: DEFAULT_THEME,
      language: DEFAULT_LANGUAGE,
      dropShadow: true,
      windowControls: true,
      paddingVertical: '48px',
      paddingHorizontal: '32px',
      uploading: false,
      code: props.content
    }

    this.save = this.save.bind(this)
    this.upload = this.upload.bind(this)
    this.updateCode = this.updateCode.bind(this)
  }

  componentDidMount() {
    const state = getState(localStorage)
    if (state) {
      loadCSS(`//cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/theme/${state.theme}.min.css`)
      this.setState(state)
    } else {
      loadCSS(
        `//cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/theme/${this.state.theme}.min.css`
      )
    }
  }

  componentDidUpdate() {
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
    console.log(this.state.language)
    return (
      <Page enableHeroText>
        <div id="editor">
          <Toolbar>
            <Dropdown
              selected={THEMES_HASH[this.state.theme]}
              list={THEMES}
              onChange={theme => {
                loadCSS(
                  `//cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/theme/${theme.id}.min.css`
                )
                this.setState({ theme: theme.id })
              }}
            />
            <Dropdown
              selected={
                LANGUAGE_MIME_HASH[this.state.language] || LANGUAGE_MODE_HASH[this.state.language]
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
                <Carbon config={this.state} updateCode={this.updateCode}>
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
