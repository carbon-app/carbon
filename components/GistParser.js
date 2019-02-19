import React from 'react'
import url from 'url'
import { withRouter } from 'next/router'

import { escapeHtml } from '../lib/util'
import ApiContext from './ApiContext'

class GistParser extends React.PureComponent {
  static contextType = ApiContext

  async componentDidMount() {
    const { asPath = '' } = this.props.router
    const { pathname } = url.parse(asPath, true)
    const path = escapeHtml(pathname.split('/').pop())
  
    if (this.context.gist && path.length >= 19 && path.indexOf('.') === -1) {
      try {
        const { code, language, config } = await this.context.gist.get(path)
        const newState = typeof config === 'object' ? config : {}
        if (language) {
          newState.language = language.toLowerCase()
        }
        newState.code = code
        this.props.onChange(newState)
      } catch (e) {
        // eslint-disable-next-line
        console.log(e)
      }
    }
  }

  render() {
    return null;
  }
}

export default withRouter(GistParser)
