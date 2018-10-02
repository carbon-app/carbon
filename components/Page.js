import React from 'react'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'

class Page extends React.Component {
  render() {
    const { children, enableHeroText } = this.props
    return (
      <main className="main mt4 mb4">
        <Meta />
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
