// Theirs
import React from 'react'
import { Provider, Subscribe } from 'unstated'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import ReadFileDropContainer, { DATA_URL, TEXT } from 'dropperx'

// Ours
import EditorContainer from '../containers/Editor'
import Button from './Button'
import Dropdown from './Dropdown'
import BackgroundSelect from './BackgroundSelect'
import Settings from './Settings'
import Toolbar from './Toolbar'
import Overlay from './Overlay'
import Carbon from './Carbon'
import { COLORS, DEFAULT_CODE, DEFAULT_SETTINGS } from '../lib/constants'
import { isImage } from '../lib/util'

const to = [EditorContainer]

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.inject = [new EditorContainer(props)]
    this.renderEditor = this.renderEditor.bind(this)
  }

  renderEditor(editor) {
    return (
      <React.Fragment>
        <div id="editor">
          <Toolbar />
          <ReadFileDropContainer readAs={readAs} onDrop={editor.onDrop}>
            {({ isOver, canDrop }) => (
              <Overlay
                isOver={isOver || canDrop}
                title={`Drop your file here to import ${isOver ? '✋' : '✊'}`}
              >
                <Carbon
                  config={editor.state}
                  updateCode={editor.updateCode}
                  onAspectRatioChange={editor.updateAspectRatio}
                  titleBar={editor.state.titleBar}
                  updateTitleBar={editor.updateTitleBar}
                >
                  {editor.state.code != null ? editor.state.code : DEFAULT_CODE}
                </Carbon>
              </Overlay>
            )}
          </ReadFileDropContainer>
        </div>
        <style jsx>
          {`
            #editor {
              background: ${COLORS.BLACK};
              border: 3px solid ${COLORS.SECONDARY};
              border-radius: 8px;
              padding: 16px;
            }
          `}
        </style>
      </React.Fragment>
    )
  }

  render() {
    return (
      <Provider inject={this.inject}>
        <Subscribe to={to}>{this.renderEditor}</Subscribe>
      </Provider>
    )
  }
}

function readAs(file) {
  if (isImage(file)) {
    return DATA_URL
  }
  return TEXT
}

export default DragDropContext(HTML5Backend)(Editor)
