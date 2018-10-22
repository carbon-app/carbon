import React from 'react'
import ListSetting from './ListSetting'
import { EXPORT_SIZES } from '../lib/constants'

const exportSize = size => <span>{size.name}</span>

function ExportSizeSelect(props) {
  return (
    <ListSetting title="Export size" items={EXPORT_SIZES} {...props}>
      {exportSize}
    </ListSetting>
  )
}

export default ExportSizeSelect
