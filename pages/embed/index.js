// Theirs
import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

// Ours
import ApiContext from '../../components/ApiContext'
import { StylesheetLink, CodeMirrorLink, MetaTags } from '../../components/Meta'
import Font from '../../components/style/Font'
import Carbon from '../../components/Carbon'
import { DEFAULT_CODE, DEFAULT_SETTINGS } from '../../lib/constants'
import { getRouteState } from '../../lib/routing'

const Page = props => (
  <React.Fragment>
    <Head>
      <title>Carbon Embeds</title>
    </Head>
    <MetaTags />
    <StylesheetLink theme={props.theme} />
    <CodeMirrorLink />
    <Font />
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
  </React.Fragment>
)

class Embed extends React.Component {
  static contextType = ApiContext

  state = {
    ...DEFAULT_SETTINGS,
    code: DEFAULT_CODE,
    mounted: false,
    readOnly: true,
    key: 0,
  }

  snippet = {}

  async componentDidMount() {
    const { queryState } = getRouteState(this.props.router)

    this.setState(
      {
        ...this.props.snippet,
        ...queryState,
        copyable: queryState.copy !== false,
        readOnly: queryState.readonly !== false,
        mounted: true,
      },
      this.postMessage
    )
  }

  ref = React.createRef()

  postMessage = () => {
    setTimeout(
      () =>
        window.top.postMessage(
          JSON.stringify({
            // Used by embed provider
            src: window.location.toString(),
            context: 'iframe.resize',
            height: this.ref.current.offsetHeight,
          }),
          '*'
        ),
      0
    )
  }

  updateCode = code => {
    this.setState({ code }, this.postMessage)

    window.top.postMessage(
      {
        id: this.state.id ? `carbon:${this.state.id}` : 'carbon',
        code,
      },
      '*'
    )
  }

  render() {
    return (
      <Page theme={this.state.theme}>
        <div hidden={!this.state.mounted}>
          <Carbon
            key={this.state.mounted}
            ref={this.ref}
            config={this.state}
            readOnly={this.state.readOnly}
            copyable={this.state.copyable}
            onChange={this.updateCode}
          >
            {this.state.code}
          </Carbon>
        </div>
        <style jsx global>
          {`
            .eliminateOnRender,
            .twitter-png-fix {
              display: none;
            }
          `}
        </style>
      </Page>
    )
  }
}

export default withRouter(Embed)
