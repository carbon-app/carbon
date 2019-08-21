// Theirs
import React from 'react'
import ReactGA from 'react-ga'

import Editor from './Editor'
import Toasts from './Toasts'
import { GA_TRACKING_ID, THEMES } from '../lib/constants'
import { updateRouteState } from '../lib/routing'
import { getThemes, saveThemes, clearSettings, saveSettings } from '../lib/util'

import { useAPI } from './ApiContext'
import { useAuth } from './AuthContext'
import { useAsyncCallback } from '@dawnlabs/tacklebox'

function onReset() {
  clearSettings()

  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister()
      })
    })
  }
}

function useAppInstallationsListener() {
  React.useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID)

    function onInstall() {
      ReactGA.event({
        category: 'Analytics',
        action: 'App Install',
        nonInteraction: true
      })
    }

    window.addEventListener('appinstalled', onInstall)
    return () => window.removeEventListener('appinstalled', onInstall)
  }, [])
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
  useAppInstallationsListener()
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
    props.router.replace('/', '/' + (snippetId || ''), { shallow: true })
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
              toast: { children: 'Snippet saved!', closable: true }
            })
          }
        })
      } else if (snippet.userId === user.uid) {
        update(snippetId, updates).then(() => {
          setToasts({
            type: 'ADD',
            toast: { children: 'Snippet saved!', closable: true }
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
