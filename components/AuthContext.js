import React from 'react'
import firebase from '../lib/client'
// TODO just read from firebase store at request time.
import { client } from '../lib/api'

export const Context = React.createContext(null)

function AuthContext(props) {
  const [user, setState] = React.useState(null)

  React.useEffect(() => firebase.auth().onAuthStateChanged(newUser => setState(newUser)), [])

  React.useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .catch(console.error)
  }, [])

  React.useEffect(() => {
    if (user) {
      user.getIdToken().then(jwt => {
        client.defaults.headers['Authorization'] = jwt ? jwt : undefined
      })
    } else {
      delete client.defaults.headers['Authorization']
    }
  }, [user])

  return <Context.Provider value={user}>{props.children}</Context.Provider>
}

export default AuthContext
