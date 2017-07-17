import React from 'react'
import { PALETTE } from '../lib/constants'

export default (props) => (
  <div onClick={props.onClick} className="toolbar-btn" style={Object.assign({
    background: PALETTE.EDITOR_BG,
    color: props.color,
    border: `0.5px solid ${props.color}`
  }, props.style)}>
    <span>{props.title}</span>
    <style jsx>{`
      div {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        border-radius: 3px;
        user-select: none;
      }
    `}</style>
  </div>
)
