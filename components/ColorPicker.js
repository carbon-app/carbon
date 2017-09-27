import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import { TwitterPicker } from 'react-color'
import WindowPointer from './WindowPointer'
import { COLORS } from '../lib/constants'

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
          <WindowPointer fromLeft="15px" />
          <TwitterPicker color={this.props.bg} onChangeComplete={this.handlePickColor} triangle="hide" />
        </div>
        <style jsx>{`
          .colorpicker-container {
            height: 100%;
          }

          .colorpicker-display {
            display: flex;
            height: 100%;
            width: 72px;
            border: 0.5px solid ${COLORS.SECONDARY};
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
            border-right: 0.5px solid ${COLORS.SECONDARY};
          }

          .bg-color {
            cursor: pointer;
            height: 100%;
            width: 36px;
            border-radius: 0px 2px 2px 0px;
          }

          .colorpicker-picker {
            position: absolute;
            margin-left: 36px;
            margin-top: 4px;
          }

          /* react-color overrides */
          .colorpicker-picker :global(.twitter-picker) {
            width: 278px !important;
            border: 0.5px solid ${COLORS.SECONDARY} !important;
            border-radius: 3px !important;
            background: #1A1A1A !important;
          }

          .colorpicker-picker > :global(div > div:nth-child(3) > div:nth-child(11)) {
            background: #1A1A1A !important;
            border: 0.5px solid ${COLORS.SECONDARY} !important;
            border-right: none !important;
            border-radius: 3px 0 0 3px !important;
            color: ${COLORS.SECONDARY} !important;
          }

          .colorpicker-picker > :global(div > div:nth-child(3) > div:nth-child(12) > input) {
            background: rgba(255, 255, 255, 0.165) !important;
            color: #fff !important;
          }

          .colorpicker-picker > :global(div > div:nth-child(3) > span > div) {
            border-radius: 2px !important;
          }
        `}</style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(ColorPicker)
