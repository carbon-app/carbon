import { EOL } from 'os'
import * as hljs from 'highlight.js'
import React from 'react'
import Spinner from 'react-spinner'
import ResizeObserver from 'resize-observer-polyfill'
import toHash from 'tohash'
import debounce from 'lodash.debounce'
import ms from 'ms'

import WindowControls from '../components/WindowControls'
import Watermark from '../components/svg/Watermark'
import CodeMirror from '../lib/react-codemirror'
import {
  COLORS,
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_MODE_HASH,
  LANGUAGE_NAME_HASH,
  DEFAULT_SETTINGS
} from '../lib/constants'

class Carbon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      language: props.config.language
    }

    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.handleTitleBarChange = this.handleTitleBarChange.bind(this)
    this.codeUpdated = this.codeUpdated.bind(this)
  }

  componentDidMount() {
    this.setState({
      loading: false
    })

    this.handleLanguageChange(this.props.children)

    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect
      this.props.onAspectRatioChange(cr.width / cr.height)
    })
    ro.observe(this.exportContainerNode)
  }

  componentWillReceiveProps(newProps) {
    this.handleLanguageChange(newProps.children, { customProps: newProps })
  }

  codeUpdated(newCode) {
    this.handleLanguageChange(newCode)
    this.props.updateCode(newCode)
  }

  handleTitleBarChange(newTitle) {
    this.props.updateTitleBar(newTitle)
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
    const backgroundImage =
      (this.props.config.backgroundImage && this.props.config.backgroundImageSelection) ||
      this.props.config.backgroundImage

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
          {config.windowControls ? (
            <WindowControls
              theme={config.windowTheme}
              handleTitleBarChange={this.handleTitleBarChange}
            />
          ) : null}
          <CodeMirror
            className={`CodeMirror__container window-theme__${config.windowTheme}`}
            onBeforeChange={(editor, meta, code) => this.codeUpdated(code)}
            value={this.props.children}
            options={options}
          />
          {config.watermark && <Watermark />}
          <div id="container-bg">
            <div className="white eliminateOnRender" />
            <div className="alpha eliminateOnRender" />
            <div className="bg" />
          </div>
          <style jsx>{`
            #container {
              position: relative;
              min-width: ${config.widthAdjustment ? '90px' : '680px'};
              max-width: 1024px; /* The Fallback */
              max-width: 92vw;
              padding: ${config.paddingVertical} ${config.paddingHorizontal};
            }

            #container :global(.watermark) {
              fill-opacity: 0.3;
              position: absolute;
              z-index: 2;
              bottom: calc(${config.paddingVertical} + 16px);
              right: calc(${config.paddingHorizontal} + 16px);
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
              ${this.props.config.backgroundMode === 'image'
                ? `background: url(${backgroundImage});
                   background-size: cover;
                   background-repeat: no-repeat;`
                : `background: ${this.props.config.backgroundColor || config.backgroundColor};
                   background-size: auto;
                   background-repeat: repeat;`} position: absolute;
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
              ${config.dropShadow
                ? `box-shadow: 0 ${config.dropShadowOffsetY} ${
                    config.dropShadowBlurRadius
                  } rgba(0, 0, 0, 0.55)`
                : ''};
            }

            #container :global(.CodeMirror__container .CodeMirror) {
              height: auto;
              min-width: inherit;
              padding: 18px 18px;
              ${config.lineNumbers ? 'padding-left: 12px;' : ''} border-radius: 5px;
              font-family: ${config.fontFamily}, monospace !important;
              font-size: ${config.fontSize};
              font-variant-ligatures: contextual;
              font-feature-settings: 'calt' 1;
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
        <div id="export-container" ref={ele => (this.exportContainerNode = ele)}>
          {content}
          <div id="twitter-png-fix" />
        </div>
        <style jsx>{`
          #section,
          #export-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }

          /* forces twitter to save images as png — https://github.com/dawnlabs/carbon/issues/86 */
          #twitter-png-fix {
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
