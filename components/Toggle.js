import React from 'react'

import Checkmark from './svg/Checkmark'
import { COLORS } from '../lib/constants'

class Toggle extends React.PureComponent {
  static defaultProps = {
    className: '',
  }

  toggle = () => this.props.onChange(!this.props.enabled)

  render() {
    return (
      <div className={`toggle ${this.props.className}`}>
        <label className="label">{this.props.label}</label>
        <input
          type="checkbox"
          checked={this.props.enabled}
          onChange={this.toggle}
          aria-checked={this.props.enabled}
        />
        {this.props.enabled ? <Checkmark /> : <div className="checkmark-disabled" />}
        <style jsx>
          {`
            .toggle {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: space-between;
              user-select: none;
              padding: ${this.props.padding || '8px 12px 8px 8px'};
              outline: none;
            }

            input {
              cursor: pointer;
              margin: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              position: absolute;
              opacity: 0;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            }

            input:focus + :global(svg),
            input:focus + .checkmark-disabled {
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
