const { createElement, Component } = require('react')
const { DropTarget } = require('react-dnd')
const { NativeTypes } = require('react-dnd-html5-backend')

const spec = {
  drop(props, monitor, component) {
    const {files} = monitor.getItem()
    Promise.all(
      files
        .filter(props.filter || (i => i))
        .map(file => {
          const reader = new FileReader()
          return new Promise((resolve, reject) => {
            reader.onload = event => {
              file.content = event.target.result
              resolve(file)
            }
            reader.readAsText(file, 'UTF-8');
          })
        })
    ).then(files => {
      component.setState(state => ({
        lastContent: files,
        history: [files, ...state.history]
      }))
      props.onDrop(files)
    })
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  monitor,
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

class ReadFileDropContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lastContent: null,
      history: []
    }
  }
  render () {
    return this.props.connectDropTarget(
      createElement(
        'div',
        null,
        this.props.children({
          __monitor__: this.props.monitor,
          isOver: this.props.isOver,
          canDrop: this.props.canDrop,
          files: this.state.lastContent,
          history: this.state.history,
        })
      )
    )
  }
}

module.exports = exports.default = DropTarget(NativeTypes.FILE, spec, collect)(ReadFileDropContainer)
