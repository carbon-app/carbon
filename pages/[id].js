import React from 'react'
import Router from 'next/router'

import IndexPage from './index'

import api from '../lib/api'

export async function getServerSideProps({ req, res, query }) {
  const { id: path, filename } = query
  const parameter = path.length >= 19 && path.indexOf('.') < 0 ? path : null

  let snippet
  if (parameter) {
    const host = req ? req.headers.host : undefined
    snippet = await api.snippet.get(parameter, { host, filename })
    if (snippet) {
      return { props: { snippet, host } }
    }

    // 404 Not found
    if (res) {
      res.writeHead(302, {
        Location: '/',
      })
      res.end()
    } else {
      Router.push('/')
    }
  }

  return { props: {} }
}

export default React.memo(function IdPage(props) {
  return <IndexPage {...props} />
})
