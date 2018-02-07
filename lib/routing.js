import Morph from 'morphmorph'

let createHistory
let history
if (typeof window !== 'undefined') {
  createHistory = require('history').createBrowserHistory
  history = createHistory()
}

const mapper = new Morph({
  types: {
    bool: v => {
      if (v == null) return undefined
      if (v === 'false') return false
      return Boolean(v)
    }
  }
})

const mappings = [
  { field: 'bg:backgroundColor' },
  { field: 't:theme' },
  { field: 'l:language' },
  { field: 'ds:dropShadow', type: 'bool' },
  { field: 'wc:windowControls', type: 'bool' },
  { field: 'wa:widthAdjustment', type: 'bool' },
  { field: 'pv:paddingVertical' },
  { field: 'ph:paddingHorizontal' },
  { field: 'ln:lineNumbers', type: 'bool' },
  { field: 'code:code' }
]

const reverseMappings = mappings.map(mapping =>
  Object.assign({}, mapping, {
    field: mapping.field
      .split(':')
      .reverse()
      .join(':')
  })
)

const keysToQuery = keys =>
  `?${Object.keys(keys)
    .map(key => `${key}=${keys[key]}`)
    .join('&')}`

export const getQueryStringState = query => {
  const state = mapper.map(mappings, query)

  Object.keys(state).forEach(key => {
    if (state[key] === '') state[key] = undefined
  })

  return state
}

export const updateQueryString = state =>
  history.replace({
    search: encodeURI(keysToQuery(mapper.map(reverseMappings, state)))
  })
