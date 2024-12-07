import React from 'react'
import { useAsyncCallback, useOnline, useKeyboardListener } from 'actionsack'

import Button from './Button'
import Toolbar from './Toolbar'
import Input from './Input'
import ConfirmButton from './ConfirmButton'
import Popout, { managePopout } from './Popout'
import { Down as ArrowDown } from './svg/Arrows'
import { useAuth } from './AuthContext'

import { COLORS } from '../lib/constants'

const popoutStyle = { width: '120px', right: -8, top: 40 }

function DeleteButton(props) {
  const [onClick, { loading }] = useAsyncCallback(props.onClick)

  return (
    <ConfirmButton
      display="block"
      padding="8px"
      flex="unset"
      center
      large
      color="#fff"
      onClick={onClick}
      style={{ color: COLORS.RED }}
    >
      {loading ? 'Deleting…' : 'Delete'}
    </ConfirmButton>
  )
}

function DuplicateButton(props) {
  const [onClick, { loading }] = useAsyncCallback(props.onClick)

  return (
    <Button
      border
      large
      center
      color={COLORS.GREEN}
      onClick={onClick}
      data-cy="duplicate-button"
      style={{ minWidth: 92 }}
      title="Duplicate"
      disabled={loading}
    >
      {loading ? 'Duplicating…' : 'Duplicate'}
    </Button>
  )
}

function SaveButton({ loading, onClick, sameUser }) {
  useKeyboardListener('⌥-s', e => {
    if (loading) {
      return
    }
    e.preventDefault()
    onClick()
  })

  return (
    <Button
      border
      large
      center
      color={COLORS.GREEN}
      onClick={onClick}
      data-cy="save-button"
      style={{
        minWidth: 84,
        borderBottomRightRadius: sameUser ? 0 : undefined,
        borderTopRightRadius: sameUser ? 0 : undefined,
      }}
      title="Save"
      disabled={loading}
    >
      {loading ? 'Saving…' : 'Save'}
    </Button>
  )
}

function SnippetToolbar({ toggleVisibility, isVisible, snippet, ...props }) {
  const user = useAuth()
  const online = useOnline()

  const [save, { loading }] = useAsyncCallback(() => {
    if (snippet) {
      return props.onUpdate()
    } else {
      return props.onCreate()
    }
  })

  if (!online) return null
  if (!user) return null

  const sameUser = snippet && user.uid === snippet.userId

  return (
    <Toolbar
      style={{
        position: 'relative',
        zIndex: 1,
        marginTop: 16,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Popout hidden={!isVisible} borderColor={COLORS.GREEN} pointerRight="6px" style={popoutStyle}>
        <div className="menu flex">
          <DeleteButton onClick={props.onDelete} />
        </div>
      </Popout>
      <div style={{ marginRight: 'auto' }}>
        <Input
          align="left"
          placeholder="Add a name…"
          fontSize="14px"
          value={props.name}
          onChange={e => props.onChange('name', e.target.value)}
        />
      </div>
      <div className="flex">
        {snippet && !sameUser ? (
          <DuplicateButton onClick={props.onCreate} />
        ) : (
          <SaveButton loading={loading} onClick={save} sameUser={sameUser} />
        )}
        {sameUser && (
          <Button
            title="Save menu dropdown"
            border
            large
            center
            color={COLORS.GREEN}
            padding="0 8px"
            margin="0 0 0 -1px"
            onClick={toggleVisibility}
            data-cy="save-button"
            style={{
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              maxWidth: '26px',
            }}
          >
            <ArrowDown color={COLORS.GREEN} />
          </Button>
        )}
      </div>
      <style jsx>
        {`
          .menu {
            flex-direction: column;
          }
        `}
      </style>
    </Toolbar>
  )
}

export default managePopout(SnippetToolbar)
