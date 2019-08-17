import React from 'react'

class Text extends React.Component {
  handleChange = e => {
    const minValue = this.props.minValue || 0
    const maxValue = this.props.maxValue || 100

    let value = e.target.value
    if (this.props.type === 'int') {
      value = parseInt(value) || 0
      value = value < minValue ? minValue : value
      value = value > maxValue ? maxValue : value
    } else if (this.props.type === 'float') {
      value = parseFloat(value) || 0
      value = value < minValue ? minValue : value
      value = value > maxValue ? maxValue : value
    }

    this.props.onChange(value)
  }

  render() {
    const minValue = this.props.minValue || 0
    const maxValue = this.props.maxValue || 100
    const type = this.props.type === 'int' || this.props.type === 'float' ? 'number' : 'text'

    return (
      <div className="text">
        <label>{this.props.label}</label>
        <input
          type={type}
          value={this.props.value}
          onChange={this.handleChange}
          min={minValue}
          max={maxValue}
        />
        <style jsx>
          {`
            .text {
              position: relative;
              height: 33px;
              overflow: hidden;
            }

            .text:focus-within {
              outline: -webkit-focus-ring-color auto 5px;
            }

            .text:last-of-type {
              border-bottom: 0;
            }

            label {
              position: absolute;
              left: 8px;
              height: 33px;
              line-height: 33px;
            }

            input {
              position: relative;
              height: 100%;
              width: 100%;
              text-align: right;
              margin: 0;
              border: 0;
              background: inherit;
              color: inherit;
              font: inherit;
              padding-right: 8px;
            }

            input[type='number']::-webkit-inner-spin-button,
            input[type='number']::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Text
