import morph from 'morphmorph'
const KEY = 'CARBON_STATE'

const assign = morph.assign(KEY)

const parse = v => {
  try {
    return JSON.parse(v)
  } catch (e) {}
}

export const getState = morph.compose(parse, morph.get(KEY))
export const saveState = (window, v) => assign(window, JSON.stringify(v))

export const defaults = (value, defaultValue) => {
  if (typeof value === 'undefined') {
    return defaultValue
  }

  return value
}

const asBoolean = value => (value ? value === 'true' : true)
const identity = value => value

export const queryToProps = function(query) {
  const mappings = {
    bg: {
      key: 'background',
      transform: value => (value.startsWith('#') ? value : `#${value}`)
    },
    theme: 'theme',
    lang: 'language',
    shadow: {
      key: 'dropShadow',
      transform: asBoolean
    },
    wc: {
      key: 'windowControls',
      transform: asBoolean
    },
    vp: 'paddingVertical',
    hp: 'paddingHorizontal'
  }

  const props = Object.keys(query).reduce((settings, key) => {
    let propMapping = mappings[key]

    if (!propMapping) {
      return settings
    }

    if (typeof propMapping === 'string') {
      propMapping = { key: propMapping, transform: identity }
    }

    const propKey = propMapping.key
    const value = propMapping.transform(query[key])

    return Object.assign(settings, { [propKey]: value })
  }, {})

  return props
}
