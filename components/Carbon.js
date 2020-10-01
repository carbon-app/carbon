import React from 'react'
import ReactDOM from 'react-dom'
import dynamic from 'next/dynamic'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import debounce from 'lodash.debounce'
import ms from 'ms'
import { Controlled as CodeMirror } from 'react-codemirror2'

hljs.registerLanguage('javascript', javascript)

import SpinnerWrapper from './SpinnerWrapper'
import WindowControls from './WindowControls'
import WidthHandler from './WidthHandler'

import {
  COLORS,
  LANGUAGES,
  LANGUAGE_MODE_HASH,
  LANGUAGE_NAME_HASH,
  LANGUAGE_MIME_HASH,
  DEFAULT_SETTINGS,
  THEMES_HASH,
} from '../lib/constants'

const SelectionEditor = dynamic(() => import('./SelectionEditor'), {
  loading: () => null,
})
const Watermark = dynamic(() => import('./svg/Watermark'), {
  loading: () => null,
})

function searchLanguage(l) {
  return LANGUAGE_NAME_HASH[l] || LANGUAGE_MODE_HASH[l] || LANGUAGE_MIME_HASH[l]
}

function noop() {}
function getUnderline(underline) {
  switch (underline) {
    case 1:
      return 'underline'
    case 2:
      /**
       * Chrome will only round to the nearest wave, causing visual inconsistencies
       * https://stackoverflow.com/questions/57559588/how-to-make-the-wavy-underline-extend-cover-all-the-characters-in-chrome
       */
      return `${COLORS.RED} wavy underline; text-decoration-skip-ink: none`
  }
  return 'initial'
}

class Carbon extends React.PureComponent {
  static defaultProps = {
    onChange: noop,
    onGutterClick: noop,
  }
  state = {}

  handleLanguageChange = debounce(
    (newCode, language) => {
      if (language === 'auto') {
        // try to set the language
        const detectedLanguage = hljs.highlightAuto(newCode).language
        const languageMode = searchLanguage(detectedLanguage)

        if (languageMode) {
          return languageMode.mime || languageMode.mode
        }
      }

      const languageMode = searchLanguage(language)

      if (languageMode) {
        return languageMode.mime || languageMode.mode
      }

      return language
    },
    ms('300ms'),
    {
      leading: true,
      trailing: true,
    }
  )

  onBeforeChange = (editor, meta, code) => {
    if (!this.props.readOnly) {
      this.props.onChange(code)
    }
  }

  onSelection = (ed, data) => {
    if (this.props.readOnly) {
      return
    }

    const selection = data.ranges[0]
    if (
      selection.head.line === selection.anchor.line &&
      selection.head.ch === selection.anchor.ch
    ) {
      return (this.currentSelection = null)
    }
    if (selection.head.line + selection.head.ch > selection.anchor.line + selection.anchor.ch) {
      this.currentSelection = {
        from: selection.anchor,
        to: selection.head,
      }
    } else {
      this.currentSelection = {
        from: selection.head,
        to: selection.anchor,
      }
    }
  }

  onMouseUp = () => {
    if (this.currentSelection) {
      this.setState({ selectionAt: this.currentSelection }, () => {
        this.currentSelection = null
      })
    } else {
      this.setState({ selectionAt: null })
    }
  }

  onSelectionChange = changes => {
    if (this.state.selectionAt) {
      const css = [
        changes.bold != null && `font-weight: ${changes.bold ? 'bold' : 'initial'}`,
        changes.italics != null && `font-style: ${changes.italics ? 'italic' : 'initial'}`,
        changes.underline != null && `text-decoration: ${getUnderline(changes.underline)}`,
        changes.color != null && `color: ${changes.color} !important`,
      ]
        .filter(Boolean)
        .join('; ')

      if (css) {
        this.props.editorRef.current.editor.doc.markText(
          this.state.selectionAt.from,
          this.state.selectionAt.to,
          { css }
        )
      }
    }
  }

