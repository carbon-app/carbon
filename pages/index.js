// Theirs
import React from 'react'
import { withRouter } from 'next/router'

// Ours
import Editor from '../components/Editor'
import Page from '../components/Page'
import api from '../lib/api'
import { updateQueryString } from '../lib/routing'
import { saveState } from '../lib/util'

class Index extends React.Component {
  render() {
    const {router} = this.props
    return (
      <Page enableHeroText={true}>
        <Editor {...router} onUpdate={(state) => onEditorUpdate(router, state)} api={api} />
      </Page>
    )
  }
}

function onEditorUpdate(router, state) {
  updateQueryString(router, state)
  const s = { ...state }
  delete s.code
  delete s.backgroundImage
  delete s.backgroundImageSelection
  saveState(localStorage, s)
}

export default withRouter(Index)
