import Head from 'next/head'
import { THEMES } from '../lib/constants'
import Reset from './style/Reset'
import Font from './style/Font'
import Typography from './style/Typography'

const LOCAL_STYLESHEETS = ['one-dark', 'verminal', 'night-owl', 'nord']

const CDN_STYLESHEETS = THEMES.filter(
  t => t.hasStylesheet !== false && LOCAL_STYLESHEETS.indexOf(t.id) < 0
)

export default () => {
  const onBrowser = typeof window !== 'undefined'
  return (
    <div className="meta">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
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
        <link rel="manifest" href="/static/manifest.json" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link
          rel="preload"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
          href="/static/react-crop.css"
        />
        <link
          rel="preload"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
          href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/codemirror.min.css"
        />
        <link
          rel="preload"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
          href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/theme/solarized.min.css"
        />
        <link
          rel="preload"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
          href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.36.0/theme/seti.min.css"
        />
        {LOCAL_STYLESHEETS.map(id => (
          <link
            key={id}
            rel="preload"
            as="style"
            onLoad="this.onload=null;this.rel='stylesheet'"
            href={`/static/themes/${id}.css`}
          />
        ))}
        {onBrowser
          ? CDN_STYLESHEETS.map(theme => (
              <link
                key={theme.id}
                rel="preload"
                as="style"
                onLoad="this.onload=null;this.rel='stylesheet'"
                href={
                  theme.link ||
                  `//cdnjs.cloudflare.com/ajax/libs/codemirror/5.36.0/theme/${theme.id}.min.css`
                }
              />
            ))
          : null}
      </Head>
      <Reset />
      <Font />
      <Typography />
      <style jsx>
        {`
          .meta {
            display: none;
          }
        `}
      </style>
    </div>
  )
}
