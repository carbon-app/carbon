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
  { field: 'wt:windowTheme' },
  { field: 'l:language' },
  { field: 'ds:dropShadow', type: 'bool' },
  { field: 'dsyoff:dropShadowOffsetY' },
  { field: 'dsblur:dropShadowBlurRadius' },
  { field: 'wc:windowControls', type: 'bool' },
  { field: 'wa:widthAdjustment', type: 'bool' },
  { field: 'pv:paddingVertical' },
  { field: 'ph:paddingHorizontal' },
  { field: 'ln:lineNumbers', type: 'bool' },
  { field: 'fm:fontFamily' },
  { field: 'fs:fontSize' },
  { field: 'lh:lineHeight' },
  { field: 'si:squaredImage', type: 'bool' },
  { field: 'code:code' },
  { field: 'es:exportSize' },
  { field: 'wm:watermark', type: 'bool' },
  { field: 'ts:timestamp', type: 'bool' }
]

const reverseMappings = mappings.map(mapping =>
  Object.assign({}, mapping, {
    field: mapping.field
      .split(':')
      .reverse()
      .join(':')
  })
)

export const serializeState = state => {
  const stateString = JSON.stringify(state)

  return encodeURIComponent(
    typeof window !== 'undefined'
      ? btoa(stateString)
      : Buffer.from(stateString).toString('base64')
  )
}

export const deserializeState = serializedState => {
  let stateString
  if (typeof window !== 'undefined') {
    stateString = atob(serializedState)
  } else {
    stateString = Buffer.from(serializedState, 'base64').toString()
  }

  return JSON.parse(decodeURIComponent(stateString))
}

const keysToQuery = keys =>
  `?${Object.keys(keys)
    .map(key => `${key}=${keys[key]}`)
    .join('&')}`

export const getQueryStringState = query => {
  if (query.state) {
    return deserializeState(query.state)
  }

  const state = mapper.map(mappings, query)
  deserializeCode(state)

  Object.keys(state).forEach(key => {
    if (state[key] === '') state[key] = undefined
  })

  return state
}

export const updateQueryString = state => {
  if (history.location.search.indexOf('react_perf') < 0) {
    const mappedState = mapper.map(reverseMappings, state)
    serializeCode(mappedState)

    history.replace({
      search: encodeURI(keysToQuery(mappedState))
    })
  }
}

// private
function serializeCode(state) {
  if (state.code) state.code = encodeURIComponent(state.code)
}

function deserializeCode(state) {
  if (state.code) state.code = decodeURIComponent(state.code)
}
