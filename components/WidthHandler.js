import React from 'react'
import { DEFAULT_WIDTHS, COLORS } from '../lib/constants'

const { minWidth, maxWidth } = DEFAULT_WIDTHS

function clamp(value, min, max) {
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}

export default function WidthHandler(props) {
  const { onChange, innerRef, paddingHorizontal } = props

  const startX = React.useRef(null)
  const startWidth = React.useRef(null)

  React.useEffect(() => {
    function handleMouseMove(e) {
      if (!startX.current) return

      const delta = e.pageX - startX.current // leftOrRight === 'left' ? startX - e.pageX : (startX - e.pageX) * -1
      const calculated = startWidth.current + delta * window.devicePixelRatio
      const newWidth = clamp(calculated, minWidth, maxWidth)

      onChange(newWidth)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [innerRef, onChange])

  React.useEffect(() => {
    function handleMouseUp() {
      startX.current = null
    }
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    // eslint-disable-next-line
    <div
      className="handler"
      onMouseDown={e => {
        startX.current = e.pageX
        startWidth.current = innerRef.current.clientWidth
      }}
      role="separator"
      aria-orientation="vertical"
      aria-valuemin={minWidth}
      aria-valuemax={maxWidth}
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
