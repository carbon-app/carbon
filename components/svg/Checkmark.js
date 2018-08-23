import React from 'react'

export default ({ width = 9, height = 8, color = '#FFFFFF' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 9 7">
    <polygon
      fill={color}
      fillRule="evenodd"
      points="2.852 5.016 8.275 0 9 .67 2.852 6.344 0 3.711 .713 3.042"
    />
  </svg>
)
