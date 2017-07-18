import React from 'react'
import { Controls, ControlsBW } from './svg/Controls'

export default ({ theme }) => (
  <div className="window-controls">
    { theme === 'bw' ? <ControlsBW /> : <Controls /> }
    <style jsx>{`
      div {
        margin-top: -19px;
        position: relative;
        top: +30px;
        margin-left: 18px;
        z-index: 1;
      }
    `}
    </style>
  </div>
)
