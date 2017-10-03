import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = { value: props.initialValue || 0 }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ value: e.target.value }, () => {
      this.props.onChange(`${this.state.value}px`)
    })
  }

  render() {
    const minValue = this.props.minValue || 0
    const maxValue = this.props.maxValue || 100

    return (
      <div className="slider">
        <span className="label">{this.props.label}</span>
        <input
          type="range"
          defaultValue={this.state.value}
          onChange={this.handleChange}
          min={minValue}
          max={maxValue}
        />
        <div
          className="slider-bg"
          style={{
            transform: `translate3d(${this.state.value * 1.0 / maxValue * 100}%, 0px, 0px)`
          }}
        />
        <style jsx>{`
          .slider {
            position: relative;
            height: 32px;
            overflow: hidden;
          }

          .slider:last-of-type {
            border-bottom: 0;
          }

          .label {
            position: absolute;
            left: 8px;
            height: 32px;
            line-height: 32px;
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
            height: 32px;
            width: 100%;
            background: rgba(255, 255, 255, 0.165);
          }
        `}</style>
      </div>
    )
  }
}
