// Theirs
import React from 'react'

// Ours
import Editor from '../components/Editor'
import Page from '../components/Page'
import api from '../lib/api'
import { updateQueryString } from '../lib/routing'
import { saveState } from '../lib/util'

class Index extends React.Component {
  render() {
    return (
      <Page enableHeroText={true}>
        <Editor {...this.props.url} onUpdate={onEditorUpdate} tweet={api.tweet} />
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

export default Index
