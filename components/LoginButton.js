import React from 'react'
import { useLocalStorage } from '@dawnlabs/tacklebox'
import Button from './Button'
import { githubClient } from '../lib/api'

function LoginButton() {
  const [token] = useLocalStorage('t')
  const [user, setState] = React.useState(null)

  React.useEffect(() => {
    githubClient.defaults.headers['Authorization'] = token ? `token ${token}` : ''
  }, [token])

  React.useEffect(() => {
    if (token && !user) {
      githubClient
        .get('/user')
        .then(res => res.data)
        .then(setState)
        .catch(() => setState(false))
    }
  }, [token, user])

  return (
    <a
      href={
        user
          ? 'https://github.com/login/oauth/authorize?client_id=dd6d9289c515d34bbe15&scope=gist&allow_signup=true'
          : '#'
      }
    >
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
