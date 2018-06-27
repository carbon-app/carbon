// Theirs
import React from 'react'

// Ours
import Editor from '../components/Editor'
import Page from '../components/Page'
import api from '../lib/api'
import { getQueryStringState, updateQueryString } from '../lib/routing'
import { saveState, escapeHtml } from '../lib/util'

class Index extends React.Component {
  static async getInitialProps({ asPath, query }) {
    const path = removeQueryString(asPath.split('/').pop())
    const queryParams = getQueryStringState(query)
    const initialState = Object.keys(queryParams).length ? queryParams : {}
    try {
      // TODO fix this hack
      if (path.length >= 19 && path.indexOf('.') === -1) {
        const { content, language } = await api.getGist(path)
        if (language) {
          initialState.language = language.toLowerCase()
        }
        return { content, initialState }
      }
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
    }
    return { initialState }
  }

  render() {
    return (
      <Page enableHeroText={true}>
        <Editor {...this.props} onUpdate={onEditorUpdate} tweet={api.tweet} />
      </Page>
    )
  }
}

function onEditorUpdate(state) {
  updateQueryString(state)
  const s = { ...state }
  delete s.code
  delete s.backgroundImage
  delete s.backgroundImageSelection
  saveState(localStorage, s)
}

function removeQueryString(str) {
  const qI = str.indexOf('?')
  return escapeHtml(qI >= 0 ? str.substr(0, qI) : str)
}

export default Index
