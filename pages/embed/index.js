// Theirs
import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

// Ours
import ApiContext from '../../components/ApiContext'
import { StylesheetLink, CodeMirrorLink, MetaTags } from '../../components/Meta'
import Font from '../../components/style/Font'
import Carbon from '../../components/Carbon'
import { DEFAULT_CODE, DEFAULT_SETTINGS, THEMES_HASH } from '../../lib/constants'
import { getRouteState } from '../../lib/routing'

function ApplyHighlights({ highlights }) {
  /**
   * TODO create shared global component and import in components/Theme
   *      https://github.com/carbon-app/carbon/issues/1018
   */
  return (
    <style jsx global>
      {`
        :global(.CodeMirror__container .CodeMirror) {
          color: ${highlights.text} !important;
          background-color: ${highlights.background} !important;
        }

        :global(.cm-string),
        :global(.cm-string-2) {
          color: ${highlights.string} !important;
        }
        :global(.cm-comment) {
          color: ${highlights.comment} !important;
        }
        :global(.cm-variable) {
          color: ${highlights.variable} !important;
        }
        :global(.cm-variable-2) {
          color: ${highlights.variable2 || highlights.variable} !important;
        }
        :global(.cm-variable-3) {
          color: ${highlights.variable3 || highlights.variable} !important;
        }
        :global(.cm-number) {
          color: ${highlights.number} !important;
        }
        :global(.cm-keyword) {
          color: ${highlights.keyword} !important;
        }
        :global(.cm-property) {
          color: ${highlights.property} !important;
        }
        :global(.cm-def) {
          color: ${highlights.definition} !important;
        }
        :global(.cm-meta) {
          color: ${highlights.meta} !important;
        }
        :global(.cm-operator) {
          color: ${highlights.operator} !important;
        }
        :global(.cm-attribute) {
          color: ${highlights.attribute} !important;
        }

        :global(.cm-s-dracula .CodeMirror-cursor) {
          border-left: solid 2px #159588 !important;
        }

        :global(.cm-s-solarized) {
          box-shadow: none !important;
        }

        :global(.cm-s-solarized.cm-s-light) {
          text-shadow: #eee8d5 0 1px !important;
        }

        :global(.cm-s-solarized.cm-s-light .CodeMirror-linenumber),
        :global(.cm-s-solarized.cm-s-light .CodeMirror-linenumbers) {
          background-color: #fdf6e3 !important;
        }

        :global(.cm-s-solarized.cm-s-dark .CodeMirror-linenumber),
        :global(.cm-s-solarized.cm-s-dark .CodeMirror-linenumbers) {
          background-color: #002b36 !important;
        }
      `}
    </style>
  )
}

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
    {props.theme === 'a11y-dark' && (
      <ApplyHighlights highlights={THEMES_HASH[props.theme].highlights} />
    )}
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
