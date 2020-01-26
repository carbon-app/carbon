import React from 'react'
import Router from 'next/router'

import EmbedPage from './index'
import ApiContext from '../../components/ApiContext'

import api from '../../lib/api'

class EmbedIdPage extends React.PureComponent {
  static contextType = ApiContext
  static async getInitialProps({ req, res, query }) {
    const path = query.id
    const parameter = path.length >= 19 && path.indexOf('.') < 0 ? path : null

    let snippet
    if (parameter) {
      const host = req ? req.headers.host : undefined
      snippet = await api.snippet.get(parameter, { host })
      if (snippet /* && snippet.gist_id */) {
        return { snippet }
      }

      // 404 Not found
      if (res) {
        res.writeHead(302, {
          Location: '/embed'
        })
        res.end()
      } else {
        Router.push('/embed')
      }
    }

    return {}
  }

  render() {
    return <EmbedPage {...this.props} />
  }
}

export default EmbedIdPage
