// Theirs
import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import morph from 'morphmorph'

// Ours
import ApiContext from '../components/ApiContext'
import { StylesheetLink, CodeMirrorLink, MetaTags } from '../components/Meta'
import Carbon from '../components/Carbon'
import { DEFAULT_CODE, DEFAULT_SETTINGS } from '../lib/constants'
import { getRouteState } from '../lib/routing'

const isInIFrame = morph.get('parent.window.parent')
const getParent = win => {
  const iFrame = isInIFrame(win)

  if (iFrame) {
    return iFrame
  }

  return win.parent
}

const Page = props => (
  <React.Fragment>
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
  </React.Fragment>
)

class Embed extends React.Component {
  static contextType = ApiContext

  state = {
    ...DEFAULT_SETTINGS,
    code: DEFAULT_CODE,
    mounted: false,
    readOnly: true
  }

  async componentDidMount() {
    const { queryState, parameter } = getRouteState(this.props.router)

    let gistState
    if (this.context.gist && parameter) {
      const gist = await this.context.gist.get(parameter)
      gistState = gist && gist.config
    }

    this.setState(
      {
        ...gistState,
        ...queryState,
        copyable: queryState.copy !== false,
        readOnly: queryState.readonly !== false,
        mounted: true
      },
      this.postMessage
    )
  }

  ref = React.createRef()

  postMessage = () => {
    getParent(window).postMessage(
      JSON.stringify({
        // Used by embed provider
        src: window.location.toString(),
        context: 'iframe.resize',
        height: this.ref.current.offsetHeight
      }),
      '*'
    )
  }

  updateCode = code => {
    this.setState({ code }, this.postMessage)

    getParent(window).postMessage(
      {
        id: this.state.id ? `carbon:${this.state.id}` : 'carbon',
        code
      },
      '*'
    )
  }

  render() {
    return (
      <Page theme={this.state.theme}>
        {this.state.mounted && (
          <Carbon
            ref={this.ref}
            config={this.state}
            readOnly={this.state.readOnly}
            copyable={this.state.copyable}
            onChange={this.updateCode}
          >
            {this.state.code}
          </Carbon>
        )}
      </Page>
    )
  }
}

export default withRouter(Embed)
