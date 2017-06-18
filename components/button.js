import React from 'react'

export default (props) => (
  <div className="toolbar-btn" style={Object.assign({
    background: props.bg
  }, props.style)}>
    <span>{props.title}</span>
    <style jsx>{`
      div {
        height: 37px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        color: #000;
        border: 0.5px solid #333;
        border-radius: 3px;
      }
      div:last-of-type {
        border-radius: 0px 3px 3px 0px;
        border-left: 0px;
      }
    `}</style>
  </div>
)
