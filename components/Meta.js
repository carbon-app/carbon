import Head from 'next/head'
import { THEMES, PALETTE } from '../lib/constants'

export default () => (
  <div className="meta">
    <Head>
      <link rel="stylesheet" href='//cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/codemirror.min.css' />
      <link rel="stylesheet" href="/static/type-system.css" />
      {
        THEMES.map((theme, i) => (
          <link key={i} rel="stylesheet" href={`//cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/theme/${theme.id}.min.css`}/>
        ))
      }
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" href="//cdn.jsdelivr.net/font-hack/2.020/css/hack-extended.min.css" />
      <link rel="stylesheet" type="text/css" href="/static/react-spinner.css" />
    </Head>
    <style jsx>{`
      .meta {
        display: none;
      }
    `}</style>
    <style jsx global>{`
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: #fff;
        background: #000;
      }

      h1, h2, h3, h4, h5, h6 {
        font-weight: 500;
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

      .settings-settings > div {
        border-bottom: solid 1px ${PALETTE.SECONDARY};
      }

      .settings-settings > div:first-child {
        border-bottom: none;
      }

      .selected svg {
        border-radius: 3px;
        border: solid 2px ${PALETTE.SECONDARY};
      }

      .CodeMirror__container.dropshadow {
        box-shadow: 0px 3px 15px rgba(0,0,0,0.3);
        border-radius: 5px;
      }

      .CodeMirror__container .CodeMirror {
        height: auto;
        min-width: 680px;
        padding: 24px 18px;
        border-radius: 5px;
        font-family: Hack, monospace !important;
        font-size: 0.7rem;
      }

      .window-theme__sharp > .CodeMirror {
        border-radius: 0px;
      }

      .window-theme__bw > .CodeMirror {
        border: 2px solid ${PALETTE.SECONDARY};
      }

      .window-controls + .CodeMirror__container > .CodeMirror {
        padding-top: 40px;
      }

      .cm-s-dracula .CodeMirror-cursor {
          border-left: solid 2px #159588;
      }

      /* Colorpicker overrides */
      .twitter-picker {
        width: 278px !important;
        border: 0.5px solid ${PALETTE.SECONDARY} !important;
        border-radius: 3px !important;
        background: #1A1A1A !important;
      }

      .colorpicker-picker > div > div:nth-child(3) > div:nth-child(11) {
        background: #1A1A1A !important;
        border: 0.5px solid ${PALETTE.SECONDARY} !important;
        border-right: none !important;
        border-radius: 3px 0 0 3px !important;
        color: ${PALETTE.SECONDARY} !important;
      }

      #toolbar > div.colorpicker-container > div.colorpicker-picker > div > div:nth-child(3) > div:nth-child(12) > input {
        background: rgba(255, 255, 255, 0.165) !important;
        height: 30px !important;
        width: 108px !important;
        color: #fff !important;
      }

      #toolbar > div.colorpicker-container > div.colorpicker-picker > div > div:nth-child(3) > span > div {
        border-radius: 2px !important;
      }
    `}</style>
  </div>
)
