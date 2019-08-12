// Theirs
import React from 'react'
import ReactGA from 'react-ga'

import Editor from './Editor'
import { THEMES, GA_TRACKING_ID } from '../lib/constants'
import { getThemes, saveThemes } from '../lib/util'

function useAppInstallationsListener() {
  React.useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID)

    // if (window.clearbit && window.clearbit.company) {
    //   ReactGA.event({
    //     category: 'Analytics',
    //     action: 'Company found',
    //     label: window.clearbit.company.name,
    //     nonInteraction: true
    //   })
    // }

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

  return <Editor {...props} themes={themes} updateThemes={updateThemes} />
}

export default EditorContainer
