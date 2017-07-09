import React from 'react'
import Logo from './svg/Logo'

const Header = (props) => (
  <div className="header">
    <div className="header-content">
      <Logo />
      <h1>The easiest way to create images from source code. Start typing, or drag a file into the text area to get started.</h1>
    </div>
    <style jsx>{`
      .header {
        margin: 40px 0 48px;
        width: 648px;
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      h1 {
        max-width: 472px;
        font-size: 20px;
        line-height: 1.5;
        color: #fff;
      }
    `}</style>
  </div>
)

export default Header
