import React from 'react'
import { COLORS } from '../lib/constants'

export default props => (
  <button
    onClick={props.onClick}
    style={{
      ...props.style,
      background: COLORS.BLACK,
      color: props.color,
      boxShadow: `inset 0px 0px 0px ${props.selected ? 2 : 1}px ${props.color}`,
      border: 'none'
    }}
    disabled={props.disabled}
  >
    <span>{props.title}</span>
    <style jsx>
      {`
        button {
          cursor: pointer;
          outline: none;
          height: 100%;
          padding: 0 16px;
          border-radius: 3px;
          user-select: none;
        }

        button:hover {
          background: ${COLORS.HOVER} !important;
        }

        button > span {
          font-size: 14px;
          line-height: 1;
        }
      `}
    </style>
  </button>
)
