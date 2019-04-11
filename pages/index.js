// Theirs
import React from 'react'
import { withRouter } from 'next/router'
import { register, unregister } from 'next-offline/runtime'
import debounce from 'lodash.debounce'

// Ours
import Editor from '../components/Editor'
import Page from '../components/Page'
import { MetaLinks } from '../components/Meta'
import { updateRouteState } from '../lib/routing'
import { saveSettings, clearSettings, omit } from '../lib/util'

class Index extends React.Component {
  componentDidMount() {
    register()
  }
  componentWillUnmount() {
    unregister()
  }

  shouldComponentUpdate = () => false

  onEditorUpdate = debounce(
    state => {
      updateRouteState(this.props.router, omit(state, ['highlights']))
      saveSettings(
        localStorage,
        omit(state, [
          'code',
          'backgroundImage',
          'backgroundImageSelection',
          'filename',
          'highlights'
        ])
      )
    },
    750,
    { trailing: true, leading: true }
  )

  render() {
    return (
      <Page enableHeroText={true}>
        <MetaLinks />
        <Editor router={this.props.router} onUpdate={this.onEditorUpdate} onReset={onReset} />
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
