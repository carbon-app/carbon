import React from 'react'
import Logo from './svg/Logo'

const Header = (props) => (
  <div className="header">
    <div className="header-content">
      <a href="/"><Logo /></a>
      <h2>The easiest way to create images from source code. Start typing, or drag a file into the text area to get started.</h2>
    </div>
    <style jsx>{`
      .header {
        margin: 36px 0 72px;
        width: 632px;
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-content a {
        height: 128px;
      }

      h2 {
        margin-top: 0;
        max-width: 456px;
      }
    `}</style>
  </div>
)

export default Header
