import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import SettingsIcon from './svg/Settings'
import ThemeSelect from './ThemeSelect'
import Slider from './Slider'
import Toggle from './Toggle'
import { PALETTE } from '../lib/constants'

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
          <ThemeSelect onChange={this.props.onChange} />
          <Toggle label="Drop shadow" onChange={this.props.onChange}/>
          <Toggle label="Window controls" onChange={this.props.onChange}/>
          <Slider label="Padding (vertical)" onChange={this.props.onChange}/>
          <Slider label="Padding (horizontal)" onChange={this.props.onChange}/>
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
            border: 0.5px solid #000;
            width: 184px;
            border-radius: 3px;
            position: absolute;
            margin-top: 120px;
            background: ${PALETTE.EDITOR_BG};
          }
        `}</style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(Settings)
