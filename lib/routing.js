import Morph from 'morphmorph'

let createHistory
let history
if (typeof window !== 'undefined') {
  createHistory = require('history').createBrowserHistory
  history = createHistory()
}

const mapper = new Morph()

const mappings = [
  'bg:background',
  't:theme',
  'l:language',
  'ds:dropShadow',
  'wc:windowControls',
  'wa:widthAdjustment',
  'pv:paddingVertical',
  'ph:paddingHorizontal',
  'ln:lineNumbers',
  'code:code'
]

const reverseMappings = mappings.map(field =>
  field
    .split(':')
    .reverse()
    .join(':')
)

const keysToQuery = keys =>
  `?${Object.keys(keys)
    .map(key => `${key}=${keys[key]}`)
    .join('&')}`

export const getQueryStringState = query => mapper.map(mappings, query)
export const updateQueryString = state =>
  history.replace({
    search: keysToQuery(mapper.map(reverseMappings, state))
  })
