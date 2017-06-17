import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import { BlockPicker } from 'react-color'

class ColorPicker extends React.Component {
  constructor() {
    super()
    this.state = { isVisible: false, bgcolor: '#565656' }
    this.toggle = this.toggle.bind(this)
    this.handlePickColor = this.handlePickColor.bind(this)
  }

  toggle() {
    this.setState({ isVisible: !this.state.isVisible })
  }

  handleClickOutside() {
    this.setState({ isVisible: false });
  }

  handlePickColor(color) {
    this.setState({ bgcolor: color.hex })
  }

  render() {
    return (
      <div className="colorpicker-container">
        <div className="colorpicker-display">
          <div className="colorpicker-label">
            <span>BG</span>
          </div>
          <div className="bg-color" style={{background: this.state.bgcolor}} onClick={this.toggle}></div>
        </div>
        <div className="colorpicker-picker" hidden={!this.state.isVisible}>
          <BlockPicker color={this.state.bgcolor} onChangeComplete={this.handlePickColor} />
        </div>
        <style jsx>{`
          .colorpicker-container {
            height: 37px; // TODO fix
          }

          .colorpicker-display {
            display: flex;
            height: 100%;
            width: 72px;
            background: #000;
            border: 0.5px solid #333;
            border-radius: 3px;
          }

          .colorpicker-label {
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            cursor: default;
            color: #fff;
            height: 100%;
            width: 36px;
          }

          .bg-color {
            cursor: pointer;
            height: 100%;
            width: 36px;
            border-radius: 0px 2px 2px 0px;
          }

          .colorpicker-picker {
            position: absolute;
            margin-left: -32px;
            margin-top: 9px;
          }
        `}</style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(ColorPicker)
