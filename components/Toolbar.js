import React from 'react'

const Toolbar = props => (
  <div className="toolbar" style={props.style}>
    {props.children}
    <style jsx>
      {`
        .toolbar {
          width: 100%;
          height: 40px;
          margin-bottom: 1rem;
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

        @media (max-width: 920px) {
          .toolbar {
            max-width: 100%;
            height: auto;
            flex-direction: column;
          }
          .toolbar > :global(div:not(:last-of-type)) {
            margin-right: 0;
            margin-bottom: 1rem;
          }
        }
      `}
    </style>
  </div>
)

export default Toolbar
