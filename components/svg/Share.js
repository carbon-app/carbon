import React from 'react'

const SVG_RATIO = 0.81

const Share = ({ size, color }) => {
  const width = size * SVG_RATIO
  const height = size

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M421.3,0C377.8,0,342,35.8,342,79.2c0,4.3,0.9,9.4,1.7,13.6L147.8,202.8
                c-14.5-15.3-34.9-25.6-57.9-25.6c-43.4,0-79.2,34.9-79.2,79.2c0,43.4,34.9,79.2,79.2,79.2c23,0,44.3-10.2,58.8-26.4l194.2,114.2
                c0,3.4-0.9,6-0.9,9.4c0,43.4,34.9,79.2,79.2,79.2c43.4,0,79.2-34.9,79.2-79.2c0-43.4-34.9-79.2-79.2-79.2
                c-23.9,0-46,11.1-60.5,28.1L167.4,267.5c0.9-3.4,0.9-7.7,0.9-11.1c0-4.3,0-8.5-0.9-12.8l196.8-110.7c14.5,15.3,34.9,25.6,57.9,25.6
                c43.4,0,79.2-34.9,79.2-79.2C500.5,35.8,464.7,0,421.3,0L421.3,0z"
        fill={color}
      />
    </svg>
  )
}

Share.defaultProps = {
  size: 16,
}

export default Share
