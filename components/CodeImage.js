import { EOL } from 'os'
import React from 'react'
import domtoimage from 'dom-to-image'
import CodeMirror from 'react-codemirror'
import WindowControls from '../components/svg/Controls'

// hack to only call modes on browser
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('../lib/constants')
}

const DEFAULT_SETTINGS = {
  paddingVertical: '50px',
  paddingHorizontal: '50px',
  marginVertical: '45px',
  marginHorizontal: '45px',
  background: '#fed0ec',
  theme: 'dracula',
  language: 'javascript'
}

const CodeImage = (props) => {
  const config = Object.assign(DEFAULT_SETTINGS, props.config)

  const options = {
    lineNumbers: false,
    mode: config.language,
    theme: config.theme,
    scrollBarStyle: null,
    viewportMargin: Infinity,
    lineWrapping: true
  }

  // create styles
  const containerStyle = {
    background: config.background,
    padding: `${config.paddingVertical} ${config.paddingHorizontal}`,
    paddingTop: `calc(${config.paddingVertical} - 19px)` // TODO fix hack: accomodates for space taken up by window controls
  }

  return (
    <div id="section">
      <div id="container" style={containerStyle}>
        { true ? <WindowControls /> : null }
        <CodeMirror className="CodeMirrorContainer" value={props.children} options={options} />
      </div>
      <style jsx>{`
        #section {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default CodeImage
