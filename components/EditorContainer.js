// Theirs
import React from 'react'

import Editor from './Editor'
import Toasts from './Toasts'
import { THEMES, DEFAULT_CODE } from '../lib/constants'
import { updateRouteState } from '../lib/routing'
import { getThemes, saveThemes, clearSettings, saveSettings } from '../lib/util'

import { useAPI } from './ApiContext'
import { useAuth } from './AuthContext'
import { useAsyncCallback } from '@dawnlabs/tacklebox'

function pushToast(toast) {
  return curr => {
    if (!curr.find(t => t.children === toast.children)) {
      return curr.concat(toast)
    }
    return curr
  }
}

function onReset() {
  clearSettings()

  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister()
      }
    })
  }
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
  // TODO use useReducer
  const [toasts, setToasts] = React.useState([])

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
      const updates = {
        ...state,
        code: state.code != null ? state.code : DEFAULT_CODE
      }
      if (!snippet) {
        update(snippetId, updates).then(newSnippet => {
          if (newSnippet && newSnippet.id) {
            setSnippet(newSnippet)
            setToasts(pushToast({ children: 'Snippet saved!', closable: true }))
          }
        })
      } else if (snippet.userId === user.uid) {
        update(snippetId, updates).then(() => {
          setToasts(pushToast({ children: 'Snippet saved!', closable: true }))
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
