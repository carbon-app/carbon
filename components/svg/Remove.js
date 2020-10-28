import React from 'react'

export default function Remove({ color = 'black', style }) {
  return (
    <svg
      width="5"
      height="5"
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M2.5 3.08725L4.41704 5L5 4.41834L3.08857 2.5L5 0.581656L4.41704 0L2.5 1.91275L0.58296 0L0 0.581656L1.91144 2.5L0 4.41834L0.58296 5L2.5 3.08725Z"
        fill={color}
      />
    </svg>
  )
}
