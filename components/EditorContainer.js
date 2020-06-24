// Theirs
import React from 'react'
import Router from 'next/router'
import { useAsyncCallback } from 'actionsack'

import Editor from './Editor'
import Toasts from './Toasts'
import { useAPI } from './ApiContext'
import { useAuth } from './AuthContext'

import { THEMES } from '../lib/constants'
import { updateRouteState } from '../lib/routing'
import { getThemes, saveThemes, clearSettings, saveSettings } from '../lib/util'

function onReset() {
  clearSettings()
  updateRouteState(Router, {})

  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister()
      })
    })
  }
}

function toastsReducer(curr, action) {
  switch (action.type) {
    case 'ADD': {
      if (!curr.find(t => t.children === action.toast.children)) {
        return curr.concat(action.toast)
      }
      return curr
    }
    case 'SET': {
      return action.toasts
    }
  }
  throw new Error('Unsupported action')
}

function EditorContainer(props) {
  const [themes, updateThemes] = React.useState(THEMES)
  const api = useAPI()
  const user = useAuth()
  const [update, { loading }] = useAsyncCallback(api.snippet.update)

  React.useEffect(() => {
    const storedThemes = getThemes(localStorage) || []
    if (storedThemes) {
      updateThemes(currentThemes => [...storedThemes, ...currentThemes])
    }
  }, [])

  React.useEffect(() => {
    saveThemes(themes.filter(({ custom }) => custom))
  }, [themes])

  // XXX use context
  const [snippet, setSnippet] = React.useState(props.snippet || null)
  const [toasts, setToasts] = React.useReducer(toastsReducer, [])

  const snippetId = snippet && snippet.id
  React.useEffect(() => {
    if ('/' + (snippetId || '') === props.router.asPath) {
      return
    }
    window.history.pushState(null, null, '/' + (snippetId || ''))
    // props.router.replace(props.router.asPath, '/' + (snippetId || ''), { shallow: true })
  }, [snippetId, props.router])

  function onEditorUpdate(state) {
    if (loading) {
      return
    }

    if (!user) {
      updateRouteState(props.router, state)
      saveSettings(state)
    } else {
      const updates = state
      if (!snippet) {
        update(snippetId, updates).then(newSnippet => {
          if (newSnippet && newSnippet.id) {
            setSnippet(newSnippet)
            setToasts({
              type: 'ADD',
              toast: { children: 'Snippet saved!', closable: true },
            })
          }
        })
      } else if (snippet.userId === user.uid) {
        update(snippetId, updates).then(() => {
          setToasts({
            type: 'ADD',
            toast: { children: 'Snippet saved!', closable: true },
          })
        })
      }
    }
  }

  return (
    <>
      <Toasts toasts={toasts} />
      <Editor
        {...props}
        themes={themes}
        updateThemes={updateThemes}
        snippet={snippet}
        setSnippet={setSnippet}
        setToasts={setToasts}
        onUpdate={onEditorUpdate}
        onReset={onReset}
      />
    </>
  )
}

export default EditorContainer
