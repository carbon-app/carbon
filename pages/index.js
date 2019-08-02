// Theirs
import React from 'react'
import { withRouter } from 'next/router'
import { register, unregister } from 'next-offline/runtime'
import debounce from 'lodash.debounce'
import Either from 'eitherx'

// Ours
import EditorContainer from '../components/EditorContainer'
import Page from '../components/Page'
import { MetaLinks } from '../components/Meta'
import { updateRouteState } from '../lib/routing'
import { saveSettings, clearSettings } from '../lib/util'

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
      updateRouteState(this.props.router, state)
      saveSettings(state)
    },
    750,
    { trailing: true, leading: true }
  )

  render() {
    return (
      <Page enableHeroText={true}>
        <MetaLinks />
        <Either>
          <EditorContainer
            router={this.props.router}
            onUpdate={this.onEditorUpdate}
            onReset={onReset}
          />
          <p>
            An unexpected error has occurred. Please{' '}
            <u>
              <a href="https://github.com/carbon-app/carbon">file an issue here</a>
            </u>
            .
          </p>
        </Either>
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
