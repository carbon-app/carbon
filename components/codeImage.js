import React from 'react'
import domtoimage from 'dom-to-image'

const padding = '50px 50px'

class CodeImage extends React.Component {
  constructor () {
    super()
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

  render () {
    return (
      <div id='section'>
        <div id='container' ref={(container) => { this.container = container }}>
          <pre>
            <code onClick={this.save}>
              {this.props.children}
            </code>
          </pre>
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
            display: flex;
            justify-content: center;
            align-items: center;
          }
          pre {
            background: white;
            padding: 10px;
            box-shadow: 10px 10px 12px -5px rgba(0,0,0,0.17);
          }
        `}</style>
      </div>
    )
  }
}

export default CodeImage
