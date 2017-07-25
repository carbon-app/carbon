import React from 'react'
import Link from 'next/link'
import { PALETTE } from '../lib/constants'

const Footer = (props) => (
  <div className="mt3">
    <div className="mt3">
      <Link href="/about"><a className="link">about</a></Link>
      <a className="link" href="mailto:hi@dawnlabs.io?subject=Carbon%20Feedback&anp;body=">send feedback</a>
      <a className="link" href="https://github.com/dawnlabs/carbon">source</a>
    </div>
    <div className="mt3 mb2">a project by <a className="dawn-link" href="https://twitter.com/dawn_labs">@dawn_labs</a> ¬</div>
    <style jsx>{`
      div > div {
        text-align: center;
        font-size: 14px;
        color: ${PALETTE.GRAY};
      }

      a {
        margin-right: 16px;
      }

      a:last-child {
        margin-right: 0;
      }

      .dawn-link {
        color: ${PALETTE.PRIMARY};
        text-decoration: none;
      }

      .dawn-link:hover {
        color: #fff;
      }
    `}</style>
  </div>
)

export default Footer
