import React from 'react'
import Link from 'next/link'
import { COLORS } from '../lib/constants'

const Footer = props => (
  <footer role="contentinfo" className="mt3">
    <nav role="navigation" className="mt3">
      <Link href="/about">
        <a className="link">about</a>
      </Link>
      <a className="link" href="https://github.com/dawnlabs/carbon/issues/new">
        send feedback
      </a>
      <a className="link" href="https://github.com/dawnlabs/carbon">
        source
      </a>
    </nav>
    <div className="mt3 mb2">
      a project by{' '}
      <a className="dawn-link" href="https://dawnlabs.io">
        Dawn Labs
      </a>{' '}
      ¬
    </div>
    <style jsx>{`
      footer {
        font-size: 14px;
      }

      footer > div {
        text-align: center;
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
  </footer>
)

export default Footer
