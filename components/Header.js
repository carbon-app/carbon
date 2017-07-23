import React from 'react'
import Logo from './svg/Logo'

const Header = ({ enableHeroText }) => (
  <div className="header mt3 mb4">
    <div className="header-content">
      <a className="mb3" href="/"><Logo /></a>
      { enableHeroText ? (<h2>The easiest way to create images from source code.<br/> Start typing, or drag a file into the text area to get started.</h2>) : null }
    </div>
    <style jsx>{`
      .header {
        width: 632px;
      }

      .header-content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .header-content a {
        height: 64px;
      }

      h2 {
        text-align: center;
        margin-top: 0;
      }
    `}</style>
  </div>
)

export default Header
