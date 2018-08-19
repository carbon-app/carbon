import React from 'react'
import Toggle from './Toggle'

import { toggle } from '../lib/util'

class Collapse extends React.PureComponent {
  state = {
    open: false
  }

  toggle = () => this.setState(toggle('open'))

  render() {
    if (this.state.open) {
      return this.props.children
    }
    return (
      <Toggle
        enabled={false}
        center={true}
        label={this.props.label}
        className="collapse"
        onChange={this.toggle}
      />
    )
  }
}

export default Collapse
