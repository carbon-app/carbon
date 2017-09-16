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
  <div className="dnd-container">
    { props.isOver ? <div className="dnd-overlay">Drop your file here to import</div> : null }
    {props.children}
    <style jsx>{`
      .dnd-container {
        position: relative;
      }

      .dnd-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        height: 100%;
        z-index: 999;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.85);
      }
    `}</style>
  </div>
)

export default DropTarget(NativeTypes.FILE, spec, collect)(ReadFileDropContainer)
