import { EOL } from 'os'
import React from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'
import domtoimage from 'dom-to-image'

const margin = '45px 54px'

const DEFAULT_CODE = `
const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}`

const MAX_LINES = 40

class CodeImage extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    let code = this.state.droppedContent || this.props.children || DEFAULT_CODE
    const split = code.split(EOL)
    if (split.length > MAX_LINES) code = [...split.slice(0, MAX_LINES - 1), '', '...'].join(EOL)

    return this.props.connectDropTarget(
      <div id='section'>
        <div id='container' style={Object.assign({ background: this.props.bg }, this.props.style)}>
          <pre className='hyper'>
            <code>{code}</code>
          </pre>
        </div>
        <style jsx>{`
          #section {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #container {
            height: 100%;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .hyper {
            border: 1px solid #393939;
            border-radius: 5px;
            background: black;
            padding: 18px 24px;
            margin: ${margin}
            color: white;

          }

          .bw {}
        `}</style>
      </div>
    )
  }
}

const drop = (props, monitor, component) => {
  const bundle = monitor.getItem()
  const file = bundle.files[0]
  const reader = new FileReader()
  reader.onload = function(event) {
    component.setState({
      droppedContent: event.target.result
    })
  };
  reader.readAsText(file, "UTF-8");
}

export default DropTarget(NativeTypes.FILE, { drop }, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem()
}))(CodeImage)
