import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/constants'

export default class extends Document {
  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        </body>
      </html>
    )
  }
}
