import React from 'react'
import { useAsyncCallback, useOnline } from '@dawnlabs/tacklebox'
import Button from './Button'

import { Context as AuthContext } from './AuthContext'

function SaveButton(props) {
  const user = React.useContext(AuthContext)
  const online = useOnline()
  const [onClick, { loading }] = useAsyncCallback(props.onClick)

  if (!user) {
    return null
  }

  if (!online) {
    return null
  }

  return (
    <Button
      center
      border
      large
      padding="0 16px"
      margin="0 0 0 8px"
      color="#37b589"
      onClick={onClick}
      flex={0}
    >
      {loading ? 'Saving...' : 'Save'}
    </Button>
  )
}

export default React.memo(SaveButton)
