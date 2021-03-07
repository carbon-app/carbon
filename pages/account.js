// Theirs
import React from 'react'
import dynamic from 'next/dynamic'

// Ours
import Button from '../components/Button'
import Page from '../components/Page'
import MenuButton from '../components/MenuButton'
import { useAuth } from '../components/AuthContext'

import { loginGitHub, logout } from '../lib/client'
import { COLORS } from '../lib/constants'

const Billing = dynamic(() => import('../components/Billing'), {
  loading: () => <div style={{ minHeight: '360px' }} />,
})

function logoutThunk() {
  return logout
}

const soon = <span title="Coming Soon">ⓘ</span>

function Plan({ selectBilling }) {
  const user = useAuth()

  function handleSelectFree() {
    if (!user) {
      loginGitHub()
    }
  }

  function handleSelectUpgrade() {
    if (!user) {
      return loginGitHub()
    }

    selectBilling()
  }

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
              <h3 style={{ color: COLORS.BLUE }}>Diamond</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PNG/SVG Exports</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Full visual editor</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Custom backgrounds</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>GitHub Gist support</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Saved snippets</td>
            <td>1000</td>
            <td>∞</td>
          </tr>
          <tr>
            <td>Embed saved snippets</td>
            <td></td>
            <td>✔</td>
          </tr>
          <tr>
            <td>API Access {soon}</td>
            <td></td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Saved custom themes/presets {soon}</td>
            <td></td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Twitter card unfurls {soon}</td>
            <td></td>
            <td>✔</td>
          </tr>
          <tr>
            <td></td>
            <td>FREE FOREVER</td>
            <td>$5.00 / month</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <Button
                large
                margin="0 auto"
                center
                border
                padding="4px 8px"
                color="white"
                disabled={user && user.plan === 'free'}
                onClick={handleSelectFree}
              >
                {user ? 'Current' : 'Get Started'}
              </Button>
            </td>
            <td>
              <Button
                large
                margin="0 auto"
                center
                border
                padding="4px 8px"
                color={COLORS.BLUE}
                disabled={user && user.plan === 'diamond'}
                onClick={handleSelectUpgrade}
              >
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
  const [selected, select] = React.useState('Plan')
  const user = useAuth()

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
          {user && <MenuButton name="Sign Out" select={logoutThunk} selected={selected} noArrows />}
        </div>
        <div className="content">
          {selected === 'Plan' && <Plan selectBilling={selectMenu('Billing')} />}
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
            overflow: hidden;
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
            top: -40px;
            right: -40px;
          }
        `}
      </style>
    </div>
  )
}

function SettingsPage() {
  return (
    <Page flex={true}>
      <Settings />
    </Page>
  )
}

export default SettingsPage
