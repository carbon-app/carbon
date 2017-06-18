import { EOL } from 'os'
import React from 'react'
import domtoimage from 'dom-to-image'
import CodeMirror from 'react-codemirror'
import WindowControls from '../components/svg/controls'

// hack to only call modes on browser
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/xml/xml');
  require('codemirror/mode/markdown/markdown');
}

const margin = '45px 54px'
const padding = '50px 50px'

class CodeImage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      code: this.props.children
    }
  }

  updateCode (newCode) {
    this.setState({ code: newCode })
  }

  render () {
    const options = { lineNumbers: false, mode: 'javascript' }

    return (
      <div id='section'>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/codemirror.min.css'/>
        <div id='container' style={Object.assign({ background: this.props.bg }, this.props.style)}>
          <div className="window-controls">
            <WindowControls />
          </div>
          <div id='anotherContainer'>
            <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
          </div>
        </div>
        <style jsx>{`
          #section {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #anotherContainer {
            background: white;
            min-width: 700px;
            min-height: 400px;
            margin: 0px;
            padding: 15px;
            height: 100%;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .window-controls {
            position: absolute;
            margin-left: -2px;
            margin-top: -14px;
          }

          .hyper {
            border: 1px solid #393939;
            border-radius: 5px;
            background: black;
            padding: 26px 18px;
            margin: ${margin}
            color: white;
          }

          .bw {}
        `}</style>
      </div>
    )
  }
}

export default CodeImage
