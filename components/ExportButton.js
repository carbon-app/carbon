import React from 'react'
import { withRouter } from 'next/router'

import CopyButton from './CopyButton'

const toIFrame = url =>
  `<iframe
  src="https://carbon.now.sh/embed${url}"
  style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>
`

function ExportButton({ router, children, color }) {
  return (
    <React.Fragment>
      {children === 'COPY EMBED' ? (
        <CopyButton text={toIFrame(router.asPath)}>
          {({ copied }) => <button>{copied ? 'COPIED!' : 'COPY EMBED'}</button>}
        </CopyButton>
      ) : (
        <button>{children}</button>
      )}
      <style jsx>
        {`
          button {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            vertical-align: baseline;
            color: ${color};
            background: transparent;
            cursor: pointer;
          }

          &:active {
            outline: none;
          }
        `}
      </style>
    </React.Fragment>
  )
}

export default withRouter(ExportButton)
