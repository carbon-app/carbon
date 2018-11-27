import React from 'react'

import Checkmark from './svg/Checkmark'
import { COLORS } from '../lib/constants'

class Toggle extends React.PureComponent {
  static defaultProps = {
    className: ''
  }

  toggle = () => this.props.onChange(!this.props.enabled)

  render() {
    return (
      <div className={`toggle ${this.props.className}`} onClick={this.toggle}>
        <span className="label">{this.props.label}</span>
        {this.props.enabled ? <Checkmark /> : <div className="checkmark-disabled" />}
        <style jsx>
          {`
            .toggle {
              display: flex;
              align-items: center;
              justify-content: ${this.props.center ? 'center' : 'space-between'};
              cursor: pointer;
              user-select: none;
              padding: 8px;
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
