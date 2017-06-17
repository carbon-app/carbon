import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Axios from 'axios'

import Meta from '../components/meta'
import Toolbar from '../components/toolbar'
import CodeImage from '../components/codeImage'
import api from '../lib/api'

class Index extends React.Component {
  /* pathname, asPath, err, req, res */
  static async getInitialProps ({ asPath }) {
    try {
      const content = await api.getGist(asPath)
      return { content }
    } catch (e) {
      console.log(e)
      return {}
    }
  }
  render () {
    return (
        <div className="main">
          <Meta />
          <h1>Welcome to Code Image</h1>
          <div id="editor">
            <Toolbar />
            <CodeImage>
              {this.props.content}
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
