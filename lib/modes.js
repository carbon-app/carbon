import { LANGUAGES } from './constants'

export default alreadyLoaded => {
  LANGUAGES.filter(language => language.mode !== 'auto' && language.mode !== 'text').forEach(
    language => {
      if (language.mode && !alreadyLoaded.has(language.mode)) {
        alreadyLoaded.add(language.mode)
        language.custom
          ? require(`./custom/modes/${language.mode}`)
          : require(`codemirror/mode/${language.mode}/${language.mode}`)
      }
    }
  )
}
