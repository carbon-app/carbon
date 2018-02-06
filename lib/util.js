import morph from 'morphmorph'
const KEY = 'CARBON_STATE'

const assign = morph.assign(KEY)

const parse = v => {
  try {
    return JSON.parse(v)
  } catch (e) {}
}

const escapeHtml = s => {
  if (typeof s === 'string') {
    return s
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\//g, '&#x2F;')
  }
}

export const parseRGBA = obj => `rgba(${obj.r},${obj.g},${obj.b},${obj.a})`

export const getState = morph.compose(parse, escapeHtml, morph.get(KEY))
export const saveState = (window, v) => assign(window, JSON.stringify(v))

export const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1)
