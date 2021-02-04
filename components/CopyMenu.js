import React from 'react'
import { useRouter } from 'next/router'
import { useCopyTextHandler, useAsyncCallback, useKeyboardListener } from 'actionsack'
import morph from 'morphmorph'

import { COLORS } from '../lib/constants'
import Button from './Button'
import Popout, { managePopout } from './Popout'
import CopySVG from './svg/Copy'

const toIFrame = (url, width, height) =>
  `<iframe
  src="${location.origin}/embed${url.replace(/^\/\?/, '?')}"
  style="width: ${width || 1024}px; height: ${
    height || 473
  }px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>
`

const toURL = url => `${location.origin}${url}`
// Medium does not handle asterisks correctly - https://github.com/carbon-app/carbon/issues/1067
const replaceAsterisks = string => string.replace(/\*/g, '%2A')
const toEncodedURL = morph.compose(encodeURI, replaceAsterisks, toURL)

function getTokenColors(config) {
  const colors = {}
  for (let token of document.querySelectorAll(`[class^=cm-]`)) {
    let className = token.className
    if (!colors[className]) {
      colors[className] = getComputedStyle(token).color
    }
  }
  if (config.lineNumbers) {
    let cmLineNumber = document.querySelector(`.CodeMirror-linenumber`)
    colors['cm-linenumber'] = getComputedStyle(cmLineNumber).color
  }
  return colors
}

function setLineCodeDiv(outerDiv, colors) {
  for (let cmLine of document.querySelectorAll(`.CodeMirror-line`)) {
    let lineCodeDiv = document.createElement('div')
    let span = cmLine.firstChild
    lineCodeDiv.innerHTML = span.innerHTML.replace(
      /class="(cm-.+?)"( style="(.+?)")?/gm,
      function (match, p1, p2, p3) {
        return `style="color: ${colors[p1]};` + (p3 ? ` ${p3}` : '') + `"`
      }
    )
    outerDiv.append(lineCodeDiv)
  }
}

function addLineNumberSpan(outerDiv, colors, config) {
  const maxLineNumber = parseInt(config.firstLineNumber) + outerDiv.childNodes.length
  const maxLength = String(maxLineNumber).length
  outerDiv.childNodes.forEach((innerDiv, index) => {
    let lineNumberSpan = document.createElement('span')
    let lineNumberString = String(parseInt(config.firstLineNumber) + index)
    lineNumberSpan.innerText =
      `\u00a0`.repeat(maxLength - lineNumberString.length) + lineNumberString + `\u00a0`
    lineNumberSpan.style.color = colors['cm-linenumber']
    innerDiv.prepend(lineNumberSpan)
  })
}

function replaceSpace(outerDiv) {
  outerDiv.innerHTML = outerDiv.innerHTML.replace(/ ( +|&nbsp;)/gm, function (match) {
    return match.includes('&nbsp;') ? '&nbsp;&nbsp;' : '&nbsp;'.repeat(match.length)
  })
}

function setDivHTML(outerDiv, config, colors) {
  setLineCodeDiv(outerDiv, colors)
  if (config.lineNumbers) {
    addLineNumberSpan(outerDiv, colors, config)
  }
  replaceSpace(outerDiv)
}

function setDivStyle(outerDiv, config, highlights) {
  outerDiv.style.color = highlights.text
  outerDiv.style.backgroundColor = highlights.background
  outerDiv.style.fontFamily = `${config.fontFamily}, Consolas, 'Courier New', monospace`
  outerDiv.style.fontSize = config.fontSize
  outerDiv.style.lineHeight = (parseFloat(config.lineHeight) / 100) * parseFloat(config.fontSize)
  outerDiv.style.whiteSpace = 'pre'
}

const toHTML = (config, highlights) => {
  const outerDiv = document.createElement('div')
  const colors = getTokenColors(config)
  setDivHTML(outerDiv, config, colors)
  setDivStyle(outerDiv, config, highlights)
  return outerDiv.outerHTML
}

function CopyButton(props) {
  return (
    <Button
      {...props}
      hoverColor={COLORS.SECONDARY}
      color="rgba(255, 255, 255, 0.7)"
      padding="8px"
    />
  )
}

function CopyEmbed({ mapper, title }) {
  const { asPath } = useRouter()
  const text = React.useMemo(() => mapper(asPath), [mapper, asPath])
  const options = title === 'HTML' ? { format: 'text/html' } : {}
  const { onClick, copied } = useCopyTextHandler(text, { options: options })

  return <CopyButton onClick={onClick}>{copied ? 'Copied!' : title}</CopyButton>
}

const popoutStyle = { width: '140px', right: 0 }

function useClipboardSupport() {
  const [isClipboardSupported, setClipboardSupport] = React.useState(false)

  React.useEffect(() => {
    setClipboardSupport(
      window.navigator && window.navigator.clipboard && typeof ClipboardItem === 'function'
    )
  }, [])

  return isClipboardSupported
}

function CopyMenu({ isVisible, toggleVisibility, copyImage, carbonRef, config, highlights }) {
  const clipboardSupported = useClipboardSupport()

  const [showCopied, { loading: copied }] = useAsyncCallback(
    () => new Promise(res => setTimeout(res, 1000))
  )

  const [copy, { loading }] = useAsyncCallback(async (...args) => {
    if (clipboardSupported) {
      await copyImage(...args)
      showCopied()
    }
  })

  useKeyboardListener('⌘-⇧-c', e => {
    e.preventDefault()
    copy(e)
  })

  return (
    <div className="copy-menu-container">
      <div className="flex">
        <Button
          center
          border
          large
          padding="0 16px"
          margin="0 8px 0 0"
          onClick={toggleVisibility}
          color={COLORS.SECONDARY}
          title="Copy menu"
        >
          <CopySVG size={16} color={COLORS.SECONDARY} />
        </Button>
      </div>
      <Popout
        hidden={!isVisible}
        borderColor={COLORS.SECONDARY}
        pointerRight="24px"
        style={popoutStyle}
      >
        <div className="copy-row flex">
          <span>Copy to clipboard</span>
          {clipboardSupported && (
            <CopyButton id="export-clipboard" onClick={copy} disabled={loading}>
              {loading ? 'Copying…' : copied ? 'Copied!' : 'Image'}
            </CopyButton>
          )}
          <CopyEmbed title="Medium.com" mapper={toEncodedURL} />
          <CopyEmbed
            title="IFrame"
            mapper={url => toIFrame(url, carbonRef.clientWidth, carbonRef.clientHeight)}
          />
          <CopyEmbed title="Plain URL" mapper={toURL} />
          <CopyEmbed title="HTML" mapper={() => toHTML(config, highlights)} />
        </div>
      </Popout>
      <style jsx>
        {`
          .copy-menu-container {
            position: relative;
            color: ${COLORS.SECONDARY};
            flex: 1;
          }

          .copy-row {
            flex-direction: column;
            justify-content: space-between;
            border-bottom: 1px solid ${COLORS.SECONDARY};
          }

          .copy-row :global(button) {
            border-top: 1px solid ${COLORS.SECONDARY};
          }

          .copy-row > span {
            padding: 8px;
            margin: 0 auto;
          }
        `}
      </style>
    </div>
  )
}

export default managePopout(React.memo(CopyMenu))
