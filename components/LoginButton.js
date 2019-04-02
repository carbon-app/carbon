import React from 'react'
import Button from './Button'

import { Context } from './AuthContext'

function LoginButton() {
  const user = React.useContext(Context)

  const href = !user
    ? 'https://github.com/login/oauth/authorize?client_id=dd6d9289c515d34bbe15&scope=gist&allow_signup=true'
    : null

  return (
    <a href={href}>
      <Button center border large padding="0 16px" margin="0 8px 0 0" color="white">
        <img
          height={20}
          src={user ? user.avatar_url : '/static/github.svg'}
          alt={user ? user.name : 'GitHub'}
        />
        {user ? user.login : 'Login'}
      </Button>
      <style jsx>
        {`
          a,
          a :global(button) {
            height: 100%;
          }
          img {
            border-radius: 50%;
            margin-right: 16px;
          }
        `}
      </style>
    </a>
  )
}

export default LoginButton
