import { EOL } from 'os'
import React from 'react'
import domtoimage from 'dom-to-image'
import CodeMirror from 'react-codemirror'
import WindowControls from '../components/svg/Controls'
import Spinner from 'react-spinner'

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

 class CodeImage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  render () {
    const config = Object.assign(DEFAULT_SETTINGS, this.props.config)

    const options = {
      lineNumbers: false,
      mode: config.language,
      theme: config.theme,
      scrollBarStyle: null,
      viewportMargin: Infinity,
      lineWrapping: true
    }

    const containerStyle = {
      background: config.background,
      padding: `${config.paddingVertical} ${config.paddingHorizontal}`
    }
    
    // set content to spinner if loading, else editor
    let content = (
      <div>
        <Spinner />
        <style jsx>{`
          div {
            width: 680px;
            height: 500px;
          }
        `}
        </style>
      </div>
    )
    if (this.state.loading === false) {
      content = (
        <div id="container" style={containerStyle}>
          <CodeMirror className="CodeMirrorContainer" value={this.props.children} options={options} />
        </div>
      )
    }

    return (
      <div id="section">
        { content }
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
}

export default CodeImage
