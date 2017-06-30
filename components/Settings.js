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
      <div className="settings-container">
        <div className={`settings-display ${this.state.isVisible ? 'is-visible' : ''}`} onClick={this.toggle}>
          <SettingsIcon />
        </div>
        <div className="settings-settings">
          <ThemeSelect onChange={this.props.onChange} />
          <Toggle label="Drop shadow" onChange={this.props.onChange.bind(null, 'dropShadow')}/>
          <Toggle label="Window controls" onChange={this.props.onChange.bind(null, 'windowControls')}/>
          <Slider label="Padding (vertical)" initialValue={16} onChange={this.props.onChange.bind(null, 'paddingVertical')}/>
          <Slider label="Padding (horizontal)" initialValue={32} onChange={this.props.onChange.bind(null, 'paddingHorizontal')}/>
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
            margin-top: 132px;
            background: ${PALETTE.EDITOR_BG};
          }
        `}</style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(Settings)
