import React from 'react'
import ListSetting from './ListSetting'
import { COLORS, FONTS } from '../lib/constants'

const Font = (font, selected) => (
  <React.Fragment>
    <span style={{ fontFamily: font.id }}>{font.name}</span>
    {font.link && selected === font.id && (
      <a href={font.link} target="_blank" rel="noopener noreferrer">
        <span style={{ fontFamily: font.id }}>Purchase</span>
      </a>
    )}
    <style jsx>
      {`
        /* Prod Only */
        a {
          display: block;
          color: ${COLORS.BLACK};
          background: ${COLORS.PRIMARY};
          border-radius: 2px;
          padding: 2px 3px;
          font-weight: bold;
        }
      `}
    </style>
  </React.Fragment>
)

function FontSelect(props) {
  return (
    <ListSetting title="Font" items={FONTS} {...props}>
      {Font}
    </ListSetting>
  )
}

export default FontSelect
