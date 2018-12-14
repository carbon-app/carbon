// Theirs
import React from 'react'
import { withRouter } from 'next/router'

// Ours
import Editor from '../components/Editor'
import Page from '../components/Page'
import api from '../lib/api'
import { updateQueryString } from '../lib/routing'
import { saveSettings, clearSettings, omit } from '../lib/util'

class Index extends React.Component {
  shouldComponentUpdate = () => false

  onEditorUpdate = state => {
    updateQueryString(this.props.router, state)
    saveSettings(
      localStorage,
      omit(state, ['code', 'backgroundImage', 'backgroundImageSelection', 'filename'])
    )
  }

  render() {
    return (
      <Page enableHeroText={true}>
        <Editor
          router={this.props.router}
          onUpdate={this.onEditorUpdate}
          api={api}
          onReset={onReset}
        />
      </Page>
    )
  }
}

function onReset() {
  clearSettings()

  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister()
      }
    })
  }
}

export default withRouter(Index)
