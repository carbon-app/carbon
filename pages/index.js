import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Axios from 'axios'

import CodeImage from '../components/codeImage'
import api from '../lib/api'

const DEFAULT_CODE = `const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}
  `

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
          {DEFAULT_CODE}
        </CodeImage>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Home)
