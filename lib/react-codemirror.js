// For SSR, CodeMirror will throw an error, so return a div instead
let CodeMirror = 'div'
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  CodeMirror = require('react-codemirror2').default
}
export default CodeMirror
