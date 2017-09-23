const { createElement, Component } = require('react')
const { DropTarget } = require('react-dnd')
const { NativeTypes } = require('react-dnd-html5-backend')

const spec = {
  drop(props, monitor, component) {
    const bundle = monitor.getItem()
    Promise.all(
      bundle.files.map(file => {
        const reader = new FileReader()
        return new Promise((resolve, reject) => {
          reader.onload = event => resolve(event.target.result)
          reader.readAsText(file, 'UTF-8');
        })
      })
    ).then(contents => {
      bundle.contents = contents
      component.setState(state => ({
        lastContent: contents,
        history: [bundle, ...state.history]
      }))
      props.onDrop(contents)
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
          content: this.state.lastContent,
          history: this.state.history,
        })
      )
    )
  }
}

module.exports = exports.default = DropTarget(NativeTypes.FILE, spec, collect)(ReadFileDropContainer)
