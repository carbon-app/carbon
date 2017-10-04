import morph from 'morphmorph'
const KEY = 'CARBON_STATE'

const assign = morph.assign(KEY)

const parse = v => {
  try {
    return JSON.parse(v)
  } catch (e) {}
}

export const getState = morph.compose(parse, morph.get(KEY))
export const saveState = (storage, v) => assign(storage, JSON.stringify(v))

export const memoizeFirst = fn => {
  const set = new Set()
  return (key, ...rest) => {
    if (set.has(key)) return
    set.add(key)
    return fn(key, ...rest)
  }
}
