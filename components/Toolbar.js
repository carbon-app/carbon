import React from 'react'
const Toolbar = props => (
  <div id="toolbar">
    {props.children}
    <style jsx>{`
      #toolbar {
        width: 100%;
        height: 40px; // TODO fix
        margin-bottom: 16px;
        display: flex;
        position: relative;
        z-index: 3;
        font-size: 14px;
        color: #fff;
      }

      #toolbar > :global(div) {
        margin-right: 8px;
      }

      #toolbar > :global(div):last-child {
        margin-right: 0px;
      }
    `}</style>
  </div>
)

export default Toolbar
