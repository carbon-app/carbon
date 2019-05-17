import React from 'react'
import dynamic from 'next/dynamic'
import * as hljs from 'highlight.js'
import debounce from 'lodash.debounce'
import ms from 'ms'
import { Controlled as CodeMirror } from 'react-codemirror2'
import SpinnerWrapper from './SpinnerWrapper'

import WindowControls from './WindowControls'
import {
  COLORS,
  LANGUAGE_MODE_HASH,
  LANGUAGE_NAME_HASH,
  LANGUAGE_MIME_HASH,
  DEFAULT_SETTINGS,
  THEMES_HASH
} from '../lib/constants'

const Watermark = dynamic(() => import('./svg/Watermark'), {
  loading: () => null
})

function searchLanguage(l) {
  const config = LANGUAGE_NAME_HASH[l] || LANGUAGE_MODE_HASH[l] || LANGUAGE_MIME_HASH[l]

  if (config) {
    return config.mime || config.mode
  }
}

class Carbon extends React.PureComponent {
  static defaultProps = {
    onChange: () => {}
  }

  componentDidUpdate(prevProps) {
    // TODO keep opacities in state
    if (
      prevProps.config.theme != this.props.config.theme ||
      prevProps.config.language != this.props.config.language
    ) {
      this.prevLine = null
    }
  }

  handleLanguageChange = debounce(
    (newCode, language) => {
      if (language === 'auto') {
        // try to set the language
        const detectedLanguage = hljs.highlightAuto(newCode).language
        const languageMode = searchLanguage(detectedLanguage)

        if (languageMode) {
          return languageMode
        }
      }

      const languageMode = searchLanguage(language)

      if (languageMode) {
        return languageMode
      }

      return language
    },
    ms('300ms'),
    {
      leading: true,
      trailing: true
    }
  )

  onBeforeChange = (editor, meta, code) => {
    if (!this.props.readOnly) {
      this.props.onChange(code)
    }
  }

  prevLine = null
  onGutterClick = (editor, lineNumber, gutter, e) => {
    editor.display.view.forEach((line, i, arr) => {
      if (i != lineNumber) {
        if (this.prevLine == null) {
          line.text.style.opacity = 0.5
          line.gutter.style.opacity = 0.5
        }
      } else {
        if (e.shiftKey && this.prevLine != null) {
          for (
            let index = Math.min(this.prevLine, i);
            index < Math.max(this.prevLine, i) + 1;
            index++
          ) {
            arr[index].text.style.opacity = arr[this.prevLine].text.style.opacity
            arr[index].gutter.style.opacity = arr[this.prevLine].gutter.style.opacity
          }
        } else {
          line.text.style.opacity = line.text.style.opacity == 1 ? 0.5 : 1
          line.gutter.style.opacity = line.gutter.style.opacity == 1 ? 0.5 : 1
        }
      }
    })
    this.prevLine = lineNumber
  }

  render() {
    const config = { ...DEFAULT_SETTINGS, ...this.props.config }

    const languageMode = this.handleLanguageChange(
      this.props.children,
      config.language && config.language.toLowerCase()
    )

    const options = {
      lineNumbers: config.lineNumbers,
      mode: languageMode || 'plaintext',
      theme: config.theme,
      scrollBarStyle: null,
      viewportMargin: Infinity,
      lineWrapping: true,
      extraKeys: {
        'Shift-Tab': 'indentLess'
      },
      // negative values removes the cursor, undefined means default (530)
      cursorBlinkRate: this.props.readOnly ? -1 : undefined,
      // needs to be able to refresh every 16ms to hit 60 frames / second
      pollInterval: 16
    }
    const backgroundImage =
      (this.props.config.backgroundImage && this.props.config.backgroundImageSelection) ||
      this.props.config.backgroundImage

    const themeConfig = this.props.theme || THEMES_HASH[config.theme]

    const light = themeConfig && themeConfig.light

    const content = (
      <div className="container">
        {config.windowControls ? (
          <WindowControls
            theme={config.windowTheme}
            code={this.props.children}
            copyable={this.props.copyable}
            light={light}
          />
        ) : null}
        <CodeMirror
          className={`CodeMirror__container window-theme__${config.windowTheme}`}
          onBeforeChange={this.onBeforeChange}
          value={this.props.children}
          options={options}
          onGutterClick={this.onGutterClick}
        />
        {config.watermark && <Watermark light={light} />}
        <div className="container-bg">
          <div className="white eliminateOnRender" />
          <div className="alpha eliminateOnRender" />
          <div className="bg" />
        </div>
        <style jsx>
          {`
            .container {
              position: relative;
              min-width: ${config.widthAdjustment ? '90px' : '680px'};
              max-width: 1024px;
              padding: ${config.paddingVertical} ${config.paddingHorizontal};
            }

            .container :global(.watermark) {
              fill-opacity: 0.75;
              position: absolute;
              z-index: 2;
              bottom: calc(${config.paddingVertical} + 16px);
              right: calc(${config.paddingHorizontal} + 16px);
            }

            .container .container-bg {
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
            }

            .container .white {
              background: #fff;
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
            }

            .container .bg {
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

            .container .alpha {
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==);
            }

            .container :global(.CodeMirror-gutters) {
              background-color: unset;
              border-right: none;
            }

            .container :global(.CodeMirror__container) {
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

            .container :global(.CodeMirror__container .CodeMirror) {
              height: auto;
              min-width: inherit;
              padding: 18px 18px;
              padding-left: 12px;
              ${config.lineNumbers ? 'padding-left: 12px;' : ''} border-radius: 5px;
              font-family: ${config.fontFamily}, monospace !important;
              font-size: ${config.fontSize};
              line-height: ${config.lineHeight};
              font-variant-ligatures: contextual;
              font-feature-settings: 'calt' 1;
              user-select: none;
            }

            .container :global(.CodeMirror-scroll),
            .container :global(.CodeMirror-hscrollbar) {
              overflow: hidden !important;
            }

            .container :global(.window-theme__sharp > .CodeMirror) {
              border-radius: 0px;
            }

            .container :global(.window-theme__bw > .CodeMirror) {
              border: 2px solid ${COLORS.SECONDARY};
            }

            .container :global(.window-controls + .CodeMirror__container > .CodeMirror) {
              padding-top: 48px;
            }

            .container :global(.CodeMirror-linenumber) {
              cursor: pointer;
            }
          `}
        </style>
      </div>
    )

    return (
      <div className="section">
        <div className="export-container" ref={this.props.innerRef} id="export-container">
          <SpinnerWrapper loading={this.props.loading}>{content}</SpinnerWrapper>
          <div className="twitter-png-fix" />
        </div>
        <style jsx>
          {`
            .section,
            .export-container {
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            }

            /* forces twitter to save images as png — https://github.com/dawnlabs/carbon/issues/86 */
            .twitter-png-fix {
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

export default React.forwardRef((props, ref) => <Carbon {...props} innerRef={ref} />)
