import React from 'react'
import Logo from './svg/Logo'

const Header = ({ enableHeroText }) => (
  <header role="banner" className="header mb4">
    <div className="header-content">
      <a id="link-home" href="/" aria-label="Home">
        <Logo />
      </a>
      {enableHeroText ? (
        <h2 className="mt3">
          Create and share beautiful images of your source code.<br /> Start typing or drop a file
          into the text area to get started.
        </h2>
      ) : null}
    </div>
    <style jsx>{`
      .header {
        width: 656px;
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
      }
    `}</style>
  </header>
)

export default Header
