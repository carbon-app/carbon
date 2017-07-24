import React from 'react'
import Link from 'next/link'
import { PALETTE } from '../lib/constants'

const Footer = (props) => (
  <div className="mt3">
    <div className="mt2">
      <Link href="/about"><a>about</a></Link>
      <a href="mailto:hi@dawnlabs.io?subject=Carbon%20Feedback&anp;body=">send feedback</a>
      <a href="https://github.com/dawnlabs/carbon">source</a>
    </div>
    <div className="mt2">a project by <a href="https://twitter.com/dawn_labs">@dawn_labs</a> ¬</div>
    <style jsx>{`
      div > div {
        text-align: center;
        font-size: 14px;
        color: ${PALETTE.GRAY};
      }

      a {
        margin-right: 16px;
        color: #fff;
        text-decoration: none;
      }

      a:last-child {
        margin-right: 0;
      }

      a:hover {
        border-bottom: 1px solid #fff;
      }
    `}</style>
  </div>
)

export default Footer
