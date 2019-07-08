// Theirs
import React from 'react'
import ReactGA from 'react-ga'

import Editor from './Editor'
import { THEMES, DEFAULT_CODE, GA_TRACKING_ID } from '../lib/constants'
import { updateRouteState } from '../lib/routing'
import { getThemes, saveThemes, clearSettings, saveSettings, omit } from '../lib/util'

import { useAPI } from './ApiContext'
import { useAuth } from './AuthContext'
import { useAsyncCallback } from '@dawnlabs/tacklebox'

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

function useAppInstallationsListener() {
  React.useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID)

    function onInstall() {
      ReactGA.event({
        category: 'App',
        action: 'Install'
      })
    }

    window.addEventListener('appinstalled', onInstall)
    return () => window.removeEventListener('appinstalled', onInstall)
  }, [])
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
    saveThemes(localStorage, themes.filter(({ custom }) => custom))
  }, [themes])

  // XXX use context
  const [snippet, setSnippet] = React.useState(null)

  const snippetId = snippet && snippet.id
  React.useEffect(() => {
    props.router.push('/', '/' + (snippetId || ''), { shallow: true })
  }, [snippetId, props.router])

  // TODO use ref?
  function onEditorUpdate(state) {
    if (loading) {
      return
    }

    if (!user) {
      updateRouteState(props.router, state)
      saveSettings(
        localStorage,
        omit(state, [
          'code',
          'backgroundImage',
          'backgroundImageSelection',
          'themes',
          'highlights',
          'fontUrl'
        ])
      )
    } else {
      const updates = {
        ...state,
        code: state.code != null ? state.code : DEFAULT_CODE
      }
      if (!snippet) {
        update(snippetId, updates).then(newSnippet => {
          if (newSnippet && newSnippet.id) {
            setSnippet(newSnippet)
          }
        })
      } else if (snippet.userId === user.uid) {
        update(snippetId, updates)
      }
    }
  }

  return (
    <Editor
      {...props}
      themes={themes}
      updateThemes={updateThemes}
      snippet={snippet}
      setSnippet={setSnippet}
      onUpdate={onEditorUpdate}
      onReset={onReset}
    />
  )
}

export default EditorContainer
