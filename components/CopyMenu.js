import React from 'react'
import { withRouter } from 'next/router'
import { useCopyTextHandler, useAsyncCallback } from 'actionsack'
import morph from 'morphmorph'

import { COLORS } from '../lib/constants'
import Button from './Button'
import Popout, { managePopout } from './Popout'
import CopySVG from './svg/Copy'

const toIFrame = url =>
  `<iframe
  src="${location.origin}/embed${url.replace(/^\/\?/, '?')}"
  style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>
`

const toURL = url => `${location.origin}${url}`
const toEncodedURL = morph.compose(encodeURI, toURL)

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

const CopyEmbed = withRouter(({ router: { asPath }, mapper, title }) => {
  const text = React.useMemo(() => mapper(asPath), [mapper, asPath])
  const { onClick, copied } = useCopyTextHandler(text)

  return <CopyButton onClick={onClick}>{copied ? 'Copied!' : title}</CopyButton>
})

const popoutStyle = { width: '140px', right: 0 }

function useClipboardSupport() {
  const [isClipboardSupports, setClipboardSupport] = React.useState(false)

  React.useEffect(() => {
    setClipboardSupport(
      window.navigator && window.navigator.clipboard && typeof ClipboardItem === 'function'
    )
  }, [])

  return isClipboardSupports
}

function CopyMenu({ isVisible, toggleVisibility, copyImage }) {
  const clipboardSupported = useClipboardSupport()

  const [copy, { loading }] = useAsyncCallback(copyImage)

  return (
    <div className="export-menu-container" id="export-menu">
      <div className="flex">
        <Button
          center
          border
          large
          padding="0 16px"
          margin="0 8px 0 0"
          onClick={toggleVisibility}
          color={COLORS.SECONDARY}
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
        <div className="export-row flex">
          <span>Copy to clipboard</span>
          {clipboardSupported && (
            <CopyButton id="export-clipboard" onClick={copy} disabled={loading}>
              {loading ? 'Copying…' : 'Image'}
            </CopyButton>
          )}
          <CopyEmbed title="Medium.com" mapper={toEncodedURL} />
          <CopyEmbed title="IFrame" mapper={toIFrame} />
          <CopyEmbed title="Plain URL" mapper={toURL} />
        </div>
      </Popout>
      <style jsx>
        {`
          .export-menu-container {
            position: relative;
            color: ${COLORS.SECONDARY};
            flex: 1;
          }

          .export-row {
            flex-direction: column;
            justify-content: space-between;
            border-bottom: 1px solid ${COLORS.SECONDARY};
          }

          .export-row :global(button) {
            border-top: 1px solid ${COLORS.SECONDARY};
          }

          .export-row > span {
            padding: 8px;
            margin: 0 auto;
          }
        `}
      </style>
    </div>
  )
}

export default managePopout(React.memo(CopyMenu))
