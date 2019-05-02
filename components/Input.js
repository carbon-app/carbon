import React from 'react'

import { COLORS } from '../lib/constants'

const Input = React.forwardRef(({ color = COLORS.SECONDARY, align = 'right', ...props }, ref) => (
  <React.Fragment>
    <input ref={ref} {...props} />
    <style jsx>
      {`
        input {
          width: 100%;
          font-size: 12px;
          color: ${color};
          background: transparent;
          border: none;
          outline: none;
          text-align: ${align};
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        input::placeholder {
          color: ${color};
          opacity: 0.4;
        }

        input[type='file'] {
          cursor: pointer;
        }

        input[type='file']:focus {
          outline: initial;
        }
      `}
    </style>
  </React.Fragment>
))

export default Input
