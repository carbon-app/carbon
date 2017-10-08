let createHistory
let history
if (typeof window !== 'undefined') {
  createHistory = require('history').createBrowserHistory
  history = createHistory()
}

export const mappings = [
  'bg:background',
  't:theme',
  'l:language',
  'ds:dropShadow',
  'wc:windowControls',
  'wa:widthAdjustment',
  'pv:paddingVertical',
  'ph:paddingHorizontal',
  'code:code'
]

export const reverseMappings = mappings.map(field =>
  field
    .split(':')
    .reverse()
    .join(':')
)

const keysToQuery = keys =>
  `?${Object.keys(keys)
    .map(key => `${key}=${keys[key]}`)
    .join('&')}`

export const replaceQuery = mappedState =>
  history.replace({
    search: keysToQuery(mappedState)
  })
