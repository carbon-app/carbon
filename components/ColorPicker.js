import React from 'react'
import { SketchPicker } from 'react-color'

import { COLORS } from '../lib/constants'

const pickerStyle = {
  backgroundColor: COLORS.BLACK,
  padding: '8px 8px 0',
  margin: '0 auto 1px'
}

const ColorPicker = ({ onChange = () => {}, color, presets, style }) => (
  <React.Fragment>
    <SketchPicker
      styles={{ picker: style || pickerStyle }}
      color={color}
      onChangeComplete={onChange}
      presetColors={presets}
    />
    <style jsx>
      {`
        /* react-color overrides */
        :global(.sketch-picker > div:nth-child(3) > div > div > span) {
          color: ${COLORS.SECONDARY} !important;
        }

        :global(.sketch-picker > div:nth-child(3) > div > div > input) {
          width: 100% !important;
          box-shadow: none;
          outline: none;
          border-radius: 2px;
          background: ${COLORS.DARK_GRAY};
          color: #fff !important;
        }

        /* prettier-ignore */
        :global(.sketch-picker > div:nth-child(2) > div:nth-child(1) > div:nth-child(2), .sketch-picker > div:nth-child(2) > div:nth-child(2)) {
          background: #fff;
        }
      `}
    </style>
  </React.Fragment>
)

export default ColorPicker
