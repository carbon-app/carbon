import React from 'react'

export default function WindowPointer({ fromLeft, fromRight, color = '#fff' }) {
  return (
    <div>
      <div className="window-pointer" />
      <style jsx>
        {`
          .window-pointer {
            width: 0px;
            height: 0px;
            border-style: solid;
            border-width: 0 5px 6px 5px;
            border-color: transparent transparent ${color} transparent;
            position: absolute;
            top: -8px;
            left: ${fromLeft || 'initial'};
            right: ${fromRight || 'initial'};
          }
        `}
      </style>
    </div>
  )
}
