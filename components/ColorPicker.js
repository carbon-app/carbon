import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import { TwitterPicker } from 'react-color'
import { PALETTE } from '../lib/constants'

class ColorPicker extends React.Component {
  constructor() {
    super()
    this.state = { isVisible: false }
    this.toggle = this.toggle.bind(this)
    this.handlePickColor = this.handlePickColor.bind(this)
  }

  toggle() {
    this.setState({ isVisible: !this.state.isVisible })
  }

  handleClickOutside() {
    this.setState({ isVisible: false })
  }

  handlePickColor(color) {
    this.setState({ isVisible: false })
    this.props.onChange(color.hex)
  }

  render() {
    return (
      <div className="colorpicker-container">
        <div className="colorpicker-display">
          <div className="colorpicker-label">
            <span>BG</span>
          </div>
          <div className="bg-color" style={{background: this.props.bg}} onClick={this.toggle}></div>
        </div>
        <div className="colorpicker-picker" hidden={!this.state.isVisible}>
          <TwitterPicker color={this.props.bg} onChangeComplete={this.handlePickColor} />
        </div>
        <style jsx>{`
          .colorpicker-container {
            height: 100%;
          }

          .colorpicker-display {
            display: flex;
            height: 100%;
            width: 72px;
            border: 0.5px solid ${PALETTE.SECONDARY};
            border-radius: 3px;
          }

          .colorpicker-label {
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            cursor: default;
            height: 100%;
            width: 36px;
            border-right: 0.5px solid ${PALETTE.SECONDARY};
          }

          .bg-color {
            cursor: pointer;
            height: 100%;
            width: 36px;
            border-radius: 0px 2px 2px 0px;
          }

          .colorpicker-picker {
            position: absolute;
            margin-left: 32px;
            margin-top: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(ColorPicker)
