import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import omit from 'lodash.omit'

import ThemeSelect from './ThemeSelect'
import FontSelect from './FontSelect'
import Slider from './Slider'
import Toggle from './Toggle'
import WindowPointer from './WindowPointer'
import { COLORS, PRESETS } from '../lib/constants'
import { toggle } from '../lib/util'
import SettingsIcon from './svg/Settings'
import * as Arrows from './svg/Arrows'
import Remove from './svg/Remove'

const WindowSettings = React.memo(
  ({
    onChange,
    windowTheme,
    paddingHorizontal,
    paddingVertical,
    dropShadow,
    dropShadowBlurRadius,
    dropShadowOffsetY,
    windowControls,
    lineNumbers,
    widthAdjustment,
    watermark
  }) => {
    return (
      <div className="settings-content">
        <ThemeSelect
          selected={windowTheme || 'none'}
          onChange={onChange.bind(null, 'windowTheme')}
        />
        <div className="row">
          <Slider
            label="Padding (vert)"
            value={paddingVertical}
            maxValue={200}
            onChange={onChange.bind(null, 'paddingVertical')}
          />
          <Slider
            label="Padding (horiz)"
            value={paddingHorizontal}
            onChange={onChange.bind(null, 'paddingHorizontal')}
          />
        </div>
        <Toggle
          label="Drop shadow"
          enabled={dropShadow}
          onChange={onChange.bind(null, 'dropShadow')}
        />
        {dropShadow && (
          <div className="row drop-shadow-options">
            <Slider
              label="(offset-y)"
              value={dropShadowOffsetY}
              onChange={onChange.bind(null, 'dropShadowOffsetY')}
            />
            <Slider
              label="(blur-radius)"
              value={dropShadowBlurRadius}
              onChange={onChange.bind(null, 'dropShadowBlurRadius')}
            />
          </div>
        )}
        <Toggle
          label="Window controls"
          enabled={windowControls}
          onChange={onChange.bind(null, 'windowControls')}
        />
        <Toggle
          label="Line numbers"
          enabled={lineNumbers}
          onChange={onChange.bind(null, 'lineNumbers')}
        />
        <Toggle
          label="Auto-adjust width"
          enabled={widthAdjustment}
          onChange={onChange.bind(null, 'widthAdjustment')}
        />
        <Toggle label="Watermark" enabled={watermark} onChange={onChange.bind(null, 'watermark')} />
        <style jsx>
          {`
            .row {
              display: flex;
            }

            .row > :global(div:first-child) {
              border-right: 1px solid ${COLORS.SECONDARY};
            }

            .drop-shadow-options {
              opacity: 0.5;
            }
          `}
        </style>
      </div>
    )
  }
)

const TypeSettings = React.memo(({ onChange, font, size, lineHeight }) => {
  return (
    <div className="settings-content">
      <FontSelect selected={font} onChange={onChange.bind(null, 'fontFamily')} />
      <Slider
        label="Size"
        value={size}
        minValue={10}
        maxValue={18}
        step={0.5}
        onChange={onChange.bind(null, 'fontSize')}
      />
      <Slider
        label="Line height"
        value={lineHeight}
        minValue={90}
        maxValue={250}
        usePercentage={true}
        onChange={onChange.bind(null, 'lineHeight')}
      />
    </div>
  )
})

const MiscSettings = React.memo(({ format, reset }) => {
  return (
    <div className="settings-content">
      <button onClick={format}>Prettify code</button>
      <button onClick={reset} className="reset-button">
        Reset settings
      </button>
      <style jsx>
        {`
          button {
            outline: none;
            border: none;
            background: transparent;
            cursor: pointer;
            flex: 1;
            color: ${COLORS.SECONDARY};
            font-size: 12px;
            padding: 0;
          }

          .settings-content {
            display: flex;
            flex-direction: column;
          }

          .reset-button {
            border-top: 1px solid ${COLORS.SECONDARY};
            color: ${COLORS.RED};
          }
        `}
      </style>
    </div>
  )
})

