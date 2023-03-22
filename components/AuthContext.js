import React from 'react'
import { getApps} from "firebase/app";
import { getAuth,onAuthStateChanged} from 'firebase/auth';
// IDEA: just read from firebase store at request time?
import { client } from '../lib/api'

export const Context = React.createContext(null)

export function useAuth() {
  return React.useContext(Context)
}

function AuthContext(props) {
  const [user, setState] = React.useState(null)

  React.useEffect(() => {

    if(getApps().length > 0)
    {
    onAuthStateChanged(getAuth() , newUser => setState(newUser))
    }
    
  }, [])

  React.useEffect(() => {
    if (user) {
      user.getIdToken().then(jwt => {
        client.defaults.headers['Authorization'] = jwt ? `Bearer ${jwt}` : undefined
      })
    } else {
      delete client.defaults.headers['Authorization']
    }
  }, [user])

  return <Context.Provider value={user}>{props.children}</Context.Provider>
}

export default AuthContext
