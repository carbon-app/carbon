import React from 'react'
import { useLocalStorage } from '@dawnlabs/tacklebox'
import { githubClient } from '../lib/api'

export const Context = React.createContext(null)

function AuthContext(props) {
  const [token] = useLocalStorage('t')
  const [user, setState] = React.useState(null)

  React.useEffect(() => {
    githubClient.defaults.headers['Authorization'] = token ? `token ${token}` : ''
  }, [token])

  React.useEffect(() => {
    if (token) {
      if (!user) {
        githubClient
          .get('/user')
          .then(res => res.data)
          .then(setState)
          .catch(console.error)
      }
    } else {
      if (user) {
        setState(null)
      }
    }
  }, [token, user])

  return <Context.Provider value={user}>{props.children}</Context.Provider>
}

export default AuthContext
