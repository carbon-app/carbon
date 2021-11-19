// Theirs
import React from 'react'
import { withRouter } from 'next/router'
import Either from 'eitherx'

// Ours
import EditorContainer from '../components/EditorContainer'
import Page from '../components/Page'
import { MetaLinks } from '../components/Meta'

class Index extends React.Component {
  componentDidMount() {
    if (window.workbox && window.workbox.register) {
      window.workbox.register()
    }
  }
  componentWillUnmount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister()
      })
    }
  }

  shouldComponentUpdate = () => false

  render() {
    return (
      <Page enableHeroText={true} flex={true}>
        <MetaLinks />
        <Either>
          <EditorContainer router={this.props.router} snippet={this.props.snippet} />
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

export default withRouter(Index)
