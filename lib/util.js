import morph from 'morphmorph'
const KEY = 'CARBON_STATE'

const assign = morph.assign(KEY)

const parse = v => {
  try {
    return JSON.parse(v)
  } catch (e) {}
}

export const parseRGBA = obj => `rgba(${obj.r},${obj.g},${obj.b},${obj.a})`

export const getState = morph.compose(parse, morph.get(KEY))
export const saveState = (window, v) => assign(window, JSON.stringify(v))
