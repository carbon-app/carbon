import React from 'react'
import ReactGA from 'react-ga'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'
import Toast from './Toast'

import { GA_TRACKING_ID } from '../lib/constants'

class Page extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(GA_TRACKING_ID)
      ReactGA.pageview(window.location.pathname)
    }
  }

  render() {
    const { children, enableHeroText } = this.props
    return (
      <main className="main mt4 mb4">
        <Meta />
        <Toast />
        <Header enableHeroText={enableHeroText} />
        <div className="page">{children}</div>

        <Footer />

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
