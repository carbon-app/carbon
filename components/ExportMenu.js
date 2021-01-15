import React from 'react'
import { useOnline, useKeyboardListener, useAsyncCallback } from 'actionsack'

import { COLORS, EXPORT_SIZES } from '../lib/constants'
import Button from './Button'
import Input from './Input'
import Popout, { managePopout } from './Popout'

import { Down as ArrowDown } from './svg/Arrows'

const MAX_PAYLOAD_SIZE = 5e6 // bytes
function verifyPayloadSize(str) {
  if (typeof str !== 'string') return true

  if (typeof window !== 'undefined') {
    return new Blob([str]).size < MAX_PAYLOAD_SIZE
  }

  return Buffer.byteLength(str, 'utf8')
}

const popoutStyle = { width: '256px', right: 0 }

function useSafari() {
  const [isSafari, setSafari] = React.useState(false)
  React.useEffect(() => {
    setSafari(
      window.navigator &&
        window.navigator.userAgent.indexOf('Safari') !== -1 &&
        window.navigator.userAgent.indexOf('Chrome') === -1
    )
  }, [])

  return isSafari
}

function preventDefault(fn) {
  return e => {
    e.preventDefault()
    return fn(e)
  }
}

function ExportMenu({
  backgroundImage,
  onChange,
  exportSize,
  isVisible,
  toggleVisibility,
  exportImage: exp,
}) {
  const tooLarge = React.useMemo(() => !verifyPayloadSize(backgroundImage), [backgroundImage])
  const online = useOnline()
  const isSafari = useSafari()
  const input = React.useRef()

  const [exportImage, { loading }] = useAsyncCallback(exp)

  const disablePNG = isSafari && (tooLarge || !online)

  const handleExportSizeChange = selectedSize => () => onChange('exportSize', selectedSize)

  const handleExport = format => () =>
    exportImage(format, {
      filename: input.current && input.current.value,
    })

  useKeyboardListener('⌘-⇧-e', preventDefault(handleExport('png')))
  useKeyboardListener('⌘-⇧-s', preventDefault(handleExport('svg')))

  return (
    <div className="export-menu-container">
      <div className="flex">
        <Button
          border
          large
          center
          color={COLORS.PURPLE}
          onClick={handleExport('png')}
          data-cy="quick-export-button"
          style={{ minWidth: 92, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
          title="Quick export"
        >
          {loading ? 'Exporting…' : 'Export'}
        </Button>
        <Button
          id="export-menu"
          border
          large
          center
          color={COLORS.PURPLE}
          padding="0 8px"
          onClick={toggleVisibility}
          data-cy="export-button"
          margin="0 0 0 -1px"
          style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
          title="Export menu dropdown"
        >
          <ArrowDown color={COLORS.PURPLE} />
        </Button>
      </div>
      <Popout
        hidden={!isVisible}
        borderColor={COLORS.PURPLE}
        pointerRight="6px"
        style={popoutStyle}
      >
        <div className="export-row">
          <span className="filename">File name</span>
          <Input ref={input} title="filename" placeholder="carbon" color={COLORS.PURPLE} />
        </div>
        <div className="export-row">
          <span>Size</span>
          <div className="flex">
            {EXPORT_SIZES.map(({ name }, i) => (
              <Button
                center
                key={name}
                hoverColor={COLORS.PURPLE}
                margin={i === EXPORT_SIZES.length - 1 ? 0 : '0 10px 0 0'}
                color={exportSize === name ? COLORS.PURPLE : COLORS.DARK_PURPLE}
                onClick={handleExportSizeChange(name)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
        <div className="export-row">
          <Button center color={COLORS.PURPLE} onClick={handleExport('open')}>
            Open
          </Button>
          <div className="save-container">
            <span>Download</span>
            <div>
              {!disablePNG && (
                <Button
                  center
                  margin="0 8px 0 0"
                  hoverColor={COLORS.PURPLE}
                  color={COLORS.DARK_PURPLE}
                  onClick={handleExport('png')}
                  id="export-png"
                  disabled={loading}
                >
                  PNG
                </Button>
              )}
              <Button
                center
                hoverColor={COLORS.PURPLE}
                color={COLORS.DARK_PURPLE}
                onClick={handleExport('svg')}
                id="export-svg"
                disabled={loading}
              >
                SVG
              </Button>
            </div>
          </div>
        </div>
      </Popout>
      <style jsx>
        {`
          .export-menu-container {
            position: relative;
            color: ${COLORS.PURPLE};
            flex: 1;
          }

          .export-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px;
            border-bottom: 1px solid ${COLORS.PURPLE};
          }
          .export-row > :global(button) {
            border-right: 1px solid ${COLORS.PURPLE};
          }
          .export-row:last-child {
            border-bottom: none;
            padding: 0;
          }

          .filename {
            flex-basis: 72px;
          }

          .save-container {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 12px 16px;
          }
          .save-container > div {
            margin-top: 6px;
            display: flex;
            flex: 1;
          }
          .save-container:first-of-type {
            padding: 12px 12px;
            border-right: 1px solid ${COLORS.PURPLE};
          }
        `}
      </style>
    </div>
  )
}

export default managePopout(React.memo(ExportMenu))
