import Morph from 'morphmorph'
import url from 'url'

import { escapeHtml } from './util'

const URL_LIMIT = 4e3
const mapper = new Morph({
  types: {
    bool: v => {
      if (v == null) return undefined
      if (v === 'false') return false
      return Boolean(v)
    },
    int: v => {
      const integer = parseInt(v)
      if (isNaN(integer)) return undefined
      return integer
    },
    intArray: v => {
      if (v == null) return undefined
      return v
        .split(',')
        .filter(i => !isNaN(i))
        .map(i => parseInt(i))
    },
    parse: v => {
      try {
        const x = JSON.parse(v)
        return x
      } catch (e) {
        return v
      }
    },
    decode: v => {
      if (v == null) return undefined
      try {
        return decodeURIComponent(v)
      } catch (e) {
        return v
      }
    },
    encode: v => {
      if (v == null) return undefined
      try {
        const encoded = encodeURIComponent(v)
        if (encoded.length > URL_LIMIT) {
          // soft prevent URL length limit errors https://github.com/carbon-app/carbon/issues/829
          return encodeURIComponent(v.slice(0, URL_LIMIT / 2))
        }
        return encoded
      } catch (e) {
        return v
      }
    },
  },
})

const readMappings = [
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
  { field: 'fl:firstLineNumber', type: 'int' },
  { field: 'fm:fontFamily' },
  { field: 'fs:fontSize' },
  { field: 'lh:lineHeight' },
  { field: 'si:squaredImage', type: 'bool' },
  { field: 'es:exportSize' },
  { field: 'wm:watermark', type: 'bool' },
  { field: 'sl:selectedLines', type: 'intArray' },
  { field: 'copy', type: 'bool' },
  { field: 'readonly', type: 'bool' },
  { field: 'id' },
  { field: 'highlights', type: 'parse' },
  { field: 'code', type: 'decode' },
]

const writeMappings = [
  { field: 'backgroundColor:bg' },
  { field: 'theme:t' },
  { field: 'windowTheme:wt' },
  { field: 'language:l' },
  { field: 'dropShadow:ds', type: 'bool' },
  { field: 'dropShadowOffsetY:dsyoff' },
  { field: 'dropShadowBlurRadius:dsblur' },
  { field: 'windowControls:wc', type: 'bool' },
  { field: 'widthAdjustment:wa', type: 'bool' },
  { field: 'paddingVertical:pv' },
  { field: 'paddingHorizontal:ph' },
  { field: 'lineNumbers:ln', type: 'bool' },
  { field: 'firstLineNumber:fl', type: 'int' },
  { field: 'fontFamily:fm' },
  { field: 'fontSize:fs' },
  { field: 'lineHeight:lh' },
  { field: 'squaredImage:si', type: 'bool' },
  { field: 'exportSize:es' },
  { field: 'watermark:wm', type: 'bool' },
  { field: 'code', type: 'encode' },
]

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

const getQueryStringObject = query => {
  if (query.state) {
    return deserializeState(query.state)
  }

  const state = mapper.map(readMappings, query)

  Object.keys(state).forEach(key => {
    if (state[key] === '') state[key] = undefined
  })

  return state
}

function getQueryStringState(query) {
  const queryParams = getQueryStringObject(query)
  return Object.keys(queryParams).length ? queryParams : {}
}

function fixAsPathEncoding(asPath) {
  try {
    return url.parse(asPath, true)
  } catch (e) {
    return url.parse(encodeURI(asPath), true)
  }
}

export const getRouteState = router => {
  const { asPath = '' } = router
  const { query, pathname } = fixAsPathEncoding(asPath)
  const queryState = getQueryStringState(query)
  const path = escapeHtml(
    pathname
      // remove trailing slash
      .replace(/\/$/, '')
      .split('/')
      .pop()
  )

  const parameter = path.length >= 19 && path.indexOf('.') < 0 ? path : null

  return {
    parameter,
    queryState,
  }
}

export const updateRouteState = (router, state) => {
  const mappedState = mapper.map(writeMappings, state)
  // calls `encodeURIComponent` on each key internally
  // const query = qs.stringify(mappedState)

  router.replace(
    {
      pathname: router.pathname,
    },
    {
      pathname: router.pathname,
      query: mappedState,
    },
    { shallow: true, scroll: false }
  )
}
