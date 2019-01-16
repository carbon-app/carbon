import React from 'react'

import { COLORS } from '../lib/constants'

class Slider extends React.Component {
  static defaultProps = {
    onMouseDown: () => {},
    onMouseUp: () => {}
  }

  handleChange = e => {
    this.props.onChange(`${e.target.value}${this.props.usePercentage ? '%' : 'px'}`)
  }

  render() {
    const minValue = this.props.minValue || 0
    const maxValue = this.props.maxValue || 100
    const step = 'step' in this.props ? this.props.step : 1

    return (
      <div className="slider">
        <div
          className="slider-bg"
          style={{
            transform: `translate3d(${(((parseFloat(this.props.value) - minValue) * 1.0) /
              (maxValue - minValue)) *
              100}%, 0px, 0px)`
          }}
        />
        <span className="label">{this.props.label}</span>
        <input
          type="range"
          defaultValue={this.props.value}
          onChange={this.handleChange}
          onMouseDown={this.props.onMouseDown}
          onMouseUp={this.props.onMouseUp}
          min={minValue}
          max={maxValue}
          step={step}
        />
        <style jsx>
          {`
            .slider {
              position: relative;
              height: 33px;
              overflow: hidden;
              user-select: none;
            }

            .slider:last-of-type {
              border-bottom: 0;
            }

            .label {
              position: absolute;
              left: 8px;
              height: 33px;
              line-height: 33px;
            }

            .slider input {
              opacity: 0;
              cursor: ew-resize;
              position: relative;
              height: 100%;
              width: 100%;
            }

            .slider-bg {
              position: absolute;
              top: 0;
              bottom: 0;
              pointer-events: none;
              height: 33px;
              width: 100%;
              background: ${COLORS.DARK_GRAY};
            }
          `}
        </style>
      </div>
    )
  }
}

export default Slider
