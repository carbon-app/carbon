import React from 'react'
import { withRouter } from 'next/router'
import { getRouteState } from '../lib/routing'

import { client } from '../lib/api'

export default withRouter(function(props) {
  React.useEffect(() => {
    const { queryState: query } = getRouteState(props.router)

    if (query.code) {
      client
        .post('/oauth/access_token', {
          code: query.code
        })
        .then(res => localStorage.setItem('t', res.data.access_token))
        .catch(console.error)
        .then(() => props.router.push('/'))
    }
  })

  return null
})
