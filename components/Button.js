import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'

import { COLORS } from '../lib/constants'

const Button = ({
  id,
  onClick = () => {},
  background = COLORS.BLACK,
  color = COLORS.SECONDARY,
  textColor,
  hoverBackground = COLORS.HOVER,
  hoverColor,
  disabled,
  selected,
  children,
  border,
  center,
  large,
  flex = 1,
  padding = 0,
  margin = 0,
  title,
  Component = 'button',
  display,
  ...props
}) => (
  <Component id={id} onClick={onClick} disabled={disabled} {...props}>
    {title && <VisuallyHidden>{title}</VisuallyHidden>}
    {children}
    <style jsx>
      {`
        ${Component} {
          display: ${display || 'flex'};
          flex: ${flex};
          background-color: ${background};
          color: ${textColor || color};
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

        ${Component}:hover, ${Component}:focus {
          background-color: ${hoverBackground} !important;
          color: ${hoverColor || color};
        }

        ${Component}:focus {
          box-shadow: ${border ? `inset 0px 0px 0px 2px ${color}` : 'initial'};
        }
      `}
    </style>
  </Component>
)

export default Button
