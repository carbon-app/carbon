// Theirs
import React from 'react'

import Editor from './Editor'
import { THEMES } from '../lib/constants'
import { getThemes, saveThemes } from '../lib/util'

function EditorContainer(props) {
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
