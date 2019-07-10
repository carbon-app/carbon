import React from 'react'
import AuthContext from './AuthContext'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'
import Announcement from './Announcement'

import { GA_TRACKING_ID } from '../lib/constants'

class Page extends React.Component {
  render() {
    const { children, enableHeroText } = this.props
    return (
      <main className="main mt4 mb4">
        <Meta />
        <Announcement />
        <Header enableHeroText={enableHeroText} />
        <AuthContext>
          <div className="page">{children}</div>
        </AuthContext>

        <Footer />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `
          }}
        />

        <style jsx>
          {`
            .main {
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              min-width: 1080px; // temporary fix for mobile overflow issue
            }
          `}
        </style>
      </main>
    )
  }
}

export default Page
