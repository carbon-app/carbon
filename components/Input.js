import React from 'react'

import { COLORS } from '../lib/constants'

const Input = React.forwardRef(
  (
    {
      accept,
      color = COLORS.SECONDARY,
      name,
      onChange = () => {},
      placeholder,
      title,
      type,
      value,
      align = 'right',
      maxLength
    },
    ref
  ) => {
    return (
      <React.Fragment>
        <input
          ref={ref}
          type={type}
          accept={accept}
          title={title}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          maxLength={maxLength}
        />
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
              outline: none;
            }
          `}
        </style>
      </React.Fragment>
    )
  }
)

export default Input
