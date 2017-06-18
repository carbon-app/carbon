import Head from 'next/head'
import { THEMES } from '../lib/constants'

export default () => (
  <div className="meta">
    <Head>
      <link rel="stylesheet" href='//cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/codemirror.min.css' />
      {
        THEMES.map(theme => (
          <link rel="stylesheet" href={`//cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/theme/${theme.id}.min.css`}/>
        ))
      }
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" href="//cdn.jsdelivr.net/font-hack/2.020/css/hack-extended.min.css" />
    </Head>
    <style jsx>{`
      .meta {
        display: none;
      }
    `}</style>
    <style jsx global>{`
      body {
        font-family: Hack, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        background: #000;
      }

      *, *:after, *:before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }

      ::selection {
          background-color: rgba(256, 256, 256, 0.165);
      }

      #toolbar > div {
        margin-right: 8px; // TODO fix hack
      }

      #toolbar>div:last-child {
        margin-right: 0px;
      }

      .CodeMirrorContainer .CodeMirror {
        height: auto;
        min-width: 680px;
        padding: 40px 18px 24px;
        border-radius: 3px;
      }

      .cm-s-dracula .CodeMirror-cursor {
          border-left: solid 2px #159588;
      }
    `}</style>
  </div>
)