const MenuButton = React.memo(({ name, select, selected }) => {
  return (
    <button onClick={select(name)} className={selected === name ? 'selected' : ''}>
      {name}
      <div className="arrow-icon">
        <Arrows.Right />
      </div>
      <style jsx>
        {`
          button {
            outline: none;
            border: none;
            background: transparent;
            color: ${COLORS.SECONDARY};
            display: flex;
            padding: 8px;
            height: 33px;
            line-height: 0;
            cursor: pointer;
            font-size: 14px;
            border-bottom: 1px solid ${COLORS.SECONDARY};
            position: relative;
          }

          button:last-child {
            ${selected === 'Window' ? '' : 'border-bottom: none;'};
          }

          button.selected {
            background-color: ${COLORS.BLACK};
          }

          .arrow-icon {
            position: absolute;
            right: 14px;
            top: 11px;
          }
        `}
      </style>
    </button>
  )
})

const Presets = React.memo(({ show, selected, presets, toggle, remove, apply, undo }) => {
  return (
    <div className="settings-presets">
      <div className="settings-presets-header">
        <span>Presets</span>
        <button className="settings-presets-arrow" onClick={toggle}>
          {show ? <Arrows.Up /> : <Arrows.Down />}
        </button>
      </div>
      {show ? (
        <div className="settings-presets-content">
          {presets.map((preset, i) => (
            <button
              key={i}
              className="settings-presets-preset"
              style={{
                backgroundColor: preset.backgroundColor,
                border: i === selected ? `2px solid ${COLORS.SECONDARY}` : 'initial'
              }}
              onClick={() => apply(i, preset)}
            >
              {preset.custom ? (
                <button className="settings-presets-remove" onClick={() => remove(i)}>
                  <Remove />
                </button>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
      {show && selected != null ? (
        <div className="settings-presets-applied">
          <span>Preset applied!</span>
          <button onClick={undo}>
            undo <span>&#x21A9;</span>
          </button>
        </div>
      ) : null}
      <style jsx>
        {`
          button {
            outline: none;
            border: none;
            background: transparent;
            cursor: pointer;
            padding: 0;
          }

          .settings-presets {
            border-bottom: 1px solid ${COLORS.SECONDARY};
          }

          .settings-presets-header {
            display: flex;
            padding: 10px 8px;
            position: relative;
            color: ${COLORS.SECONDARY};
            width: 100%;
            align-items: center;
          }

          .settings-presets-arrow,
          .settings-presets-create,
          .settings-presets-remove {
            cursor: pointer;
            background: transparent;
            outline: none;
            border: none;
            font-size: 12px;
          }

          .settings-presets-create {
            color: ${COLORS.GRAY};
            padding: 0 8px;
          }

          .settings-presets-arrow {
            position: absolute;
            right: 16px;
          }

          .settings-presets-content {
            display: flex;
            overflow-x: scroll;
            margin: 12px 8px;
          }

          .settings-presets-preset {
            border-radius: 3px;
            height: 96px;
            margin-right: 8px;
            flex: 0 0 96px;
            position: relative;
          }

          .settings-presets-remove {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            padding: 0;
            top: 6px;
            right: 6px;
            width: 11px;
            height: 11px;
            border-radius: 999px;
            background-color: ${COLORS.SECONDARY};
          }

          .settings-presets-applied {
            background-color: ${COLORS.SECONDARY};
            width: 100%;
            color: ${COLORS.BLACK};
            padding: 4px 8px;
          }

          .settings-presets-applied button {
            float: right;
          }

          .settings-presets-applied button span {
            float: right;
            margin: 1px 0 0 2px;
          }
        `}
      </style>
    </div>
  )
})

class Settings extends React.PureComponent {
  state = {
    presets: PRESETS,
    isVisible: false,
    selectedMenu: 'Window',
    showPresets: false,
    selectedPreset: null,
    previousSettings: null
  }

  toggleVisible = () => this.setState(toggle('isVisible'))

  togglePresets = () => this.setState(toggle('showPresets'))

  handleClickOutside = () => this.setState({ isVisible: false })

  selectMenu = selectedMenu => () => this.setState({ selectedMenu })

  renderContent = () => {
    switch (this.state.selectedMenu) {
      case 'Window':
        return (
          <WindowSettings
            onChange={this.handleChange}
            windowTheme={this.props.windowTheme}
            paddingHorizontal={this.props.paddingHorizontal}
            paddingVertical={this.props.paddingVertical}
            dropShadow={this.props.dropShadow}
            dropShadowBlurRadius={this.props.dropShadowBlurRadius}
            dropShadowOffsetY={this.props.dropShadowOffsetY}
            windowControls={this.props.windowControls}
            lineNumbers={this.props.lineNumbers}
            widthAdjustment={this.props.widthAdjustment}
            watermark={this.props.watermark}
          />
        )
      case 'Type':
        return (
          <TypeSettings
            onChange={this.handleChange}
            font={this.props.fontFamily}
            size={this.props.fontSize}
            lineHeight={this.props.lineHeight}
          />
        )
      case 'Misc':
        return <MiscSettings format={this.props.format} reset={this.props.resetDefaultSettings} />
      default:
        return null
    }
  }

  handleChange = (key, value) => {
    this.props.onChange(key, value)
    this.setState({ selectedPreset: null, previousSettings: null })
  }

  applyPreset = (index, settings) => {
    // Do not store functions in previous state
    const previousSettings = omit(this.props, [
      'onChange',
      'resetDefaultSettings',
      'applyPreset',
      'removePreset',
      'format'
    ])

    this.props.applyPreset(omit(settings, ['custom']))
    this.setState({ selectedPreset: index, previousSettings })
  }

  undoPreset = () => {
    this.props.applyPreset(this.state.previousSettings)
    this.setState({ selectedPreset: null, previousSettings: null })
  }

  removePreset = index =>
    this.setState(({ presets }) => ({ presets: presets.filter((_, i) => i !== index) }))

  render() {
    const { isVisible, selectedMenu, showPresets, selectedPreset, presets } = this.state

    return (
      <div className="settings-container">
        <div
          className={`settings-display ${isVisible ? 'is-visible' : ''}`}
          onClick={this.toggleVisible}
        >
          <SettingsIcon />
        </div>
        <div className="settings-settings">
          <WindowPointer fromLeft="15px" />
          <Presets
            show={showPresets}
            presets={presets}
            selected={selectedPreset}
            toggle={this.togglePresets}
            apply={this.applyPreset}
            undo={this.undoPreset}
            remove={this.removePreset}
          />
          <div className="settings-bottom">
            <div className="settings-menu">
              <MenuButton name="Window" select={this.selectMenu} selected={selectedMenu} />
              <MenuButton name="Type" select={this.selectMenu} selected={selectedMenu} />
              <MenuButton name="Misc" select={this.selectMenu} selected={selectedMenu} />
            </div>
            {this.renderContent()}
          </div>
        </div>
        <style jsx>
          {`
            .settings-container {
              display: flex;
              position: relative;
              height: 100%;
              width: 40px;
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

            .settings-display.is-visible {
              border-width: 2px;
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
              top: 52px;
              left: 0;
              border: 2px solid ${COLORS.SECONDARY};
              width: 324px;
              border-radius: 3px;
              background: ${COLORS.BLACK};
            }

            .settings-bottom {
              display: flex;
            }

            .settings-menu {
              display: flex;
              flex-direction: column;
              flex: 0 0 96px;
              background-color: ${COLORS.DARK_GRAY};
            }
          `}
        </style>
        <style jsx global>
          {`
            .settings-content {
              width: 100%;
              border-left: 1px solid ${COLORS.SECONDARY};
            }

            .settings-content > div:not(:first-child) {
              border-top: solid 1px ${COLORS.SECONDARY};
            }
          `}
        </style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(Settings)
