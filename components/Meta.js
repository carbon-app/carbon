import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <link rel="stylesheet" href='//cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/codemirror.min.css' />
      <link rel="stylesheet" href='//cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/theme/dracula.min.css'/>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" href="//cdn.jsdelivr.net/font-hack/2.020/css/hack-extended.min.css" />
    </Head>
    <style jsx global>{`
      body {
        font-family: Hack, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        background: #000;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
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
    `}</style>
  </div>
)
