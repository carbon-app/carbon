import React from 'react'
import { Controls, ControlsBW } from './svg/Controls'

export default ({ titleBar, theme, handleTitleBarChange }) => (
  <div className="window-controls">
    {theme === 'bw' ? <ControlsBW /> : <Controls />}
    <div className="window-title-container">
      <input
        value={titleBar}
        type="text"
        spellCheck="false"
        onChange={e => handleTitleBarChange(e.target.value)}
      />
    </div>
    <style jsx>
      {`
        div {
          margin-top: -24px;
          position: relative;
          top: 34px;
          margin-left: 18px;
          z-index: 2;
        }

        .window-title-container {
          position: absolute;
          margin: 0px;
          top: -3px;
          left: -9px;
          width: 100%;
          text-align: center;
        }

        input {
          width: 250px;
          background: none;
          outline: none;
          border: none;
          color: white;
          text-align: center;
          font-size: 14px;
        }
      `}
    </style>
  </div>
)
