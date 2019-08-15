import { HIGHLIGHT_LANGUAGES } from './constants'

export default HIGHLIGHT_LANGUAGES.map(lang => [
  lang,
  require(`highlight.js/lib/languages/${lang}`)
])
