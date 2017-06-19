import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import SettingsIcon from './svg/Settings'

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
          <div className="window-theme">
            <span className="label">Theme</span>
            <div className="themes">
              <div className="theme"></div>
              <div className="theme"></div>
              <div className="theme"></div>
            </div>
          </div>
          <div className="toggle">
            <span className="label">Drop shadow</span>
          </div>
          <div className="toggle">
            <span className="label">Window controls</span>
          </div>
          <div className="slider">
            <span className="label">Padding (horizontal)</span>
          </div>
        </div>
        <style jsx>{`
          .settings-container {
            height: 100%;
            width: 37px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 3px;
            color: #fff;
            font-size: 12px;
          }

          .settings-display {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 0.5px solid #000;
            border-radius: 3px;
            user-select: none;
            position: relative;
            z-index: 1;
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
            height: 208px;
            width: 152px;
            padding: 8px;
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
