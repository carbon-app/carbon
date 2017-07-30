import Head from 'next/head'
import { THEMES, COLORS } from '../lib/constants'
import Reset from './style/Reset'
import Typography from './style/Typography'

export default () => (
  <div className="meta">
    <Head>
      <link rel="stylesheet" href='//cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/codemirror.min.css' />
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
    <Reset />
    <Typography />
    <style jsx>{`
      .meta {
        display: none;
      }
    `}</style>
  </div>
)
