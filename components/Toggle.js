import React from 'react'
import Checkmark from './svg/Checkmark'

export default class extends React.Component {
  constructor(props) {
    super()
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.props.onChange(!this.props.enabled)
  }

  render() {
    return (
      <div className="toggle" onClick={this.toggle}>
        <span className="label">{this.props.label}</span>
        {this.props.enabled ? <Checkmark /> : null}
        <style jsx>{`
          .toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            user-select: none;
            padding: 8px;
          }
        `}</style>
      </div>
    )
  }
}
