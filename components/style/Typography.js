import React from 'react'

export default function Typography() {
  return (
    <style jsx global>
      {`
        /* https://github.com/jxnblk/type-system
    Brent Jackson
    License: MIT
    */
        :root {
          --h0: 4.5rem;
          --h1: 3rem;
          --h2: 2.25rem;
          --h3: 1.5rem;
          --h4: 1.125rem;
          --h5: 0.75rem;

          --lh: calc(4 / 3);

          --m1: calc(2 / 3 * 1em);
          --m2: calc(4 / 3 * 1em);
          --m3: calc(8 / 3 * 1em);
          --m4: calc(16 / 3 * 1em);
          --x1: 0.5rem;
          --x2: 1rem;
          --x3: 2rem;
          --x4: 4rem;
          --x5: 8rem;
          --x6: 16rem;
        }

        body {
          font-size: var(--h4);
          line-height: var(--lh);
        }

        h1,
        h2,
        h3 {
          margin-top: var(--m1);
          margin-bottom: 0;
        }

        h4,
        h5,
        h6,
        p,
        dl,
        ol,
        ul,
        blockquote {
          margin-top: var(--m2);
          margin-bottom: var(--m2);
        }

        h1 {
          font-size: var(--h2);
        }
        h2,
        h3 {
          font-size: var(--h3);
        }
        h4 {
          font-size: var(--h4);
        }
        h5,
        h6 {
          font-size: var(--h5);
        }

        .mt0 {
          margin-top: 0;
        }
        .mb0 {
          margin-bottom: 0;
        }
        .mt1 {
          margin-top: var(--x1);
        }
        .mb1 {
          margin-bottom: var(--x1);
        }
        .mt2 {
          margin-top: var(--x2);
        }
        .mb2 {
          margin-bottom: var(--x2);
        }
        .mt3 {
          margin-top: var(--x3);
        }
        .mb3 {
          margin-bottom: var(--x3);
        }
        .mt4 {
          margin-top: var(--x4);
        }
        .mb4 {
          margin-bottom: var(--x4);
        }
        .mt5 {
          margin-top: var(--x5);
        }
        .mb5 {
          margin-bottom: var(--x5);
        }
        .mt6 {
          margin-top: var(--x6);
        }
        .mb6 {
          margin-bottom: var(--x6);
        }
      `}
    </style>
  )
}
