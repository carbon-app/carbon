// Theirs
import React from 'react'
import { Provider, Subscribe } from 'unstated'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

// Ours
import EditorContainer from '../containers/Editor'
import Coder from './Coder'
import Toolbar from './Toolbar'
import { COLORS } from '../lib/constants'

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
          <Coder />
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

export default DragDropContext(HTML5Backend)(Editor)
