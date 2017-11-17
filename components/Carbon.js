import { EOL } from 'os'
import * as hljs from 'highlight.js'
import React from 'react'
import domtoimage from 'dom-to-image'
import Spinner from 'react-spinner'
import toHash from 'tohash'
import debounce from 'lodash.debounce'
import ms from 'ms'
import WindowControls from '../components/WindowControls'
import CodeMirror from '../lib/react-codemirror'
import {
  COLORS,
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_MODE_HASH,
  LANGUAGE_NAME_HASH
} from '../lib/constants'

const DEFAULT_SETTINGS = {
  paddingVertical: '50px',
  paddingHorizontal: '50px',
  marginVertical: '45px',
  marginHorizontal: '45px',
  background: 'rgba(171, 184, 195, 1)',
  theme: 'seti',
  windowTheme: 'none',
  language: DEFAULT_LANGUAGE
}

class Carbon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      language: props.config.language
    }

    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.codeUpdated = this.codeUpdated.bind(this)
  }

  componentDidMount() {
    this.setState({
      loading: false
    })

    this.handleLanguageChange(this.props.children)
  }

  componentWillReceiveProps(newProps) {
    this.handleLanguageChange(newProps.children, { customProps: newProps })
  }

  codeUpdated(newCode) {
    this.handleLanguageChange(newCode)
    this.props.updateCode(newCode)
  }

  handleLanguageChange = debounce(
    (newCode, config) => {
      const props = (config && config.customProps) || this.props

      if (props.config.language === 'auto') {
        // try to set the language
        const detectedLanguage = hljs.highlightAuto(newCode).language
        const languageMode =
          LANGUAGE_MODE_HASH[detectedLanguage] || LANGUAGE_NAME_HASH[detectedLanguage]

        if (languageMode) {
          this.setState({ language: languageMode.mime || languageMode.mode })
        }
      } else {
        this.setState({ language: props.config.language })
      }
    },
    ms('300ms'),
    { trailing: true }
  )

  render() {
    const config = { ...DEFAULT_SETTINGS, ...this.props.config }
    const options = {
      lineNumbers: config.lineNumbers,
      mode: this.state.language || 'plaintext',
      theme: config.theme,
      scrollBarStyle: null,
      viewportMargin: Infinity,
      lineWrapping: true
    }

    // set content to spinner if loading, else editor
    let content = (
      <div>
        <Spinner />
        <style jsx>
          {`
            div {
              height: 352px;
            }
          `}
        </style>
      </div>
    )
    if (this.state.loading === false) {
      content = (
        <div id="container">
          {config.windowControls ? <WindowControls theme={config.windowTheme} /> : null}
          <CodeMirror
            className={`CodeMirror__container window-theme__${config.windowTheme}`}
            onBeforeChange={(editor, meta, code) => this.codeUpdated(code)}
            value={this.props.children}
            options={options}
          />
          <div id="container-bg">
            <div className="white eliminateOnRender" />
            <div className="alpha eliminateOnRender" />
            <div className="bg" />
          </div>
          <style jsx>{`
            #container {
              position: relative;
              min-width: ${config.widthAdjustment ? '90px' : '680px'};
              padding: ${config.paddingVertical} ${config.paddingHorizontal};
            }

            #container #container-bg {
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
            }

            #container .white {
              background: #fff;
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
            }

            #container .bg {
              background: ${this.props.config.background || config.background};
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
            }

            #container .alpha {
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==)
                left center;
            }

            #container :global(.cm-s-dracula .CodeMirror-cursor) {
              border-left: solid 2px #159588;
            }

            #container :global(.cm-s-solarized) {
              box-shadow: none;
            }

            #container :global(.cm-s-solarized.cm-s-light) {
              text-shadow: #eee8d5 0 1px;
            }

            #container :global(.CodeMirror-gutters) {
              background-color: unset;
              border-right: none;
            }

            #container :global(.CodeMirror__container) {
              min-width: inherit;
              position: relative;
              z-index: 1;
              border-radius: 5px;
              ${config.dropShadow ? 'box-shadow: 0 20px 68px rgba(0, 0, 0, 0.55);' : ''};
            }

            #container :global(.CodeMirror__container .CodeMirror) {
              height: auto;
              min-width: inherit;
              padding: 18px 18px;
              ${config.lineNumbers ? 'padding-left: 12px;' : ''} border-radius: 5px;
              font-family: Hack, monospace !important;
              font-size: 0.8rem;
              user-select: none;
            }

            #container :global(.CodeMirror-scroll) {
              overflow: hidden !important;
            }

            #container :global(.window-theme__sharp > .CodeMirror) {
              border-radius: 0px;
            }

            #container :global(.window-theme__bw > .CodeMirror) {
              border: 2px solid ${COLORS.SECONDARY};
            }

            #container :global(.window-controls + .CodeMirror__container > .CodeMirror) {
              padding-top: 48px;
            }
          `}</style>
        </div>
      )
    }

    return (
      <div id="section">
        {content}
        <style jsx>{`
          #section {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          #section::after {
            content: '';
            position: absolute;
            bottom: 0;
            height: 1px;
            width: 100%;
            background: rgba(0, 0, 0, 0.01);
          }
        `}</style>
      </div>
    )
  }
}

export default Carbon
