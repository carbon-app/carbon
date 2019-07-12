import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { COLORS } from '../lib/constants'

const EmailSubscribe = dynamic(() => import('./EmailSubscribe'), {
  loading: () => null
})

const Footer = () => (
  <footer role="contentinfo" className="mt3">
    <nav className="mt3">
      <Link href="/about">
        <a className="link" href="/about">
          about
        </a>
      </Link>
      <a className="link" href="https://github.com/dawnlabs/carbon/issues/new">
        feedback
      </a>
      <a className="link" href="https://github.com/dawnlabs/carbon">
        source
      </a>
      <a className="link" href="/terms">
        terms
      </a>
      <a className="link" href="/privacy">
        privacy
      </a>
      <EmailSubscribe />
    </nav>

    <div className="mt2 mb2">
      created by{' '}
      <a className="creator-link" href="https://dawnlabs.io">
        Dawn Labs
      </a>{' '}
      ¬
    </div>
    <style jsx>
      {`
        footer {
          font-size: 14px;
        }

        footer > div {
          text-align: center;
          color: ${COLORS.GRAY};
        }

        nav {
          display: flex;
          align-items: center;
        }

        a {
          margin-right: 1rem;
        }

        a:last-child {
          margin-right: 0;
        }

        .creator-link {
          color: ${COLORS.PRIMARY};
          text-decoration: none;
        }

        .creator-link:hover {
          color: #fff;
        }
      `}
    </style>
  </footer>
)

export default Footer
