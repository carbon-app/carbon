import React from 'react'
import Link from 'next/link'
import { COLORS } from '../lib/constants'

const Footer = () => (
  <footer role="contentinfo" className="mt3">
    <nav className="mt3">
      <Link href="/about">
        <a className="link" href="/about">
          about
        </a>
      </Link>
      <a className="link" href="https://github.com/carbon-app/carbon/issues/new">
        send feedback
      </a>
      <a className="link" href="https://github.com/carbon-app/carbon">
        source
      </a>
    </nav>
    <div className="mt3 mb2">
      a project by{' '}
      <a className="author-link" href="https://twitter.com/carbon_app">
        @carbon_app
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

        a {
          margin-right: 16px;
        }

        a:last-child {
          margin-right: 0;
        }

        .author-link {
          color: ${COLORS.PRIMARY};
          text-decoration: none;
        }

        .author-link:hover {
          color: #fff;
        }
      `}
    </style>
  </footer>
)

export default Footer
