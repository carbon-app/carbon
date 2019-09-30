import React from 'react'
import Link from 'next/link'
import { COLORS } from '../lib/constants'

const Footer = () => (
  <footer role="contentinfo" className="mt3">
    <nav className="mt3">
      <Link href="/about" prefetch={false}>
        <a className="link" href="/about">
          about
        </a>
      </Link>
      <a
        className="link"
        href="https://opencollective.com/carbon-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        sponsor
      </a>
      <a className="link" href="https://github.com/carbon-app/carbon/issues/new">
        feedback
      </a>
      <a className="link" href="https://github.com/carbon-app/carbon">
        source
      </a>
      <a className="link" href="/terms">
        terms
      </a>
      <a className="link" href="/privacy">
        privacy
      </a>
    </nav>

    <div className="mt2 mb2">
      created by{' '}
      <a className="author-link" href="https://twitter.com/carbon_app">
        @carbon_app
      </a>{' '}
      ¬
    </div>
    <style jsx>
      {`
        footer {
          font-size: 14px;
          text-align: center;
        }

        footer > div {
          text-align: center;
          color: ${COLORS.GRAY};
        }

        nav {
          margin: 0 auto;
        }

        a {
          margin-right: 1rem;
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
