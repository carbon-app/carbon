import React from 'react'
import { withRouter } from 'next/router'
import url from 'url'

import { escapeHtml } from '../lib/util'
import ApiContext from './ApiContext'

class GistContainer extends React.Component {
  static contextType = ApiContext

  async componentDidMount() {
    const { asPath = '' } = this.props.router
    const { pathname } = url.parse(asPath, true)
    const path = escapeHtml(pathname.split('/').pop())
    let newState = {}

    if (this.context.gist && path.length >= 19 && path.indexOf('.') === -1) {
      try {
        const { gist_id, code, language, config } = await this.context.gist.get(path)
        if (typeof config === 'object') {
          newState = config
        }
        if (language) {
          newState.language = language.toLowerCase()
        }
        newState.code = code
        newState.gist_id = gist_id
      } catch (e) {
        // eslint-disable-next-line
        console.log(e)
      }
    }
    this.props.onChange(newState)
  }

  render() {
    return null
  }
}

export default withRouter(GistContainer)
