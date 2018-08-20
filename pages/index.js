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
    return (
      <Page enableHeroText={true}>
        <Editor {...this.props.router} onUpdate={onEditorUpdate} api={api} onReset={onReset} />
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

function onReset() {
  localStorage.clear()

  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister()
      }
    })
  }
}

export default withRouter(Index)
