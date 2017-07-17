import React from 'react'

const Footer = (props) => (
  <div className="footer">
    <span>a project by <a href="https://twitter.com/dawn_labs">@dawn_labs ¬</a></span>
    <style jsx>{`
      div {
        font-size: 14px;
        margin: 32px 0;
        color: rgba(255, 255, 255, 0.5);
      }
      a {
        color: #C694E8;
        text-decoration: none;
      }
    `}</style>
  </div>
)

export default Footer
