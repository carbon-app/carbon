import React from 'react'
import { useAsyncCallback, useOnline, useKeyboardListener } from 'actionsack'

import Button from './Button'
import Toolbar from './Toolbar'
import Input from './Input'
import ConfirmButton from './ConfirmButton'
import Popout, { managePopout } from './Popout'
import { Down as ArrowDown } from './svg/Arrows'
import { useAPI } from './ApiContext'
import { useAuth } from './AuthContext'

import { COLORS } from '../lib/constants'

const popoutStyle = { width: '144px', right: 15, top: 40 }

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
      style={{ color: COLORS.RED, borderTop: `1px solid ${COLORS.GREEN}` }}
    >
      {loading ? 'Deleting…' : 'Delete'}
    </ConfirmButton>
  )
}

function DuplicateButton(props) {
  const [onClick, { loading }] = useAsyncCallback(props.onClick)

  return (
    <Button
      display="block"
      padding="8px"
      flex="unset"
      center
      large
      color={COLORS.GREEN}
      onClick={onClick}
    >
      {loading ? 'Duplicating…' : 'Duplicate'}
    </Button>
  )
}

function SaveButton({ loading, onClick }) {
  useKeyboardListener('⌥-s', e => {
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
      style={{ minWidth: 84, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
      title="Save"
      disabled={loading}
    >
      {loading ? 'Saving…' : 'Save'}
    </Button>
  )
}

function SnippetToolbar({
  toggleVisibility,
  isVisible,
  snippet,
  setSnippet,
  setToasts,
  state,
  ...props
}) {
  const user = useAuth()
  const online = useOnline()
  const api = useAPI()
  const [update, { loading }] = useAsyncCallback(api.snippet.update)

  if (!online) return null
  if (!user) return null

  const sameUser = snippet && user.uid === snippet.userId

  // TODO move this to Editor
  function saveSnippet() {
    if (loading || !user) {
      return
    }

    if (!snippet) {
      update(undefined, state).then(newSnippet => {
        if (newSnippet && newSnippet.id) {
          setSnippet(newSnippet)
          setToasts({
            type: 'ADD',
            toast: { children: 'Snippet saved!', closable: true },
          })
        }
      })
    } else if (sameUser) {
      update(snippet.id, state).then(() => {
        setToasts({
          type: 'ADD',
          toast: { children: 'Snippet saved!', closable: true },
        })
      })
    }
  }

  return (
    <Toolbar
      style={{
        position: 'relative',
        zIndex: 1,
        marginTop: 16,
        marginBottom: 0,
        flexDirection: 'row-reverse',
        alignItems: 'center',
      }}
    >
      <div className="flex">
        <SaveButton loading={loading} onClick={saveSnippet} />
        <Button
          title="Save menu dropdown"
          border
          large
          center
          color={COLORS.GREEN}
          padding="0 8px"
          margin="0 8px 0 -1px"
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
      </div>
      <div style={{ marginRight: 'auto' }}>
        <Input
          align="left"
          placeholder="Add a name…"
          fontSize="14px"
          value={props.name}
          onChange={e => props.onChange('name', e.target.value)}
        />
      </div>
      <Popout hidden={!isVisible} borderColor={COLORS.GREEN} pointerRight="6px" style={popoutStyle}>
        <div className="menu flex">
          <DuplicateButton onClick={props.onCreate} />
          {sameUser && <DeleteButton onClick={props.onDelete} />}
        </div>
      </Popout>
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
