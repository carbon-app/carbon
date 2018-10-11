import React from 'react'

const Overlay = props => (
  <div className="dnd-container">
    {props.isOver ? <div className="dnd-overlay">{props.title}</div> : null}
    {props.children}
    <style jsx>
      {`
        .dnd-container {
          position: relative;
        }

        .dnd-overlay {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          height: 100%;
          z-index: 999;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.85);
        }
      `}
    </style>
  </div>
)

export default Overlay
