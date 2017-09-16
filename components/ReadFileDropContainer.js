import React from 'react'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

const spec = {
  drop (props, monitor) {
    const bundle = monitor.getItem()
    const file = bundle.files[0]
    const reader = new FileReader()
    reader.onload = event => props.onDrop(event.target.result)
    reader.readAsText(file, 'UTF-8');
  }
}

const collect = (connect, monitor) => ({ connectDropTarget: connect.dropTarget(), isOver: monitor.isOver() })

const ReadFileDropContainer = props => props.connectDropTarget(
  <div>
    {
      React.Children.only(React.Children.map(
        props.children,
        child => React.cloneElement(child, { isOver: props.isOver }),
      )[0])
    }
  </div>
)

export default DropTarget(NativeTypes.FILE, spec, collect)(ReadFileDropContainer)
