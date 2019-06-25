import React from 'react'
import firebase from '../lib/client'

import Button from './Button'
import Popout, { managePopout } from './Popout'
import { Context } from './AuthContext'

function Drawer(props) {
  return (
    <Popout hidden={!props.isVisible} pointerLeft="14px" style={{ width: '180px', left: 0 }}>
      <div className="flex">
        <Button
          large
          center
          padding="8px 0"
          onClick={() =>
            firebase
              .auth()
              .signOut()
              .catch(console.error)
          }
        >
          Sign out
        </Button>
      </div>
      <style jsx>
        {`
          .flex {
            display: flex;
            height: 100%;
          }
        `}
      </style>
    </Popout>
  )
}

function LoginButton({ isVisible, toggleVisibility }) {
  const user = React.useContext(Context)

  return (
    <div>
      <Button
        center
        border
        large
        padding="0 16px"
        color="white"
        className="profile-button"
        onClick={() => {
          if (!user) {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
              .then(() => {
                const provider = new firebase.auth.GithubAuthProvider()
                return firebase.auth().signInWithRedirect(provider)
              })
              .catch(console.error)
          } else {
            toggleVisibility()
          }
        }}
      >
        <img
          height={20}
          src={user ? user.photoURL : '/static/github.svg'}
          alt={user ? user.displayName : 'GitHub'}
        />
        <span>{user ? user.displayName : 'Sign in/up'}</span>
      </Button>
      <Drawer isVisible={user && isVisible} />
      <style jsx>
        {`
          div,
          div :global(.profile-button) {
            position: relative;
            height: 100%;
          }
          div :global(.profile-button) {
            max-width: 142px;
          }
          span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          img {
            border-radius: 50%;
            margin-right: 16px;
          }
        `}
      </style>
    </div>
  )
}

export default managePopout(LoginButton)
