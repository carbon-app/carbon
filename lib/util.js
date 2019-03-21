import morph from 'morphmorph'
import omitBy from 'lodash.omitby'
import { unescape } from 'escape-goat'

const SETTINGS_KEY = 'CARBON_STATE'
const PRESETS_KEY = 'CARBON_PRESETS'
const THEMES_KEY = 'CARBON_THEMES'

const createAssigner = key => {
  const assign = morph.assign(key)

  return (window, v) => assign(window, JSON.stringify(v))
}

export const saveSettings = createAssigner(SETTINGS_KEY)
export const savePresets = createAssigner(PRESETS_KEY)
export const saveThemes = createAssigner(THEMES_KEY)

const parse = v => {
  try {
    return JSON.parse(v)
  } catch (e) {
    // pass
  }
}

export const toggle = stateField => state => ({ [stateField]: !state[stateField] })

// https://gist.github.com/alexgibson/1704515
// TODO use https://github.com/sindresorhus/escape-goat/
export const escapeHtml = s => {
  if (typeof s === 'string') {
    return s
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\//g, '&#x2F;')
  }
}

export const unescapeHtml = s => {
  if (typeof s === 'string') {
    return unescape(s).replace(/&#x2F;/g, '/')
  }
}

export const getSettings = morph.compose(
  parse,
  escapeHtml,
  morph.get(SETTINGS_KEY)
)

export const getPresets = morph.compose(
  parse,
  morph.get(PRESETS_KEY)
)

export const getThemes = morph.compose(
  parse,
  morph.get(THEMES_KEY)
)

export const clearSettings = () => localStorage.removeItem(SETTINGS_KEY)

export const fileToDataURL = blob =>
  new Promise(res => {
    const reader = new FileReader()
    reader.onload = e => res(e.target.result)
    reader.readAsDataURL(blob)
  })

export const formatCode = async code => {
  const prettier = await import('prettier/standalone')
  const babylonParser = await import('prettier/parser-babylon')

  return prettier.format(code, {
    parser: 'babylon',
    plugins: [babylonParser],
    semi: false,
    singleQuote: true
  })
}

export const omit = (object, keys) => omitBy(object, (_, k) => keys.indexOf(k) > -1)

export const stringifyRGBA = obj => `rgba(${obj.r},${obj.g},${obj.b},${obj.a})`

export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)

export const generateId = () =>
  Math.random()
    .toString(36)
    .slice(2)
