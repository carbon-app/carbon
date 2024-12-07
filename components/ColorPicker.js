import React from 'react'
import SketchPicker from 'react-color/lib/Sketch'

import { COLORS } from '../lib/constants'
import { stringifyColor } from '../lib/util'

const pickerStyle = {
  backgroundColor: COLORS.BLACK,
  padding: '8px 8px 0',
  margin: '0 auto 1px',
}

export default function ColorPicker(props) {
  const [color, setColor] = React.useState(props.color)
  const { onChange = () => {}, presets, style, disableAlpha } = props

  return (
    <React.Fragment>
      <SketchPicker
        styles={{ picker: style || pickerStyle }}
        onChange={setColor}
        color={typeof color === 'string' ? color : stringifyColor(color)}
        onChangeComplete={onChange}
        presetColors={presets}
        disableAlpha={disableAlpha}
      />
      <style jsx>
        {`
          /* react-color overrides */
          :global(.sketch-picker > div:nth-child(3) > div > div > input) {
            width: 100% !important;
            box-shadow: none;
            outline: none;
            border-radius: 2px;
            background: ${COLORS.DARK_GRAY};
            color: #fff !important;
          }

          :global(.sketch-picker
              > div:nth-child(2)
              > div:nth-child(1)
              > div:nth-child(2), .sketch-picker > div:nth-child(2) > div:nth-child(2)) {
            background: #fff;
          }

          :global(.sketch-picker label) {
            color: ${COLORS.SECONDARY} !important;
          }
        `}
      </style>
    </React.Fragment>
  )
}
