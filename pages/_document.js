import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {
  render() {
    return (
      <React.StrictMode>
        <html lang="en">
          <Head />
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      </React.StrictMode>
    )
  }
}
