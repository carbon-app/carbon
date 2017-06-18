import { EOL } from 'os'
import React from 'react'
import domtoimage from 'dom-to-image'
import CodeMirror from 'react-codemirror'

// hack to only call modes on browser
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/xml/xml');
  require('codemirror/mode/markdown/markdown');
}

const padding = '50px 50px'

class CodeImage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      code: this.props.children
    }
    
    this.save = this.save.bind(this)
  }

  save () {
    // save
    domtoimage.toJpeg(this.container)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.jpeg'
        link.href = dataUrl
        link.click()
      })
  }

  updateCode (newCode) {
    this.setState({ code: newCode })
  }

  render () {
    const options = { lineNumbers: false, mode: 'javascript' }

    return (
      <div id='section'>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/codemirror.min.css'/>
        <div id='container' ref={(container) => { this.container = container }}>
         <div id='anotherContainer'>
           <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
         </div>
        </div>
        <style jsx>{`
          #section {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #container {
            background: green;
            padding: ${padding};
           
          }
          #anotherContainer {
            background: white;
            min-width: 700px;
            min-height: 400px;
            margin: 0px;
            padding: 15px;
          }
        `}</style>
      </div>
    )
  }
}

export default CodeImage