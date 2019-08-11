import React from 'react'

export default function FontFace(config) {
  return (
    <style jsx global>
      {`
        @font-face {
          font-family: ${config.fontUrl ? config.fontFamily : ''};
          src: url(${config.fontUrl || ''}) format('woff');
          font-display: swap;
        }
      `}
    </style>
  )
}
