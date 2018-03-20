import Head from 'next/head'
import { THEMES, COLORS } from '../lib/constants'
import Reset from './style/Reset'
import Font from './style/Font'
import Typography from './style/Typography'

import '../static/react-crop.css'
import '../static/react-spinner.css'

export default () => (
  <div className="meta">
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Carbon is the easiest way to create and share beautiful images of your source code."
      />
      <meta name="application-name" content="Carbon" />
      <meta name="twitter:title" content="Carbon" />
      <meta
        name="twitter:description"
        content="Carbon is the easiest way to create and share beautiful images of your source code."
      />
      <meta name="og:title" content="Carbon" />
      <meta
        name="og:description"
        content="Carbon is the easiest way to create and share beautiful images of your source code."
      />
      <meta name="og:image" content="/static/banner.png" />
      <meta name="theme-color" content="#121212" />
      <title>Carbon</title>
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" href="/_next/static/style.css" />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/codemirror.min.css"
      />
      <link
        rel="stylesheet"
        href={`//cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/theme/solarized.min.css`}
      />
      {THEMES.filter(t => t.hasStylesheet !== false).map((theme, i) => (
        <link
          key={i}
          rel="stylesheet"
          href={
            theme.link ||
            `//cdnjs.cloudflare.com/ajax/libs/codemirror/5.36.0/theme/${theme.id}.min.css`
          }
        />
      ))}
    </Head>
    <Reset />
    <Font />
    <Typography />
    <style jsx>{`
      .meta {
        display: none;
      }
    `}</style>
  </div>
)
