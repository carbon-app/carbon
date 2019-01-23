import { LANGUAGES } from './constants'

const modes = LANGUAGES.filter(
  language =>
    language.mode &&
    language.mode !== 'auto' &&
    language.mode !== 'text' &&
    language.mode !== 'javascript'
).forEach(language =>
  language.custom
    ? require(`./custom/modes/${language.mode}`)
    : require(`codemirror/mode/${language.mode}/${language.mode}`)
)

export default modes
