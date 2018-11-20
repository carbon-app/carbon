import React from 'react'

export default ({ fromLeft, fromRight, color = '#fff' }) => (
  <div>
    <div className="window-pointer" />
    <style jsx>
      {`
        .window-pointer {
          width: 0px;
          height: 0px;
          border-style: solid;
          border-width: 0 5px 10px 5px;
          border-color: transparent transparent ${color} transparent;
          position: absolute;
          top: -10px;
          left: ${fromLeft || 'initial'};
          right: ${fromRight || 'initial'};
        }
      `}
    </style>
  </div>
)
