import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Axios from 'axios'
import domtoimage from 'dom-to-image'

import Page from '../components/Page'
import ReadFileDropContainer from '../components/ReadFileDropContainer'
import Toolbar from '../components/Toolbar'
import CodeImage from '../components/CodeImage'
import api from '../lib/api'
import { THEMES, LANGUAGES, PALETTE, DEFAULT_CODE } from '../lib/constants'

class Editor extends React.Component {
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
        <Page>
          {/* TODO this doesn't update the render */}
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
          <style jsx>{`
            #editor {
              background: ${PALETTE.EDITOR_BG};
              border: 3px solid ${PALETTE.SECONDARY};
              border-radius: 8px;
              padding: 16px;
            }
          `}
          </style>
        </Page>
    )
  }
}

export default DragDropContext(HTML5Backend)(Editor)
