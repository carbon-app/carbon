import Morph from 'morphmorph'

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
  { field: 'ts:timestamp', type: 'bool' },
  { field: 'copy', type: 'bool' },
  { field: 'readonly', type: 'bool' }
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
  const stateString = encodeURIComponent(JSON.stringify(state))

  return encodeURIComponent(
    typeof window !== 'undefined' ? btoa(stateString) : Buffer.from(stateString).toString('base64')
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

export const updateQueryString = (router, state) => {
  const mappedState = mapper.map(reverseMappings, state)
  serializeCode(mappedState)

  router.replace(
    {
      pathname: router.pathname
    },
    {
      pathname: router.pathname,
      query: mappedState
    },
    { shallow: true }
  )
}

// private
function serializeCode(state) {
  try {
    if (state.code) state.code = encodeURIComponent(state.code)
  } catch (e) {
    // encoding errors should not crash the app
  }
}

function deserializeCode(state) {
  try {
    if (state.code) state.code = decodeURIComponent(state.code)
  } catch (e) {
    // decoding errors should not crash the app
  }
}
