import React from 'react'
import { DEFAULT_SETTINGS } from '../lib/constants'

const { minWidth, maxWidth } = DEFAULT_SETTINGS

const WidthHandler = props => {
  const { leftOrRight, updateSetting, innerRef, config } = props
  const { paddingHorizontal, widthAdjustment } = config

  const onMouseDown = e => {
    const startX = e.pageX
    const width = innerRef.current.clientWidth
    const onMouseMove = e => {
      if (widthAdjustment) {
        updateSetting('widthAdjustment', false)
        updateSetting('width', width)
      }
      const delta = leftOrRight === 'left' ? startX - e.pageX : (startX - e.pageX) * -1
      const calculated = width + delta * 2
      const newWidth =
        calculated < minWidth ? minWidth : calculated > maxWidth ? maxWidth : calculated

      updateSetting('width', newWidth)
    }

    const onMouseUp = () => {
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="handler" onMouseDown={onMouseDown}>
      <style jsx>
        {`
          .handler {
            z-index: 2;
            position: absolute;
            background-color: #57b5f9;
            top: ${paddingHorizontal};
            bottom: ${paddingHorizontal};
            ${leftOrRight === 'left' ? 'left: ' + paddingHorizontal : ''};
            ${leftOrRight === 'right' ? 'right: ' + paddingHorizontal : ''};
            width: 10px;
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
