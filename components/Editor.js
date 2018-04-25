import React from 'react'
import { Subscribe } from 'unstated'
import ReadFileDropContainer, { DATA_URL, TEXT } from 'dropperx'

import EditorContainer from '../containers/Editor'
import Overlay from './Overlay'
import CodeWindow from './CodeWindow'

import { DEFAULT_CODE } from '../lib/constants'
import { isImage } from '../lib/util'

const editorContainer = [EditorContainer]

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.renderPane = this.renderPane.bind(this)
  }

  renderPane(editor) {
    return (
      <ReadFileDropContainer readAs={readAs} onDrop={editor.handleDroppedFile}>
        {({ isOver, canDrop }) => (
          <Overlay
            isOver={isOver || canDrop}
            title={`Drop your file here to import ${isOver ? '✋' : '✊'}`}
          >
            <CodeWindow
              config={editor.state}
              updateCode={editor.updateCode}
              onAspectRatioChange={editor.updateAspectRatio}
              titleBar={editor.state.titleBar}
              updateTitleBar={editor.updateTitleBar}
            >
              {editor.state.code != null ? editor.state.code : DEFAULT_CODE}
            </CodeWindow>
          </Overlay>
        )}
      </ReadFileDropContainer>
    )
  }

  render() {
    return <Subscribe to={editorContainer}>{this.renderPane}</Subscribe>
  }
}

function readAs(file) {
  if (isImage(file)) {
    return DATA_URL
  }
  return TEXT
}

export default Editor
