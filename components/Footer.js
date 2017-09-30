import React from 'react'
import Link from 'next/link'
import { COLORS } from '../lib/constants'

const Footer = props => (
  <div className="mt3">
    <div className="mt3">
      <Link href="/about">
        <a className="link">about</a>
      </Link>
      <a className="link" href="https://github.com/dawnlabs/carbon/issues/new">
        send feedback
      </a>
      <a className="link" href="https://github.com/dawnlabs/carbon">
        source
      </a>
    </div>
    <div className="mt3 mb2">
      a project by{' '}
      <a className="dawn-link" href="https://dawnlabs.io">
        Dawn Labs
      </a>{' '}
      ¬
    </div>
    <style jsx>{`
      div > div {
        text-align: center;
        font-size: 14px;
        color: ${COLORS.GRAY};
      }

      a {
        margin-right: 16px;
      }

      a:last-child {
        margin-right: 0;
      }

      .dawn-link {
        color: ${COLORS.PRIMARY};
        text-decoration: none;
      }

      .dawn-link:hover {
        color: #fff;
      }
    `}</style>
  </div>
)

export default Footer
