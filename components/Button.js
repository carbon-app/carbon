import React from 'react'

import { COLORS } from '../lib/constants'

const Button = ({
  id,
  onClick = () => {},
  className = '',
  background = COLORS.BLACK,
  color = COLORS.SECONDARY,
  hoverBackground = COLORS.HOVER,
  hoverColor,
  disabled,
  selected,
  children,
  border,
  center,
  large,
  style = {},
  flex = 1,
  padding = 0,
  margin = 0
}) => (
  <button id={id} onClick={onClick} className={className} disabled={disabled} style={style}>
    {children}
    <style jsx>
      {`
        button {
          display: flex;
          flex: ${flex};
          background-color: ${background};
          color: ${color};
          box-shadow: ${border ? `inset 0px 0px 0px ${selected ? 2 : 1}px ${color}` : 'initial'};
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          outline: none;
          border: none;
          padding: ${padding};
          margin: ${margin};
          border-radius: ${border ? '3px' : 0};
          user-select: none;
          justify-content: ${center ? 'center' : 'initial'};
          align-items: ${center ? 'center' : 'initial'};
          align-self: stretch;
          font-size: ${large ? '14px' : '12px'};
        }

        button:hover {
          background-color: ${hoverBackground} !important;
          color: ${hoverColor || color};
        }
      `}
    </style>
  </button>
)

export default Button
