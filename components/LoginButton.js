import React from 'react'
import firebase from '../lib/client'

import Button from './Button'
import { Context } from './AuthContext'

function LoginButton() {
  const user = React.useContext(Context)

  return (
    <div>
      <Button
        center
        border
        large
        padding="0 16px"
        margin="0 8px 0 0"
        color="white"
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
            firebase
              .auth()
              .signOut()
              .catch(console.error)
          }
        }}
      >
        <img
          height={20}
          src={user ? user.photoURL : '/static/github.svg'}
          alt={user ? user.displayName : 'GitHub'}
        />
        {user ? user.displayName : 'Login'}
      </Button>
      <style jsx>
        {`
          div,
          div :global(button) {
            height: 100%;
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

export default LoginButton
