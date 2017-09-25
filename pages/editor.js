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
  THEMES_ARRAY,
  THEMES,
  LANGUAGES,
  DEFAULT_LANGUAGE,
  COLORS,
  DEFAULT_CODE
} from '../lib/constants'

class Editor extends React.Component {
  /* pathname, asPath, err, req, res */
  static async getInitialProps ({ asPath }) {
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

  constructor(props)  {
    super(props)
    this.state = {
      background: '#ABB8C3',
      theme: THEMES.seti.id,
      language: DEFAULT_LANGUAGE,
      dropShadow: true,
      windowControls: true,
      paddingVertical: '48px',
      paddingHorizontal: '32px',
      uploading: false,
      code: props.content || DEFAULT_CODE
    }

    this.save = this.save.bind(this)
    this.upload = this.upload.bind(this)
    this.updateCode = this.updateCode.bind(this)
  }

  getCarbonImage () {
    const node = document.getElementById('section')

    const config = {
      style: {
        transform: 'scale(2)',
        'transform-origin': 'center'
      },
      width: node.offsetWidth * 2,
      height: node.offsetHeight * 2
    }

    return  domtoimage.toPng(node, config)
  }

  updateCode (code) {
    this.setState({ code })
  }

  save () {
    this.getCarbonImage()
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = 'carbon.png'
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      link.remove()
    })
  }

  upload () {
    this.setState({ uploading: true })
    this.getCarbonImage()
    .then(api.tweet)
    .then(() => this.setState({ uploading: false }))
    .catch((err) => {
      console.error(err)
      this.setState({ uploading: false })
    })
  }

  render () {
    return (
        <Page enableHeroText>
          <div id="editor">
            <Toolbar>
              <Dropdown selected={THEMES[this.state.theme]} list={THEMES_ARRAY} onChange={theme => this.setState({ theme: theme.id })}/>
              <Dropdown list={LANGUAGES} onChange={language => this.setState({ language: language.module })}/>
              <ColorPicker
                onChange={color => this.setState({ background: color })}
                bg={this.state.background}
              />
              <Settings onChange={(key, value) => this.setState({ [key]: value })} enabled={this.state} />
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
              {
                ({ isOver, canDrop }) => (
                  <Overlay isOver={isOver || canDrop} title={`Drop your file here to import ${isOver ? '✋' : '✊'}`}>
                    <Carbon config={this.state} updateCode={this.updateCode}>
                      {this.state.code}
                    </Carbon>
                  </Overlay>
                )
              }
            </ReadFileDropContainer>
          </div>
          <style jsx>{`
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