  render() {
    const config = { ...DEFAULT_SETTINGS, ...this.props.config }

    const languageMode = this.handleLanguageChange(
      this.props.children,
      config.language && config.language.toLowerCase()
    )

    const options = {
      screenReaderLabel: 'Code editor',
      lineNumbers: config.lineNumbers,
      firstLineNumber: config.firstLineNumber,
      mode: languageMode || 'plaintext',
      theme: config.theme,
      scrollbarStyle: null,
      viewportMargin: Infinity,
      lineWrapping: true,
      smartIndent: true,
      extraKeys: {
        'Shift-Tab': 'indentLess',
      },
      readOnly: this.props.readOnly,
      showInvisibles: config.hiddenCharacters,
    }
    const backgroundImage =
      (this.props.config.backgroundImage && this.props.config.backgroundImageSelection) ||
      this.props.config.backgroundImage

    const themeConfig = this.props.theme || THEMES_HASH[config.theme]

    const light = themeConfig && themeConfig.light

    /* eslint-disable jsx-a11y/no-static-element-interactions */
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
          ref={this.props.editorRef}
          className={`CodeMirror__container window-theme__${config.windowTheme}`}
          value={this.props.children}
          options={options}
          onBeforeChange={this.onBeforeChange}
          onGutterClick={this.props.onGutterClick}
          onSelection={this.onSelection}
        />
        {config.watermark && <Watermark light={light} />}
        <div className="container-bg">
          <div className="white eliminateOnRender" />
          <div className="alpha eliminateOnRender" />
          <div className="bg" />
        </div>

        <WidthHandler
          innerRef={this.props.innerRef}
          onChange={this.props.updateWidth}
          paddingHorizontal={config.paddingHorizontal}
        />
        <style jsx>
          {`
            .container {
              position: relative;
              min-width: ${config.widthAdjustment ? '90px' : 'auto'};
              max-width: ${config.widthAdjustment ? '1024px' : 'none'};
              ${config.widthAdjustment ? '' : `width: ${config.width}px;`}
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
                    background-repeat: repeat;`}
              position: absolute;
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
                ? `box-shadow: 0 ${config.dropShadowOffsetY} ${config.dropShadowBlurRadius} rgba(0, 0, 0, 0.55)`
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

            .container :global(.CodeMirror-cursor) {
              visibility: ${this.props.readOnly ? 'hidden' : ''};
            }

            @media (max-width: 768px) {
              /* show cursor on mobile */
              .container :global([contenteditable='true']) {
                user-select: text;
              }
            }
          `}
        </style>
      </div>
    )

    const selectionNode =
      !this.props.readOnly &&
      !!this.state.selectionAt &&
      document.getElementById('style-editor-button')

    return (
      <div className="section">
        <div
          ref={this.props.innerRef}
          id="export-container"
          className="export-container"
          onMouseUp={this.onMouseUp}
        >
          <SpinnerWrapper loading={this.props.loading}>{content}</SpinnerWrapper>
        </div>
        {selectionNode &&
          ReactDOM.createPortal(
            <SelectionEditor onChange={this.onSelectionChange} />,
            // TODO: don't use portal?
            selectionNode
          )}
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
          `}
        </style>
      </div>
    )
  }
}

let modesLoaded = false
function useModeLoader() {
  React.useEffect(() => {
    if (!modesLoaded) {
      LANGUAGES.filter(
        language => language.mode && language.mode !== 'auto' && language.mode !== 'text'
      ).forEach(language => {
        language.custom
          ? require(`../lib/custom/modes/${language.mode}`)
          : require(`codemirror/mode/${language.mode}/${language.mode}`)
      })
      modesLoaded = true
    }
  }, [])
}

let highLightsLoaded = false
function useHighlightLoader() {
  React.useEffect(() => {
    if (!highLightsLoaded) {
      import('../lib/highlight-languages')
        .then(res => res.default.map(config => hljs.registerLanguage(config[0], config[1])))
        .then(() => {
          highLightsLoaded = true
        })
    }
  }, [])
}

function selectedLinesReducer(
  { prevLine, selected },
  { type, lineNumber, numLines, selectedLines }
) {
  const newState = {}

  switch (type) {
    case 'GROUP': {
      if (prevLine) {
        for (let i = Math.min(prevLine, lineNumber); i < Math.max(prevLine, lineNumber) + 1; i++) {
          newState[i] = selected[prevLine]
        }
      }
      break
    }
    case 'MULTILINE': {
      for (let i = 0; i < selectedLines.length; i++) {
        newState[selectedLines[i] - 1] = true
      }
      break
    }
    default: {
      for (let i = 0; i < numLines; i++) {
        if (i != lineNumber) {
          if (prevLine == null) {
            newState[i] = false
          }
        } else {
          newState[lineNumber] = selected[lineNumber] === true ? false : true
        }
      }
    }
  }

  return {
    selected: { ...selected, ...newState },
    prevLine: lineNumber,
  }
}

function useSelectedLines(props, editorRef) {
  const [state, dispatch] = React.useReducer(selectedLinesReducer, {
    prevLine: null,
    selected: {},
  })

  React.useEffect(() => {
    if (editorRef.current && Object.keys(state.selected).length > 0) {
      editorRef.current.editor.display.view.forEach((line, i) => {
        if (line.text) {
          line.text.style.opacity = state.selected[i] === true ? 1 : 0.5
        }
        if (line.gutter) {
          line.gutter.style.opacity = state.selected[i] === true ? 1 : 0.5
        }
      })
    }
  }, [state.selected, props.children, props.config, editorRef])

  React.useEffect(() => {
    if (props.config.selectedLines) {
      dispatch({
        type: 'MULTILINE',
        selectedLines: props.config.selectedLines,
      })
    }
  }, [props.config.selectedLines])

  return React.useCallback(function onGutterClick(editor, lineNumber, gutter, e) {
    const numLines = editor.display.view.length
    const type = e.shiftKey ? 'GROUP' : 'LINE'
    dispatch({ type, lineNumber, numLines })
  }, [])
}

function useShowInvisiblesLoader() {
  React.useEffect(() => void require('cm-show-invisibles'), [])
}

function CarbonContainer(props, ref) {
  useModeLoader()
  useHighlightLoader()
  useShowInvisiblesLoader()
  const editorRef = React.createRef()
  const onGutterClick = useSelectedLines(props, editorRef)

  return <Carbon {...props} innerRef={ref} editorRef={editorRef} onGutterClick={onGutterClick} />
}

export default React.forwardRef(CarbonContainer)
