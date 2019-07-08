// Theirs
import React from 'react'
import { logout } from '../lib/client'

// Ours
import Page from '../components/Page'
import LoginButton from '../components/LoginButton'
import MenuButton from '../components/MenuButton'
import { MetaLinks } from '../components/Meta'
import { useAuth } from '../components/AuthContext'

import { COLORS } from '../lib/constants'

function logoutThunk() {
  return logout
}

function Settings() {
  const [selected] = React.useState('Account')
  const user = useAuth()

  if (!user) {
    return <LoginButton />
  }

  function selectMenu() {}
  return (
    <div className="editor">
      <div className="settings-bottom">
        <div className="settings-menu">
          <MenuButton name="Account" select={selectMenu} selected={selected} />
          {/* <MenuButton name="API Keys" select={selectMenu} selected={selected} /> */}
          <MenuButton name="Sign Out" select={logoutThunk} selected={selected} noArrows />
        </div>
        <div className="content"></div>
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
