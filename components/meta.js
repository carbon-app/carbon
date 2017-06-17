import Head from 'next/head'

export default () => (
  <div>
    <Head>
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
    `}</style>
  </div>
)
