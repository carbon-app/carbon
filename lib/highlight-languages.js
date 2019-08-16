import { LANGUAGES } from './constants'

export default LANGUAGES.filter(l => l.highlight)
  .map(l => l.short || l.mode)
  .map(lang => [lang, require(`highlight.js/lib/languages/${lang}`)])
