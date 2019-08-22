import React from 'react'
import { useAsyncCallback, useOnline } from '@dawnlabs/tacklebox'

import Button from './Button'
import Toolbar from './Toolbar'
import { useAuth } from './AuthContext'

import { COLORS } from '../lib/constants'

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
      onBlur={() => setConfirmed(false)}
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
      color="#fff"
      onClick={onClick}
      style={{ color: COLORS.RED }}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </ConfirmButton>
  )
}

function DuplicateButton(props) {
  const [onClick, { loading }] = useAsyncCallback(props.onClick)

  return (
    <Button
      display="block"
      padding="0 16px"
      margin="0 0 0 1rem"
      flex="unset"
      center
      border
      large
      color="#37b589"
      onClick={onClick}
    >
      {loading ? 'Duplicating...' : 'Duplicate'}
    </Button>
  )
}

function SnippetToolbar(props) {
  const user = useAuth()
  const online = useOnline()

  if (!online) {
    return null
  }

  if (!user) {
    return null
  }

  if (!props.snippet) {
    return null
  }

  const sameUser = user.uid === props.snippet.userId

  return (
    <Toolbar
      style={{
        marginTop: 16,
        marginBottom: 0,
        flexDirection: 'row-reverse',
        // justifyContent: 'space-between',
        zIndex: 1
      }}
    >
      <DuplicateButton onClick={props.onCreate} />
      {sameUser && <DeleteButton onClick={props.onDelete} />}
    </Toolbar>
  )
}

export default SnippetToolbar
