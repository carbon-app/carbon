import React from 'react'

import Checkmark from './svg/Checkmark'
import { COLORS } from '../lib/constants'

class Toggle extends React.PureComponent {
  static defaultProps = {
    className: ''
  }

  toggle = () => this.props.onChange(!this.props.enabled)

  handleKeydown = e => {
    if (e.key === 'Enter') this.toggle()
    if (e.key === ' ') {
      e.preventDefault()
      this.toggle()
    }
  }

  render() {
    // TODO use input[type=["checkbox"] /> instead of div
    return (
      <div
        role="checkbox"
        tabIndex={0}
        className={`toggle ${this.props.className}`}
        onClick={this.toggle}
        aria-checked={this.props.enabled}
        onKeyDown={this.handleKeydown}
      >
        <label className="label">{this.props.label}</label>
        {this.props.enabled ? <Checkmark /> : <div className="checkmark-disabled" />}
        <style jsx>
          {`
            .toggle {
              display: flex;
              align-items: center;
              justify-content: ${this.props.center ? 'center' : 'space-between'};
              cursor: pointer;
              user-select: none;
              padding: ${this.props.padding || '8px 12px 8px 8px'};
            }

            .toggle {
              outline: none;
            }

            .toggle:focus-within :global(svg),
            .toggle:focus-within .checkmark-disabled {
              outline: 4px auto -webkit-focus-ring-color;
            }

            .checkmark-disabled {
              width: 18px;
              height: 18px;
              border-radius: 36px;
              background-color: ${COLORS.DARK_GRAY};
            }
          `}
        </style>
      </div>
    )
  }
}

export default Toggle
