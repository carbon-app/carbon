import React, { PureComponent } from 'react'
import * as hljs from 'highlight.js'
import ResizeObserver from 'resize-observer-polyfill'
import debounce from 'lodash.debounce'
import ms from 'ms'

import WindowControls from '../components/WindowControls'
import Watermark from '../components/svg/Watermark'
import CodeMirror from '../lib/react-codemirror'
import { COLORS, LANGUAGE_MODE_HASH, LANGUAGE_NAME_HASH, DEFAULT_SETTINGS } from '../lib/constants'

const handleLanguageChange = (newCode, props) => {
  if (props.config.language === 'auto') {
    // try to set the language
    const detectedLanguage = hljs.highlightAuto(newCode).language
    const languageMode =
      LANGUAGE_MODE_HASH[detectedLanguage] || LANGUAGE_NAME_HASH[detectedLanguage]

    if (languageMode) {
      return { language: languageMode.mime || languageMode.mode }
    }
  }
  return { language: props.config.language }
}

class Carbon extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      language: props.config.language
    }

    this.handleTitleBarChange = this.handleTitleBarChange.bind(this)
    this.codeUpdated = this.codeUpdated.bind(this)
    this.onBeforeChange = this.onBeforeChange.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
  }

  componentDidMount() {
    this.setState(handleLanguageChange(this.props.children, this.props))

    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect
      this.props.onAspectRatioChange(cr.width / cr.height)
    })
    ro.observe(this.exportContainerNode)
  }

  static getDerivedStateFromProps(newProps) {
    return handleLanguageChange(newProps.children, newProps) || null
  }

  codeUpdated(newCode) {
    this.handleLanguageChange(newCode, this.props)
    this.props.updateCode(newCode)
  }

  handleTitleBarChange(newTitle) {
    this.props.updateTitleBar(newTitle)
  }

  handleLanguageChange = debounce(
    (...args) => this.setState(handleLanguageChange(...args)),
    ms('300ms'),
    { trailing: true }
  )

  onBeforeChange(editor, meta, code) {
    return this.codeUpdated(code)
  }

  render() {
    const config = { ...DEFAULT_SETTINGS, ...this.props.config }
    const options = {
      lineNumbers: config.lineNumbers,
      mode: this.state.language || 'plaintext',
      theme: config.theme,
      scrollBarStyle: null,
      viewportMargin: Infinity,
      lineWrapping: true,
      extraKeys: {
        'Shift-Tab': 'indentLess'
      }
    }
    const backgroundImage =
      (this.props.config.backgroundImage && this.props.config.backgroundImageSelection) ||
      this.props.config.backgroundImage

    const content = (
      <div id="container">
        {config.windowControls ? (
          <WindowControls
            titleBar={this.props.titleBar}
            theme={config.windowTheme}
            handleTitleBarChange={this.handleTitleBarChange}
          />
        ) : null}
        <CodeMirror
          className={`CodeMirror__container window-theme__${config.windowTheme}`}
          onBeforeChange={this.onBeforeChange}
          value={this.props.children}
          options={options}
        />
        {config.watermark && <Watermark />}
        <div id="container-bg">
          <div className="white eliminateOnRender" />
          <div className="alpha eliminateOnRender" />
          <div className="bg" />
        </div>
        <style jsx>
          {`
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
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==);
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
              line-height: ${config.lineHeight};
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
          `}
        </style>
      </div>
    )

    return (
      <div id="section">
        <div id="export-container" ref={ele => (this.exportContainerNode = ele)}>
          {content}
          <div id="twitter-png-fix" />
        </div>
        <style jsx>
          {`
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
          `}
        </style>
      </div>
    )
  }
}

export default Carbon
