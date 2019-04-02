import React from 'react'
import Button from './Button'

import { Context as AuthContext } from './AuthContext'

function LoginButton(props) {
  const user = React.useContext(AuthContext)

  if (!user) {
    return null
  }

  return (
    <Button
      center
      border
      large
      padding="0 16px"
      margin="0 8px 0 8px"
      color="#37b589"
      onClick={props.onClick}
    >
      Save
    </Button>
  )
}

export default LoginButton
