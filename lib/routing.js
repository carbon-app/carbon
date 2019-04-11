import Morph from 'morphmorph'
import url from 'url'

import { escapeHtml } from './util'

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
  { field: 'copy', type: 'bool' },
  { field: 'readonly', type: 'bool' },
  { field: 'id' },
  { field: 'highlights' }
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

export const getRouteState = router => {
  const { asPath = '' } = router
  const { query, pathname } = url.parse(asPath, true)
  const queryState = getQueryStringState(query)
  const path = escapeHtml(pathname.split('/').pop())
  // TODO fix this hack
  const parameter = path.length >= 19 && path.indexOf('.') === -1 && path

  return {
    parameter,
    queryState
  }
}

export const updateRouteState = (router, state) => {
  const mappedState = mapper.map(reverseMappings, state)
  serializeCode(mappedState)
  // calls `encodeURIComponent` on each key internally
  // const query = qs.stringify(mappedState)

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
const getQueryStringObject = query => {
  if (query.state) {
    return deserializeState(query.state)
  }

  const state = mapper.map(mappings, query)

  deserializeHighlights(state)
  deserializeCode(state)

  Object.keys(state).forEach(key => {
    if (state[key] === '') state[key] = undefined
  })

  return state
}

function getQueryStringState(query) {
  const queryParams = getQueryStringObject(query)
  return Object.keys(queryParams).length ? queryParams : {}
}

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

function deserializeHighlights(state) {
  try {
    if (state.highlights) state.highlights = JSON.parse(state.highlights)
  } catch (e) {
    // parsing errors should not crash the app
  }
}
