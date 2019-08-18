import React from 'react'
import api from '../lib/api'

const Context = React.createContext(api)

export function useAPI() {
  return React.useContext(Context)
}

export default Context
