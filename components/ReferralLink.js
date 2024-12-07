import React from 'react'

import { COLORS } from '../lib/constants'

export default function ReferralLink(props) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {props.children}
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
            font-size: 10px;
          }
        `}
      </style>
    </a>
  )
}
