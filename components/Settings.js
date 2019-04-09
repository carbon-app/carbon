import React from 'react'
import omitBy from 'lodash.omitby'

import ThemeSelect from './ThemeSelect'
import FontSelect from './FontSelect'
import Slider from './Slider'
import Toggle from './Toggle'
import Popout, { managePopout } from './Popout'
import Button from './Button'
import Presets from './Presets'
import { COLORS, DEFAULT_PRESETS } from '../lib/constants'
import { toggle, getPresets, savePresets, generateId } from '../lib/util'
import SettingsIcon from './svg/Settings'
import * as Arrows from './svg/Arrows'

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
    watermark,
    onWidthChanging,
    onWidthChanged
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
            onMouseDown={onWidthChanging}
            onMouseUp={onWidthChanged}
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

const TypeSettings = React.memo(
  ({ onChange, font, size, lineHeight, onWidthChanging, onWidthChanged }) => {
    return (
      <div className="settings-content">
        <FontSelect selected={font} onChange={onChange} />
        <Slider
          label="Size"
          value={size}
          minValue={10}
          maxValue={18}
          step={0.5}
          onChange={onChange.bind(null, 'fontSize')}
          onMouseDown={onWidthChanging}
          onMouseUp={onWidthChanged}
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
  }
)

const resetButtonStyle = { borderTop: `1px solid ${COLORS.SECONDARY}` }

const MiscSettings = React.memo(({ format, reset }) => {
  return (
    <div className="settings-content">
      <Button center onClick={format}>
        Prettify code
      </Button>
      <Button center color={COLORS.RED} onClick={reset} style={resetButtonStyle}>
        Reset settings
      </Button>
      <style jsx>
        {`
          .settings-content {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  )
})

const MenuButton = React.memo(({ name, select, selected }) => {
  return (
    <div className="menu-button">
      <Button
        padding="8px"
        onClick={select(name)}
        background={selected === name ? COLORS.BLACK : COLORS.DARK_GRAY}
      >
        {name}
        <div className="arrow-icon">
          <Arrows.Right />
        </div>
      </Button>
      <style jsx>
        {`
          .menu-button {
            display: flex;
            height: 33px;
            border-bottom: 1px solid ${COLORS.SECONDARY};
            position: relative;
            align-items: center;
          }

          .menu-button:last-child {
            ${selected === 'Window' ? '' : 'border-bottom: none;'};
          }

          .arrow-icon {
            position: absolute;
            right: 14px;
            top: 11px;
          }
        `}
      </style>
    </div>
  )
})

const settingButtonStyle = {
  width: '40px',
  height: '100%'
}

class Settings extends React.PureComponent {
  state = {
    presets: DEFAULT_PRESETS,
    selectedMenu: 'Window',
    showPresets: true,
    previousSettings: null,
    widthChanging: false
  }

  settingsRef = React.createRef()

  presetContentRef = React.createRef()

  componentDidMount() {
    const storedPresets = getPresets(localStorage) || []
    this.setState(({ presets }) => ({
      presets: [...storedPresets, ...presets]
    }))
  }

  togglePresets = () => this.setState(toggle('showPresets'))

  selectMenu = selectedMenu => () => this.setState({ selectedMenu })

  handleWidthChanging = () => {
    const rect = this.settingsRef.current.getBoundingClientRect()
    this.settingPosition = { top: rect.bottom, left: rect.left }
    this.setState({ widthChanging: true })
  }

  handleWidthChanged = () => this.setState({ widthChanging: false })

  handleChange = (key, value) => {
    this.props.onChange(key, value)
    this.setState({ previousSettings: null })
  }

  handleReset = () => {
    this.props.resetDefaultSettings()
    this.setState({ previousSettings: null })
  }

  getSettingsFromProps = () =>
    omitBy(this.props, (v, k) => typeof v === 'function' || k === 'preset')

  applyPreset = preset => {
    const previousSettings = this.getSettingsFromProps()

    this.props.applyPreset(preset)

    // TODO: this is a hack to prevent the scrollLeft position from changing when preset is applied
    const { scrollLeft: previousScrollLeft } = this.presetContentRef.current
    this.setState({ previousSettings }, () => {
      this.presetContentRef.current.scrollLeft = previousScrollLeft
    })
  }

  undoPreset = () => {
    this.props.applyPreset({ ...this.state.previousSettings, id: null })
    this.setState({ previousSettings: null })
  }

  removePreset = id => {
    if (this.props.preset === id) {
      this.props.onChange('preset', null)
      this.setState({ previousSettings: null })
    }
    this.setState(
      ({ presets }) => ({ presets: presets.filter(p => p.id !== id) }),
      this.savePresets
    )
  }

  createPreset = async () => {
    const newPreset = this.getSettingsFromProps()

    newPreset.id = `preset:${generateId()}`
    newPreset.custom = true

    newPreset.icon = await this.props.getCarbonImage({
      format: 'png',
      squared: true,
      exportSize: 1
    })

    this.props.onChange('preset', newPreset.id)

    this.setState(
      ({ presets }) => ({
        previousSettings: null,
        presets: [newPreset, ...presets]
      }),
      this.savePresets
    )
  }

  savePresets = () => savePresets(localStorage, this.state.presets.filter(p => p.custom))

  renderContent = () => {
    switch (this.state.selectedMenu) {
      case 'Window':
        return (
          <WindowSettings
            onChange={this.handleChange}
            onWidthChanging={this.handleWidthChanging}
            onWidthChanged={this.handleWidthChanged}
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
            onWidthChanging={this.handleWidthChanging}
            onWidthChanged={this.handleWidthChanged}
            font={this.props.fontFamily}
            size={this.props.fontSize}
            lineHeight={this.props.lineHeight}
          />
        )
      case 'Misc':
        return <MiscSettings format={this.props.format} reset={this.handleReset} />
      default:
        return null
    }
  }

  render() {
    const { selectedMenu, showPresets, presets, previousSettings, widthChanging } = this.state
    const { preset, isVisible, toggleVisibility } = this.props

    return (
      <div className="settings-container" ref={this.settingsRef}>
        <Button
          border
          center
          selected={isVisible}
          style={settingButtonStyle}
          onClick={toggleVisibility}
        >
          <SettingsIcon />
        </Button>
        <Popout
          pointerLeft="15px"
          hidden={!isVisible}
          style={{
            position: widthChanging ? 'fixed' : 'absolute',
            width: '316px',
            top: widthChanging ? this.settingPosition.top : 'initial',
            left: widthChanging ? this.settingPosition.left : 'initial'
          }}
        >
          <Presets
            show={showPresets}
            presets={presets}
            selected={preset}
            toggle={this.togglePresets}
            apply={this.applyPreset}
            undo={this.undoPreset}
            remove={this.removePreset}
            create={this.createPreset}
            applied={!!previousSettings}
            contentRef={this.presetContentRef}
          />
          <div className="settings-bottom">
            <div className="settings-menu">
              <MenuButton name="Window" select={this.selectMenu} selected={selectedMenu} />
              <MenuButton name="Type" select={this.selectMenu} selected={selectedMenu} />
              <MenuButton name="Misc" select={this.selectMenu} selected={selectedMenu} />
            </div>
            {this.renderContent()}
          </div>
        </Popout>
        <style jsx>
          {`
            .settings-container {
              position: relative;
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
              border-left: 2px solid ${COLORS.SECONDARY};
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

export default managePopout(Settings)
