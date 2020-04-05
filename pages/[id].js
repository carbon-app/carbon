import React from 'react'
import Router from 'next/router'

import IndexPage from './index'

import api from '../lib/api'

export async function getServerSideProps({ req, res, query }) {
  const path = query.id
  const parameter = path.length >= 19 && path.indexOf('.') < 0 ? path : null

  let snippet
  if (parameter) {
    const host = req ? req.headers.host : undefined
    snippet = await api.snippet.get(parameter, { host })
    if (snippet) {
      return { props: { snippet } }
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
