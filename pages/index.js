import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Axios from 'axios'
import domtoimage from 'dom-to-image'

import ReadFileDropContainer from '../components/ReadFileDropContainer'
import Logo from '../components/svg/Logo'
import Meta from '../components/Meta'
import Toolbar from '../components/Toolbar'
import CodeImage from '../components/CodeImage'
import api from '../lib/api'
import { THEMES, LANGUAGES, PALETTE, DEFAULT_CODE } from '../lib/constants'

class Index extends React.Component {
  /* pathname, asPath, err, req, res */
  static async getInitialProps ({ asPath }) {
    try {
      if (asPath !== '/') {
        const content = await api.getGist(asPath)
        return { content }
      }
    } catch (e) {
      console.log(e)
    }
    return {}
  }

  constructor()  {
    super()
    this.state = {
      background: '#111111',
      theme: THEMES[0].id,
      language: 'javascript', // TODO LANGUAGES[0]
      dropShadow: false,
      windowControls: true,
      paddingVertical: '48px',
      paddingHorizontal: '32px'
    }
  }

  save () {
    // domtoimage.toPng(document.getElementById('container'))
    domtoimage.toPng(document.getElementById('container'))
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'snippet.png'
        link.href = dataUrl
        link.click()
      })
  }

  upload () {
    domtoimage.toBlob(document.getElementById('container'))
      .then(api.uploadImage)
      .then(res => res.data.id)
      .then(id => `http://i.imgur.com/${id}`)
      .then(console.log)
  }

  render () {
    return (
        <div className="main">
          <Meta />
          <div className="header">
            <div className="header-content">
              <Logo />
              <h1>The easiest way to create images from source code. Start typing, or drag a file into the text area to get started.</h1>
            </div>
          </div>
          <ReadFileDropContainer
            onDrop={(droppedContent) => {
              console.log(droppedContent)
              this.setState({ droppedContent })
            }}
          >
            <div id="editor">
              <Toolbar
                save={this.save}
                upload={this.upload}
                onBGChange={color => this.setState({ background: color })}
                onThemeChange={theme => this.setState({ theme: theme.id })}
                onLanguageChange={language => this.setState({ language })}
                onSettingsChange={(key, value) => this.setState({ [key]: value })}
                bg={this.state.background}
                enabled={this.state}
              />
              <CodeImage config={this.state}>
                {this.state.droppedContent || this.props.content || DEFAULT_CODE}
              </CodeImage>
            </div>
          </ReadFileDropContainer>
          <div className="footer">
            <span>a project by <a href="https://twitter.com/dawn_labs">@dawn_labs ¬</a></span>
          </div>
          <style jsx>{`
            .main {
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              height: 100vh;
              min-width: 848px;
              min-height: 704px;
            }

            .header {
              margin: 40px 0 48px;
              width: 648px;
            }

            .header-content {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .header-content h1 {
              max-width: 472px;
              font-size: 20px;
              line-height: 1.5;
              color: #fff;
            }

            #editor {
              background: ${PALETTE.EDITOR_BG};
              padding: 16px;
            }

            .footer {
              font-size: 14px;
              margin: 32px 0;
              color: #506874;
            }

            .footer a {
              color: #C694E8;
              text-decoration: none;
            }
          `}
          </style>
        </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Index)
