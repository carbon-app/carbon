import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Axios from 'axios'

import CodeImage from '../components/codeImage'
import api from '../lib/api'

class Home extends React.Component {
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
      <div>
        <style jsx>{`
          div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
        </style>
        <h1>Welcome to Code Image</h1>
        <CodeImage>
          {this.props.content}
        </CodeImage>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Home)
