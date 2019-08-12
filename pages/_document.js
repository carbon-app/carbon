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
          {/* <script src="https://reveal.clearbit.com/v1/companies/reveal?authorization=pk_f0bc52e62e19fe1a43cb47e95e090d89&variable=clearbit" /> */}
        </body>
      </html>
    )
  }
}
