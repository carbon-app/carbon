import React from 'react'
import { DEFAULT_SETTINGS, COLORS } from '../lib/constants'

const { minWidth, maxWidth } = DEFAULT_SETTINGS

const WidthHandler = props => {
  const { updateSetting, innerRef, config } = props
  const { paddingHorizontal, widthAdjustment } = config

  const startX = React.useRef(null)
  const width = React.useRef(null)

  React.useEffect(() => {
    function handleMouseMove(e) {
      if (!startX.current) return

      if (widthAdjustment) {
        updateSetting('widthAdjustment', false)
        updateSetting('width', width)
      }

      const delta = e.pageX - startX.current // leftOrRight === 'left' ? startX - e.pageX : (startX - e.pageX) * -1
      const calculated = width.current + delta * window.devicePixelRatio
      const newWidth =
        calculated < minWidth ? minWidth : calculated > maxWidth ? maxWidth : calculated

      updateSetting('width', newWidth)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [innerRef, updateSetting, widthAdjustment])

  return (
    // eslint-disable-next-line
    <div
      className="handler"
      onMouseDown={e => {
        startX.current = e.pageX
        width.current = innerRef.current.clientWidth
      }}
      onMouseUp={() => {
        startX.current = null
      }}
      role="separator"
      aria-orientation="vertical"
      aria-valuemin={minWidth}
      aria-valuemax={maxWidth}
      aria-valuenow={width}
    >
      <style jsx>
        {`
          .handler {
            z-index: 2;
            position: absolute;
            background-color: ${COLORS.BLUE};
            top: ${paddingHorizontal};
            bottom: ${paddingHorizontal};
            right: ${paddingHorizontal};
            width: 8px;
            cursor: ew-resize;
            opacity: 0;
          }
          .handler:hover {
            opacity: 0.4;
          }
        `}
      </style>
    </div>
  )
}

export default WidthHandler
