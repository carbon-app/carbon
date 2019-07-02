// Theirs
import React from 'react'
import ReactGA from 'react-ga'

import Editor from './Editor'
import { THEMES, GA_TRACKING_ID } from '../lib/constants'
import { getThemes, saveThemes } from '../lib/util'

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

  const snippetId = snippet && snippet.snippetId
  React.useEffect(() => {
    props.router.push('/', '/' + snippetId || '', { shallow: true })
  }, [snippetId, props.router])

  return (
    <Editor
      {...props}
      themes={themes}
      updateThemes={updateThemes}
      snippet={snippet}
      setSnippet={setSnippet}
    />
  )
}

export default EditorContainer
