// react-codemirror2 treats `typeof navigator === 'undefined'` as "running on the server".
// Node 21+ defines a global `navigator`, so on the server it would load CodeMirror,
// which crashes with "document is not defined". This flag is react-codemirror2's
// built-in way to force server mode. It must be imported before react-codemirror2.
if (typeof window === 'undefined') {
  global.PREVENT_CODEMIRROR_RENDER = true
}
