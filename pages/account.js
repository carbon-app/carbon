// Theirs
import React from 'react'
import { logout } from '../lib/client'

// Ours
import Button from '../components/Button'
import Page from '../components/Page'
import LoginButton from '../components/LoginButton'
import MenuButton from '../components/MenuButton'
import { MetaLinks } from '../components/Meta'
import Billing from '../components/Billing'
import { useAuth } from '../components/AuthContext'

import { COLORS } from '../lib/constants'

function logoutThunk() {
  return logout
}

function Plan() {
  return (
    <div className="plan">
      <table>
        <thead>
          <tr>
            <td />
            <td>
              <h3>Free</h3>
            </td>
            <td>
              <h3 style={{ color: '#57b5f9' }}>Diamond</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Saved Snippets</td>
            <td>5 / day</td>
            <td>∞</td>
          </tr>
          <tr>
            <td>Full editor</td>
            <td>&#10004;</td>
            <td>&#10004;</td>
          </tr>
          <tr>
            <td>Embedded GitHub Gists</td>
            <td>&#10004;</td>
            <td>&#10004;</td>
          </tr>
          <tr>
            <td>API Access</td>
            <td></td>
            <td>&#10004;</td>
          </tr>
          <tr>
            <td>Embed saved snippets</td>
            <td></td>
            <td>&#10004;</td>
          </tr>
          <tr>
            <td>Save Custom Themes</td>
            <td></td>
            <td>&#10004;</td>
          </tr>
          <tr>
            <td>
              Twitter Card Unfurls <span title="Coming Soon">ⓘ</span>
            </td>
            <td></td>
            <td>&#10004;</td>
          </tr>
          <tr>
            <td></td>
            <td>FREE</td>
            <td>$9.99 / mth</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <Button large disabled margin="0 auto" center border padding="4px 8px" color="white">
                Current
              </Button>
            </td>
            <td>
              <Button large margin="0 auto" center border padding="4px 8px" color="#57b5f9">
                Upgrade
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <style jsx>
        {`
          table {
            width: 100%;
          }
          td {
            font-size: 14px;
            padding: 0.5rem 0.5rem 0.5rem 1rem;
          }
          tr:nth-of-type(odd) {
            background: ${COLORS.HOVER};
          }
          thead tr {
            background: ${COLORS.BLACK};
          }

          tr td:not(:last-of-type) {
            border-right: 1px solid white;
          }

          tr td:not(:nth-child(1)) {
            text-align: center;
            padding: 0.5rem 1rem;
          }
          h3 {
            margin: 0;
          }

          table :global(button) {
            text-transform: uppercase;
            font-size: 16px;
          }
        `}
      </style>
    </div>
  )
}

function Settings() {
  const [selected, select] = React.useState('Billing')
  const user = useAuth()

  if (!user) {
    return <LoginButton />
  }

  function selectMenu(name) {
    return () => select(name)
  }
  return (
    <div className="editor">
      <div className="settings-bottom">
        <div className="settings-menu">
          <MenuButton name="Plan" select={selectMenu} selected={selected}></MenuButton>
          <MenuButton name="Billing" select={selectMenu} selected={selected}></MenuButton>

          {/* <MenuButton name="API Keys" select={selectMenu} selected={selected} /> */}
          <MenuButton name="Sign Out" select={logoutThunk} selected={selected} noArrows />
        </div>
        <div className="content">
          {selected === 'Plan' && <Plan />}
          {selected === 'Billing' && <Billing />}
        </div>
      </div>
      {user && <img className="avatar" src={user.photoURL} alt={user.displayName} />}
      <style jsx>
        {`
          .editor {
            position: relative;
            background: ${COLORS.BLACK};
            border: 3px solid ${COLORS.SECONDARY};
            border-radius: 8px;
            width: auto;
          }

          .settings-container {
            position: relative;
          }

          .settings-bottom {
            display: flex;
            border-radius: 8px;
          }

          .settings-menu {
            display: flex;
            flex-direction: column;
            flex: 0 0 96px;
            background-color: ${COLORS.DARK_GRAY};
          }

          .content {
            width: 580px;
            border-left: 3px solid ${COLORS.SECONDARY};
          }

          .avatar {
            position: absolute;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: ${COLORS.BLACK};
            border: 3px solid ${COLORS.SECONDARY};
            top: -32px;
            right: -32px;
          }
        `}
      </style>
    </div>
  )
}

function SettingsPage() {
  return (
    <Page>
      <MetaLinks />
      <Settings />
    </Page>
  )
}

export default SettingsPage
