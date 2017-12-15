import React from 'react'
import Toggle from './Toggle'

class Collapse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggle = () => {
    this.setState(state => ({
      open: !state.open
    }))
  }

  render() {
    if (this.state.open) {
      return this.props.children
    }
    return <Toggle enabled={false} label={this.props.label} onChange={this.toggle} />
  }
}

export default Collapse
