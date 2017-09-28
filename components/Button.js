import React from 'react'
import { COLORS } from '../lib/constants'

export default props => (
  <button
    onClick={props.onClick}
    style={Object.assign(
      {
        background: COLORS.BLACK,
        color: props.color,
        border: `0.5px solid ${props.color}`
      },
      props.style
    )}
  >
    <span>{props.title}</span>
    <style jsx>{`
      button {
        cursor: pointer;
        outline: none;
        height: 100%;
        padding: 0 16px;
        border-radius: 3px;
        user-select: none;
      }

      button > span {
        font-size: 14px;
        line-height: 1;
      }
    `}</style>
  </button>
)
