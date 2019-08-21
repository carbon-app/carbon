import React from 'react'
import Router from 'next/router'

import IndexPage from './index'
import ApiContext from '../components/ApiContext'

import api from '../lib/api'

class IdPage extends React.PureComponent {
  static contextType = ApiContext
  static async getInitialProps({ req, res, query }) {
    const path = query.id
    const parameter = path.length >= 19 && path.indexOf('.') < 0 ? path : null

    let snippet
    if (parameter) {
      const host = req ? req.headers.host : undefined
      snippet = await api.snippet.get(parameter, { host })
      if (snippet) {
        return { snippet }
      }

      // 404 Not found
      if (res) {
        res.writeHead(302, {
          Location: '/'
        })
        res.end()
      } else {
        Router.push('/')
      }
    }

    return {}
  }

  render() {
    return <IndexPage {...this.props} />
  }
}

export default IdPage
