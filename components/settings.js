import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import SettingsIcon from './svg/settings'

class Settings extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isVisible: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ isVisible: !this.state.isVisible })
  }

  handleClickOutside() {
    this.setState({ isVisible: false });
  }

  render() {
    return (
      <div className="settings-container" onClick={this.toggle}>
        <div className={`settings-display ${this.state.isVisible ? 'is-visible' : ''}`}>
          <SettingsIcon />
        </div>
        <div className="settings-settings">
        </div>
        <style jsx>{`
          .settings-container {
            height: 37px;
            width: 37px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 3px;
          }

          .settings-display {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 0.5px solid #333;
            border-radius: 3px;
            user-select: none;
            position: relative;
            z-index: 1;
            background: #000;
            cursor: pointer;
          }

          .settings-display:hover {
            background: #131313;
          }

          .is-visible + .settings-settings {
            display: block;
          }

          .settings-settings {
            display: none;
            border: 0.5px solid #333;
            height: 200px;
            width: 200px;
            border-radius: 3px;
            position: absolute;
            margin-top: 120px;
            background: #000;
          }
        `}</style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(Settings)
