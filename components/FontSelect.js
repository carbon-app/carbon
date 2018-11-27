import React from 'react'
import ListSetting from './ListSetting'
import { FONTS } from '../lib/constants'

const Font = font => <span style={{ fontFamily: font.id }}>{font.name}</span>

function FontSelect(props) {
  return (
    <ListSetting title="Font" items={FONTS} {...props}>
      {Font}
    </ListSetting>
  )
}

export default FontSelect
