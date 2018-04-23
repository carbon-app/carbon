// Theirs
import React from 'react'
import { Provider } from 'unstated'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

// Ours
import EditorContainer from '../containers/Editor'
import Editor from './Editor'
import Toolbar from './Toolbar'
import { COLORS } from '../lib/constants'

class Carbon extends React.Component {
  constructor(props) {
    super(props)
    this.inject = [new EditorContainer(props)]
  }

  render() {
    return (
      <Provider inject={this.inject}>
        <div id="carbon">
          <Toolbar />
          <Editor />
        </div>
        <style jsx>
          {`
            #carbon {
              background: ${COLORS.BLACK};
              border: 3px solid ${COLORS.SECONDARY};
              border-radius: 8px;
              padding: 16px;
            }
          `}
        </style>
      </Provider>
    )
  }
}

export default DragDropContext(HTML5Backend)(Carbon)
