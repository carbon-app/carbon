import React from 'react'
import Router from 'next/router'

import EmbedPage from './index'

import api from '../../lib/api'

export async function getServerSideProps({ req, res, query }) {
  const { id: path, filename } = query

  const parameter = path.length >= 19 && path.indexOf('.') < 0 ? path : null

  let snippet
  if (parameter) {
    const host = req ? req.headers.host : undefined
    snippet = await api.snippet.get(parameter, { host, filename })
    if (snippet /* && snippet.gist_id */) {
      return { props: { snippet } }
    }

    // 404 Not found
    if (res) {
      res.writeHead(302, {
        Location: '/embed',
      })
      res.end()
    } else {
      Router.push('/embed')
    }
  }

  return { props: {} }
}

export default React.memo(function EmbedIdPage(props) {
  return <EmbedPage {...props} />
})
