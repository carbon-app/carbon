// Theirs
import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import url from 'url'

// Ours
import { StylesheetLink, CodeMirrorLink, MetaTags } from '../components/Meta'
import Carbon from '../components/Carbon'
import { DEFAULT_CODE, DEFAULT_SETTINGS } from '../lib/constants'

import { getQueryStringState } from '../lib/routing'

const Page = props => (
  <div>
    <Head>
      <title>Carbon Embeds</title>
    </Head>
    <MetaTags />
    <StylesheetLink theme={props.theme} />
    <CodeMirrorLink />
    {props.children}
    <style jsx global>
      {`
        html,
        body {
          margin: 0;
          background: transparent;
          min-height: 0;
        }
      `}
    </style>
  </div>
)

class Embed extends React.Component {
  state = {
    ...DEFAULT_SETTINGS,
    code: DEFAULT_CODE,
    mounted: false,
    readOnly: true
  }

  componentDidMount() {
    const { asPath = '' } = this.props.router
    const { query } = url.parse(asPath, true)
    const queryParams = getQueryStringState(query)
    const initialState = Object.keys(queryParams).length ? queryParams : {}

    this.setState({
      ...initialState,
      copyable: queryParams.copy !== false,
      readOnly: queryParams.readonly !== false,
      mounted: true
    })
  }

  updateCode = code => this.setState({ code })

  render() {
    return (
      <Page theme={this.state.theme}>
        {this.state.mounted && (
          <Carbon
            config={this.state}
            readOnly={this.state.readOnly}
            copyable={this.state.copyable}
            updateCode={this.updateCode}
          >
            {this.state.code}
          </Carbon>
        )}
      </Page>
    )
  }
}

export default withRouter(Embed)
