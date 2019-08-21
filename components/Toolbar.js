import React from 'react'

const Toolbar = props => (
  <div className="toolbar" style={props.style}>
    {props.children}
    <style jsx>
      {`
        .toolbar {
          width: 100%;
          height: 40px;
          margin-bottom: 16px;
          display: flex;
          position: relative;
          z-index: 3;
          font-size: 14px;
        }

        .toolbar > :global(div) {
          margin-right: 8px;
        }

        .toolbar > :global(div):last-child {
          margin-right: 0px;
        }
      `}
    </style>
  </div>
)

export default Toolbar
