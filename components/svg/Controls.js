import React from 'react'

export default () => (
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" strokeWidth=".5"/>
        <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" strokeWidth=".5"/>
        <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" strokeWidth=".5"/>
      </g>
    </svg>
    <style jsx>{`
      div {
        position: absolute;
        margin-left: 18px;
        margin-top: 12px;
        z-index: 1;
      }
    `}
    </style>
  </div>
)
