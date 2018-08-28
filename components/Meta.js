import Head from 'next/head'
import { THEMES, THEMES_HASH } from '../lib/constants'
import Reset from './style/Reset'
import Font from './style/Font'
import Typography from './style/Typography'

const LOCAL_STYLESHEETS = ['one-dark', 'verminal', 'night-owl', 'nord']

const CDN_STYLESHEETS = THEMES.filter(t => LOCAL_STYLESHEETS.indexOf(t.id) < 0)

export const StylesheetLink = ({ theme }) => {
  let href
  if (LOCAL_STYLESHEETS.indexOf(theme) > -1) {
    href = `/static/themes/${theme}.css`
  } else {
    const themeDef = THEMES_HASH[theme]
    href = `//cdnjs.cloudflare.com/ajax/libs/codemirror/5.39.2/theme/${themeDef &&
      (themeDef.link || themeDef.id)}.min.css`
  }

  return (
    <Head>
      <link key={href} rel="stylesheet" href={href} />
    </Head>
  )
}

export const CodeMirrorLink = () => (
  <Head>
    <link
      key="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.39.2/codemirror.min.css"
      rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.39.2/codemirror.min.css"
    />
  </Head>
)

export const MetaTags = () => (
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
    <link rel="manifest" href="/static/manifest.json" />
  </Head>
)

/*
 * Before supporting <link rel="preload"> verify that it is widely supported in FireFox
 * with out a flag here: https://caniuse.com/#feat=link-rel-preload
 */
export default function Meta() {
  const onBrowser = typeof window !== 'undefined'
  return (
    <div className="meta">
      <Head>
        <title>Carbon</title>
        <link rel="stylesheet" href="/static/react-crop.css" />
      </Head>
      <MetaTags />
      <StylesheetLink theme="seti" />
      <CodeMirrorLink />
      {LOCAL_STYLESHEETS.map(id => (
        <StylesheetLink key={id} theme={id} />
      ))}
      {onBrowser
        ? CDN_STYLESHEETS.map(theme => <StylesheetLink key={theme.id} theme={theme.id} />)
        : null}
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
