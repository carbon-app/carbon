import React from 'react'
import { Controls, ControlsBW } from './svg/Controls'

export default ({ language }) => (
  <div className="language">
    {language.name}
    <style jsx>
      {`
        .language {
          position: absolute;
          top: 7px;
          right: 7px;
          background: rgba(0, 0, 0, 0.3);
          font-size: 12px;
          padding: 5px;
          border-radius: 3px;
          z-index: 1;
        }
      `}
    </style>
  </div>
)
