import React from 'react'
import { COLORS } from '../lib/constants'

class Button extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: this.props.color
    }

    this.btnHoverOn = this.btnHoverOn.bind(this)
    this.btnHoverOff = this.btnHoverOff.bind(this)
  }

  btnHoverOn() {
    this.setState({ color: COLORS.PRIMARY })
  }

  btnHoverOff() {
    this.setState({ color: this.props.color })
  }

  render() {
    return (
      <button
        onMouseEnter={this.btnHoverOn}
        onMouseLeave={this.btnHoverOff}
        onClick={this.props.onClick}
        style={Object.assign(
          {
            background: COLORS.BLACK,
            color: this.state.color,
            border: `0.5px solid ${this.state.color}`
          },
          this.props.style
        )}
      >
        <span>{this.props.title}</span>
        <style jsx>{`
          button {
            cursor: pointer;
            outline: none;
            height: 100%;
            padding: 0 16px;
            border-radius: 3px;
            user-select: none;
          }

          button > span {
            font-size: 14px;
            line-height: 1;
          }
        `}</style>
      </button>
    )
  }
}

export default Button
