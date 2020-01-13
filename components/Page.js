import React from 'react'
import AuthContext from './AuthContext'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'
import Announcement from './Announcement'
import LoginButton from './LoginButton'

const COLUMN = `
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
class Page extends React.Component {
  render() {
    const { children, enableHeroText, flex } = this.props
    return (
      <main className="main mb3">
        <Meta />
        <AuthContext>
          <Announcement />
          <Header enableHeroText={enableHeroText} />
          <div className="login-button-container">
            <LoginButton />
          </div>
          <div className="page">{children}</div>
        </AuthContext>

        <Footer />

        <style jsx>
          {`
            .main {
              ${flex ? COLUMN : ''}
              margin-top: 6rem;
            }
            .login-button-container {
              position: absolute;
              top: 1.4rem;
              right: 1rem;
            }
            @media (min-width: 1024px) {
              .main {
                ${COLUMN};
              }
            }
          `}
        </style>
      </main>
    )
  }
}

export default Page
