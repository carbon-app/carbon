import React, { useMemo, useState, useDeferredValue } from 'react'
import ReactDOM from 'react-dom'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { Spinner } from './Spinner'
import WindowControls from './WindowControls'
import hljs from 'highlight.js/lib/core'
import dynamic from 'next/dynamic'
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

const Carbon = (
  props = {
    onChange: noop,
    onGutterClick: noop,
  }
) => {
  const [currentSelection, setCurrentSelection] = useState(null)
  const [selectionAt, setSelectionAt] = useState(null)

  const onBeforeChange = (editor, meta, code) => {
    if (!props.readOnly) {
      props.onChange(code)
    }
  }

  const onSelection = (ed, data) => {
    if (props.readOnly) {
      return
    }

    const selection = data.ranges[0]
    if (
      selection.head.line === selection.anchor.line &&
      selection.head.ch === selection.anchor.ch
    ) {
      return setCurrentSelection(null)
    }
    if (selection.head.line + selection.head.ch > selection.anchor.line + selection.anchor.ch) {
      setCurrentSelection({
        from: selection.anchor,
        to: selection.head,
      })
    } else {
      setCurrentSelection({
        from: selection.head,
        to: selection.anchor,
      })
    }
  }

  const onMouseUp = () => {
    if (currentSelection) {
      setSelectionAt(currentSelection)
    } else {
      setSelectionAt(null)
    }
  }

  const onSelectionChange = changes => {
    if (selectionAt) {
      const css = [
        changes.bold != null && `font-weight: ${changes.bold ? 'bold' : 'initial'}`,
        changes.italics != null && `font-style: ${changes.italics ? 'italic' : 'initial'}`,
        changes.underline != null && `text-decoration: ${getUnderline(changes.underline)}`,
        changes.color != null && `color: ${changes.color} !important`,
      ]
        .filter(Boolean)
        .join('; ')

      if (css) {
        props.editorRef.current.editor.doc.markText(selectionAt.from, selectionAt.to, { css })
      }
    }
  }

  const config = { ...DEFAULT_SETTINGS, ...props.config }


  const defferedNewCode = useDeferredValue(props.children);

  const languageMode = useMemo(() => {
    const language = config.language && config.language.toLowerCase();

    if (language === 'auto') {
      // try to set the language
      const detectedLanguage = hljs.highlightAuto(defferedNewCode).language
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defferedNewCode]);


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
    readOnly: props.readOnly,
    showInvisibles: config.hiddenCharacters,
    autoCloseBrackets: true,
  }
  const backgroundImage =
    (props.config.backgroundImage && props.config.backgroundImageSelection) ||
    props.config.backgroundImage

  const themeConfig = props.theme || THEMES_HASH[config.theme]

  const light = themeConfig && themeConfig.light

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  const selectionNode =
    !props.readOnly && !!selectionAt && document.getElementById('style-editor-button')
  return (
    <div className="section">
      <div
        ref={props.innerRef}
        id="export-container"
        className="export-container"
        onMouseUp={onMouseUp}
      >
        {props.loading ? (
          // TODO investigate removing these hard-coded values
          <div style={{ width: 876, height: 240 }}>
            <Spinner />
          </div>
        ) : (
          <div className="container">
            {config.windowControls ? (
              <WindowControls
                titleBar={props.titleBar}
                onTitleBarChange={props.onTitleBarChange}
                theme={config.windowTheme}
                code={props.children}
                copyable={props.copyable}
                light={light}
              />
            ) : null}
            <CodeMirror
              ref={props.editorRef}
              className={`CodeMirror__container window-theme__${config.windowTheme}`}
              value={props.children}
              options={options}
              onBeforeChange={onBeforeChange}
              onGutterClick={props.onGutterClick}
              onSelection={onSelection}
            />
            {config.watermark && <Watermark light={light} />}
            <div className="container-bg">
              <div className="white eliminateOnRender" />
              <div className="alpha eliminateOnRender" />
              <div className="bg" />
            </div>

            {/* TODO pass in this child as a prop to Carbon */}
            <WidthHandler
              innerRef={props.innerRef}
              onChange={props.updateWidth}
              onChangeComplete={props.updateWidthConfirm}
              paddingHorizontal={config.paddingHorizontal}
              paddingVertical={config.paddingVertical}
            />
          </div>
        )}
      </div>
      {selectionNode &&
        ReactDOM.createPortal(
          <SelectionEditor onChange={onSelectionChange} />,
          // TODO: don't use portal?
          selectionNode
        )}
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
            ${props.config.backgroundMode === 'image'
              ? `background: url(${backgroundImage});
                      background-size: cover;
                      background-repeat: no-repeat;`
              : `background: ${props.config.backgroundColor || config.backgroundColor};
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
            visibility: ${props.readOnly ? 'hidden' : ''};
          }

          @media (max-width: 768px) {
            /* show cursor on mobile */
            .container :global([contenteditable='true']) {
              user-select: text;
            }
            .container {
              max-width: 480px;
            }
          }

          .section,
          .export-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            max-width: 100%;
          }
        `}
      </style>
    </div>
  )
}

let modesLoaded = false
function useModeLoader() {
  React.useEffect(() => {
    if (!modesLoaded) {
      // Load Codemirror add-ons
      require('../lib/custom/autoCloseBrackets')
      // Load Codemirror modes
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
