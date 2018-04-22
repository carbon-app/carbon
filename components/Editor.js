import React from 'react'
import { Subscribe } from 'unstated'
import ReadFileDropContainer, { DATA_URL, TEXT } from 'dropperx'

import EditorContainer from '../containers/Editor'
import Overlay from './Overlay'
import Coder from './Coder'

import { DEFAULT_CODE } from '../lib/constants'
import { isImage } from '../lib/util'

const to = [EditorContainer]

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.renderPane = this.renderPane.bind(this)
  }

  renderPane(editor) {
    return (
      <ReadFileDropContainer readAs={readAs} onDrop={editor.onDrop}>
        {({ isOver, canDrop }) => (
          <Overlay
            isOver={isOver || canDrop}
            title={`Drop your file here to import ${isOver ? '✋' : '✊'}`}
          >
            <Coder
              config={editor.state}
              updateCode={editor.updateCode}
              onAspectRatioChange={editor.updateAspectRatio}
              titleBar={editor.state.titleBar}
              updateTitleBar={editor.updateTitleBar}
            >
              {editor.state.code != null ? editor.state.code : DEFAULT_CODE}
            </Coder>
          </Overlay>
        )}
      </ReadFileDropContainer>
    )
  }

  render() {
    return <Subscribe to={to}>{this.renderPane}</Subscribe>
  }
}

function readAs(file) {
  if (isImage(file)) {
    return DATA_URL
  }
  return TEXT
}

export default Editor
