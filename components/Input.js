import React from 'react'

import { COLORS } from '../lib/constants'

const Input = React.forwardRef(
  (
    {
      color = COLORS.SECONDARY,
      align = 'right',
      width = '100%',
      fontSize = '12px',
      label,
      ...props
    },
    ref
  ) => (
    <React.Fragment>
      {label && <label>{label}</label>}
      <input ref={ref} {...props} />
      <style jsx>
        {`
          input {
            width: ${width};
            font-size: ${fontSize};
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

          input[type='number']::-webkit-inner-spin-button,
          input[type='number']::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `}
      </style>
    </React.Fragment>
  )
)

export default Input
