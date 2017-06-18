import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Axios from 'axios'
import domtoimage from 'dom-to-image'

import Meta from '../components/Meta'
import Toolbar from '../components/Toolbar'
import CodeImage from '../components/CodeImage'
import api from '../lib/api'
import { THEMES, LANGUAGES, DEFAULT_CODE } from '../lib/constants'

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
      bgColor: '#111111',
      theme: THEMES[0].id,
      language: 'javascript' // TODO LANGUAGES[0]
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
      .then(res => res.data.link)
      .then(console.log)
  }

  render () {
    return (
        <div className="main">
          <Meta />
          <h1>Welcome to Code Image</h1>
          <div id="editor">
            <Toolbar
              save={this.save}
              upload={this.upload}
              onBGChange={color => this.setState({ bgColor: color })}
              onThemeChange={theme => this.setState({ theme: theme.id })}
              onLanguageChange={language => this.setState({ language })}
              bg={this.state.bgColor}
            />
            <CodeImage config={this.state}>
              {this.droppedContent || this.props.content || DEFAULT_CODE}
            </CodeImage>
          </div>
          <style jsx>{`
            h1 {
              color: #fff;
            }

            div {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            #editor {
              height: 460px;
              background: #151515;
              padding: 16px;
            }
          `}
          </style>
        </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Index)
