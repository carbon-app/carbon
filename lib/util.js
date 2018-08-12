import morph from 'morphmorph'
import prettier from 'prettier/standalone'
import babylonParser from 'prettier/parser-babylon'

const KEY = 'CARBON_STATE'

const assign = morph.assign(KEY)

const parse = v => {
  try {
    return JSON.parse(v)
  } catch (e) {
    // pass
  }
}

export const escapeHtml = s => {
  if (typeof s === 'string') {
    return s
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\//g, '&#x2F;')
  }
}

export const parseRGBA = obj => `rgba(${obj.r},${obj.g},${obj.b},${obj.a})`

export const getState = morph.compose(
  parse,
  escapeHtml,
  morph.get(KEY)
)
export const saveState = (window, v) => assign(window, JSON.stringify(v))

export const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1)

export const range = n => [...Array(n).keys()]

export const fileToDataURL = blob =>
  new Promise(res => {
    const reader = new FileReader()
    reader.onload = e => res(e.target.result)
    reader.readAsDataURL(blob)
  })

export const formatCode = code =>
  prettier.format(code, {
    parser: 'babylon',
    plugins: [babylonParser]
  })
