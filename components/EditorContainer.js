// Theirs
import React from 'react'
import Router from 'next/router'

import Editor from './Editor'
import Toasts from './Toasts'
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
      return curr.concat(action.toast)
    }
    case 'SET': {
      return action.toasts
    }
  }
  throw new Error('Unsupported action')
}

function EditorContainer(props) {
  const [themes, updateThemes] = React.useState(THEMES)
  const user = useAuth()

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
  // TODO update this reducer to only take one action
  const [toasts, setToasts] = React.useReducer(toastsReducer, [])

  const snippetId = snippet && snippet.id
  React.useEffect(() => {
    const snippetPath = '/' + (snippetId || '')
    if (snippetPath === props.router.asPath) {
      return
    }
    
    // Reloads only if the snipped.id is different from before. Otherwise returns from above.
    props.router.push(
      {
        pathname: '/[id]',
        query: { id: snippetId },
      }, 
      snippetPath, 
      { 
        shallow: true,
        scroll: false 
      }
    )
  }, [snippetId, props.router])

  function onEditorUpdate(state) {
    if (user) {
      return
    }
    updateRouteState(props.router, state)
    saveSettings(state)
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
