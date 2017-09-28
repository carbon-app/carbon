import React from 'react'
import Checkmark from './svg/Checkmark'

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = { isEnabled: props.enabled || false }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ isEnabled: !this.state.isEnabled }, () => {
      this.props.onChange(this.state.isEnabled)
    })
  }

  render() {
    return (
      <div className="toggle" onClick={this.toggle}>
        <span className="label">{this.props.label}</span>
        {this.state.isEnabled ? <Checkmark /> : null}
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
