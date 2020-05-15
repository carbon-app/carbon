import React from 'react'

export const Controls = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
    <g fill="none" fillRule="evenodd" transform="translate(1 1)">
      <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" strokeWidth=".5" />
      <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" strokeWidth=".5" />
      <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" strokeWidth=".5" />
    </g>
  </svg>
)

export const ControlsBW = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
    <g fill="none" fillRule="evenodd" stroke="#878787" transform="translate(1 1)">
      <circle cx="6" cy="6" r="6" />
      <circle cx="26" cy="6" r="6" />
      <circle cx="46" cy="6" r="6" />
    </g>
  </svg>
)

export const ControlsBoxy = () => (
  <svg
    width="58"
    height="14"
    viewBox="0 0 58 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ margin: '0 8px 0 auto' }}
  >
    <path d="M1 7H11" stroke="#878787" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M34 1H24C23.4477 1 23 1.44772 23 2V12C23 12.5523 23.4477 13 24 13H34C34.5523 13 35 12.5523 35 12V2C35 1.44772 34.5523 1 34 1Z"
      stroke="#878787"
    />
    <path d="M47 2L57 12" stroke="#878787" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M47 12L57 2" stroke="#878787" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
