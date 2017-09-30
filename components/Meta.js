import Head from 'next/head'
import { THEMES_ARRAY, COLORS } from '../lib/constants'
import Reset from './style/Reset'
import Typography from './style/Typography'

export default () => (
  <div className="meta">
    <Head>
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
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
      <title>Carbon</title>
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/codemirror.min.css"
      />
      {THEMES_ARRAY.map((theme, i) => (
        <link
          key={i}
          rel="stylesheet"
          href={
            theme.link ||
            `//cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/theme/${theme.id}.min.css`
          }
        />
      ))}
      <link rel="stylesheet" href="//cdn.jsdelivr.net/font-hack/2.020/css/hack-extended.min.css" />
      <link rel="stylesheet" type="text/css" href="/static/react-spinner.css" />
    </Head>
    <Reset />
    <Typography />
    <style jsx>{`
      .meta {
        display: none;
      }
    `}</style>
  </div>
)
