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
}))(Carbon)


let code = this.props.content
    const split = code.split(EOL)
    if (split.length > MAX_LINES) code = [...split.slice(0, MAX_LINES - 1), '', '...'].join(EOL)

    return this.props.connectDropTarget(