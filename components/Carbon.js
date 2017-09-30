import { EOL } from 'os'
import * as hljs from 'highlight.js'
import React from 'react'
import domtoimage from 'dom-to-image'
import CodeMirror from 'react-codemirror'
import Spinner from 'react-spinner'
import toHash from 'tohash'
import WindowControls from '../components/WindowControls'
import { COLORS, DEFAULT_LANGUAGE, LANGUAGES } from '../lib/constants'

const LANGUAGE_MODE_HASH = toHash(LANGUAGES, 'mode')
const LANGUAGE_NAME_HASH = toHash(LANGUAGES, 'short')

const DEFAULT_SETTINGS = {
  paddingVertical: '50px',
  paddingHorizontal: '50px',
  marginVertical: '45px',
  marginHorizontal: '45px',
  background: '#fed0ec',
  theme: 'seti',
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

  handleLanguageChange(newCode, config) {
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
  }

  render() {
    const config = Object.assign(DEFAULT_SETTINGS, this.props.config)

    const options = {
      lineNumbers: false,
      mode: this.state.language || 'plaintext',
      theme: config.theme,
      scrollBarStyle: null,
      viewportMargin: Infinity,
      lineWrapping: true
    }

    // create styles
    const containerStyle = {
      background: config.background,
      padding: `${config.paddingVertical} ${config.paddingHorizontal}`
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
        <div id="container" style={containerStyle}>
          {config.windowControls ? <WindowControls theme={config.windowTheme} /> : null}
          <CodeMirror
            className={`CodeMirror__container window-theme__${config.windowTheme} ${config.dropShadow
              ? 'dropshadow'
              : ''}`}
            onChange={this.codeUpdated}
            value={this.props.children}
            options={options}
          />
          <style jsx>{`
            #container :global(.cm-s-dracula .CodeMirror-cursor) {
              border-left: solid 2px #159588;
            }

            #container :global(.cm-s-solarized) {
              background-color: #fdf6e3;
              color: #657b83;
              text-shadow: #eee8d5 0 1px;
              box-shadow: none;
            }

            #container :global(.CodeMirror__container.dropshadow) {
              box-shadow: 0 20px 68px rgba(0, 0, 0, 0.55);
              border-radius: 5px;
            }

            #container :global(.CodeMirror__container .CodeMirror) {
              height: auto;
              min-width: 680px;
              padding: 18px 18px;
              border-radius: 5px;
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
        `}</style>
      </div>
    )
  }
}

export default Carbon
