import React from 'react'
import { useAsyncCallback, useOnline, useKeyboardListener } from '@dawnlabs/tacklebox'
import Button from './Button'

import { useAuth } from './AuthContext'
import Toolbar from './Toolbar'

function ConfirmButton(props) {
  const [confirmed, setConfirmed] = React.useState(false)

  return (
    <Button
      {...props}
      onClick={e => {
        if (confirmed) {
          props.onClick(e)
          setConfirmed(false)
        } else {
          setConfirmed(true)
        }
      }}
    >
      {confirmed ? 'Are you sure?' : props.children}
    </Button>
  )
}

function DeleteButton(props) {
  const [onClick, { loading }] = useAsyncCallback(props.onClick)

  return (
    <ConfirmButton
      display="block"
      padding="0 16px"
      flex="unset"
      center
      border
      large
      color="#b5373d"
      onClick={onClick}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </ConfirmButton>
  )
}

function SaveButton(props) {
  const [onClick, { loading }] = useAsyncCallback(props.onClick)

  useKeyboardListener('s', e => {
    if (e.metaKey) {
      onClick()
    }
  })

  return (
    <Button
      display="block"
      padding="0 16px"
      flex="unset"
      center
      border
      large
      color="#37b589"
      onClick={onClick}
    >
      {loading ? 'Saving...' : 'Save'}
    </Button>
  )
}

function SnippetToolbar(props) {
  const user = useAuth()
  const online = useOnline()

  if (!user) {
    return null
  }

  if (!online) {
    return null
  }

  return (
    <Toolbar
      style={{
        marginTop: 16,
        marginBottom: 0,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
      }}
    >
      <SaveButton onClick={props.onSave} />
      {props.snippet && <DeleteButton onClick={props.onDelete} />}
    </Toolbar>
  )
}

export default SnippetToolbar
