import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import SettingsIcon from './svg/Settings'
import ThemeSelect from './ThemeSelect'
import FontSelect from './FontSelect'
import Slider from './Slider'
import Toggle from './Toggle'
import WindowPointer from './WindowPointer'
import Collapse from './Collapse'
import { COLORS } from '../lib/constants'

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
    this.setState({ isVisible: false })
  }

  render() {
    return (
      <div className="settings-container">
        <div
          className={`settings-display ${this.state.isVisible ? 'is-visible' : ''}`}
          onClick={this.toggle}
        >
          <SettingsIcon />
        </div>
        <div className="settings-settings">
          <WindowPointer fromLeft="15px" />
          <ThemeSelect
            selected={this.props.enabled.windowTheme || 'none'}
            onChange={this.props.onChange.bind(null, 'windowTheme')}
          />
          <FontSelect
            selected={this.props.enabled.fontFamily || 'Hack'}
            onChange={this.props.onChange.bind(null, 'fontFamily')}
          />
          <Slider
            label="Font size"
            value={this.props.enabled.fontSize || 13}
            minValue={10}
            maxValue={18}
            onChange={this.props.onChange.bind(null, 'fontSize')}
          />
          <Toggle
            label="Window controls"
            enabled={this.props.enabled.windowControls}
            onChange={this.props.onChange.bind(null, 'windowControls')}
          />
          <Toggle
            label="Line numbers"
            enabled={this.props.enabled.lineNumbers}
            onChange={this.props.onChange.bind(null, 'lineNumbers')}
          />
          <Toggle
            label="Auto-adjust width"
            enabled={this.props.enabled.widthAdjustment}
            onChange={this.props.onChange.bind(null, 'widthAdjustment')}
          />
          <Collapse label="Advanced">
            <Slider
              label="Padding (vertical)"
              value={this.props.enabled.paddingVertical || 16}
              maxValue={200}
              onChange={this.props.onChange.bind(null, 'paddingVertical')}
            />
            <Slider
              label="Padding (horizontal)"
              value={this.props.enabled.paddingHorizontal || 32}
              onChange={this.props.onChange.bind(null, 'paddingHorizontal')}
            />
            <Toggle
              label="Drop shadow"
              enabled={this.props.enabled.dropShadow}
              onChange={this.props.onChange.bind(null, 'dropShadow')}
            />
            <Slider
              label="Drop shadow (offset-y)"
              value={this.props.enabled.dropShadowOffsetY || 20}
              onChange={this.props.onChange.bind(null, 'dropShadowOffsetY')}
            />
            <Slider
              label="Drop shadow (blur-radius)"
              value={this.props.enabled.dropShadowBlurRadius || 68}
              onChange={this.props.onChange.bind(null, 'dropShadowBlurRadius')}
            />
            <Toggle
              label="Reset settings"
              enabled={false}
              onChange={this.props.resetDefaultSettings}
            />
          </Collapse>
        </div>
        <style jsx>{`
          .settings-container {
            display: flex;
            position: relative;
            height: 100%;
            width: 37px;
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
            border: 1px solid ${COLORS.SECONDARY};
            border-radius: 3px;
            user-select: none;
            position: relative;
            z-index: 1;
            cursor: pointer;
          }

          .settings-display:hover {
            background: ${COLORS.HOVER};
          }

          .is-visible + .settings-settings {
            display: block;
          }

          .settings-settings {
            display: none;
            position: absolute;
            top: 44px;
            left: 0;
            border: 1px solid ${COLORS.SECONDARY};
            width: 184px;
            border-radius: 3px;
            background: ${COLORS.BLACK};
          }

          .settings-settings > :global(div) {
            border-bottom: solid 1px ${COLORS.SECONDARY};
          }

          .settings-settings > :global(div):first-child,
          .settings-settings > :global(.collapse) {
            border-bottom: none;
          }
        `}</style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(Settings)
