let CodeMirrorWrapper
if (typeof document === 'undefined') {
  // server context, loading codemirror will cause error, so return a dummy component
  CodeMirrorWrapper = () => <></>
} else {
  // client context, load the component with require, so it is synchronous
  CodeMirrorWrapper = require('react-codemirror2').Controlled
}
export default CodeMirrorWrapper