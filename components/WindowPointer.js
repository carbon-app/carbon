import React from 'react'

export default ({ fromLeft }) => (
  <div style={{ left: fromLeft }}>
    <div className="window-pointer" />
    <style jsx>{`
      .window-pointer {
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 0 4px 5px 4px;
        border-color: transparent transparent #fff transparent;
        position: absolute;
        top: -5px;
        left: 15px;
      }
    `}</style>
  </div>
)
