import React from 'react'
import Settings from './svg/settings'

export default () => (
  <div className="settings-container">
    <Settings />
    <style jsx>{`
      .settings-container {
        height: 37px;
        width: 37px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
        border: 0.5px solid #333;
        border-radius: 3px;
      }
    `}</style>
  </div>
)
