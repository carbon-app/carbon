import React from 'react'
import omitBy from 'lodash.omitby'
import { useKeyboardListener } from 'actionsack'

import ThemeSelect from './ThemeSelect'
import FontSelect from './FontSelect'
import Slider from './Slider'
import Input from './Input'
import Toggle from './Toggle'
import Popout, { managePopout } from './Popout'
import Button from './Button'
import Presets from './Presets'
import MenuButton from './MenuButton'
import { COLORS, DEFAULT_PRESETS, DEFAULT_SETTINGS, DEFAULT_WIDTHS } from '../lib/constants'
import { toggle, getPresets, savePresets, generateId, fileToJSON } from '../lib/util'
import SettingsIcon from './svg/Settings'

function KeyboardShortcut({ trigger, handle }) {
  useKeyboardListener(trigger, handle)
  return null
}

function WindowSettings({
  onChange,
  windowTheme,
  paddingHorizontal,
  paddingVertical,
  dropShadow,
  dropShadowBlurRadius,
  dropShadowOffsetY,
  windowControls,
  widthAdjustment,
  width,
  watermark,
  onWidthChanging,
  onWidthChanged,
}) {
  return (
    <div className="settings-content">
      <ThemeSelect
        selected={windowTheme || 'none'}
        windowControls={windowControls}
        onChange={onChange}
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
        label="Auto-adjust width"
        enabled={widthAdjustment}
        onChange={onChange.bind(null, 'widthAdjustment')}
      />
      {!widthAdjustment && (
        <div className="row settings-row width-row">
          <Input
            label="Width"
            type="number"
            value={width}
            min={DEFAULT_WIDTHS.minWidth}
            max={DEFAULT_WIDTHS.maxWidth}
            onChange={e => onChange('width', e.target.value)}
            width="50%"
          />
        </div>
      )}
      <Toggle label="Watermark" enabled={watermark} onChange={onChange.bind(null, 'watermark')} />
      <style jsx>
        {`
          .width-row {
            justify-content: space-between;
            padding: 8px 12px 8px 8px;
          }

          .row > :global(div:first-child) {
            border-right: 1px solid ${COLORS.SECONDARY};
          }

          .drop-shadow-options :global(.slider-bg),
          .drop-shadow-options :global(label) {
            opacity: 0.5;
          }

          .settings-content :global(.settings-row:focus-within) {
            outline: -webkit-focus-ring-color auto 4px;
          }
        `}
      </style>
    </div>
  )
}

function EditorSettings({
  onChange,
  onUpload,
  font,
  size,
  lineHeight,
  lineNumbers,
  firstLineNumber,
  hiddenCharacters,
  onWidthChanging,
  onWidthChanged,
}) {
  return (
    <div className="settings-content">
      <FontSelect
        selected={font}
        onUpload={onUpload}
        onChange={onChange.bind(null, 'fontFamily')}
      />
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
        unit="%"
        onChange={onChange.bind(null, 'lineHeight')}
      />
      <Toggle
        label="Line numbers"
        enabled={lineNumbers}
        onChange={onChange.bind(null, 'lineNumbers')}
      />
      {lineNumbers && (
        <div className="row settings-row first-line-number-row">
          <Input
            label="First line number"
            type="number"
            value={firstLineNumber}
            min={0}
            onChange={e => onChange('firstLineNumber', Number(e.target.value))}
            width="50%"
          />
        </div>
      )}
      <Toggle
        label="Hidden characters"
        enabled={hiddenCharacters}
        onChange={onChange.bind(null, 'hiddenCharacters')}
      />
      <style jsx>
        {`
          .first-line-number-row {
            padding: 8px 12px 8px 8px;
          }
        `}
      </style>
    </div>
  )
}

const resetButtonStyle = { borderTop: `1px solid ${COLORS.SECONDARY}` }

function MiscSettings({ format, reset, applyPreset, settings }) {
  const input = React.useRef(null)
  let download
  try {
    download = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(settings))}`
  } catch (error) {
    // pass
  }
  return (
    <div className="settings-content">
      <div className="row">
        <input
          hidden
          ref={input}
          type="file"
          accept=".json"
          onChange={async e => {
            const json = await fileToJSON(e.target.files[0])
            if (json) {
              applyPreset(json)
            }
          }}
        />
        <Button
          center
          style={{ borderRight: `1px solid ${COLORS.SECONDARY}` }}
          onClick={() => input.current.click()}
        >
          Import config
        </Button>
        <Button center Component="a" href={download} download="carbon-config.json">
          Export config
        </Button>
      </div>
      <Button center onClick={format} style={resetButtonStyle}>
        Prettify code
      </Button>
      <Button center color={COLORS.RED} onClick={reset} style={resetButtonStyle}>
        Reset settings
      </Button>
      <style jsx>
        {`
          .row {
            flex: 1;
          }
          .settings-content {
            display: flex;
            flex-direction: column;
          }
          .settings-content :global(a) {
            display: flex;
            flex: 1;
            user-drag: none;
          }
        `}
      </style>
    </div>
  )
}

const settingButtonStyle = {
  width: '40px',
  height: '100%',
}

const invalidSetting = (v, k) =>
  // Allow highlights in presets and config exports
  !(Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, k) || k === 'highlights')

class Settings extends React.PureComponent {
  state = {
    presets: DEFAULT_PRESETS,
    selectedMenu: 'Window',
    showPresets: true,
    previousSettings: null,
    widthChanging: false,
  }

  settingsRef = React.createRef()
  menuRef = React.createRef()

  componentDidMount() {
    const storedPresets = getPresets(localStorage) || []
    this.setState(({ presets }) => ({
      presets: [...storedPresets, ...presets],
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

  handleOpenAndFocus = () => {
    this.props.toggleVisibility()
    if (!this.props.isVisible) {
      this.menuRef.current.focus()
    }
  }

  handleReset = () => {
    this.props.resetDefaultSettings()
    this.setState({ previousSettings: null })
  }

  handleFontUpload = (id, url) => {
    this.props.onChange('fontFamily', id)
    this.props.onChange('fontUrl', url)
    this.props.toggleVisibility()
  }

  getSettingsFromProps = () => omitBy(this.props, invalidSetting)

  applyPreset = preset => {
    const previousSettings = this.getSettingsFromProps()

    this.props.applyPreset(preset)

    this.setState({ previousSettings })
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
      exportSize: 1,
    })

    this.props.onChange('preset', newPreset.id)

    this.setState(
      ({ presets }) => ({
        previousSettings: null,
        presets: [newPreset, ...presets],
      }),
      this.savePresets
    )
  }

  savePresets = () => savePresets(this.state.presets.filter(p => p.custom))

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
            widthAdjustment={this.props.widthAdjustment}
            width={this.props.width}
            watermark={this.props.watermark}
          />
        )
      case 'Editor':
        return (
          <EditorSettings
            onChange={this.handleChange}
            onUpload={this.handleFontUpload}
            onWidthChanging={this.handleWidthChanging}
            onWidthChanged={this.handleWidthChanged}
            font={this.props.fontFamily}
            size={this.props.fontSize}
            lineHeight={this.props.lineHeight}
            lineNumbers={this.props.lineNumbers}
            firstLineNumber={this.props.firstLineNumber}
            hiddenCharacters={this.props.hiddenCharacters}
          />
        )
      case 'Misc': {
        const settings = this.getSettingsFromProps()
        return (
          <MiscSettings
            format={this.props.format}
            reset={this.handleReset}
            applyPreset={this.props.applyPreset}
            settings={settings}
          />
        )
      }
      default:
        return null
    }
  }

  render() {
    const { selectedMenu, showPresets, presets, previousSettings, widthChanging } = this.state
    const { preset, isVisible, toggleVisibility } = this.props

    return (
      <div className="settings-container" ref={this.settingsRef}>
        <KeyboardShortcut trigger="⌘-/" handle={this.handleOpenAndFocus} />
        <KeyboardShortcut trigger="⇧-⌘-\" handle={this.handleReset} />
        <Button
          title="Settings Menu"
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
            left: widthChanging ? this.settingPosition.left : 'initial',
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
          />
          <div className="settings-bottom">
            <div className="settings-menu" ref={this.menuRef} tabIndex={-1}>
              <MenuButton name="Window" select={this.selectMenu} selected={selectedMenu} />
              <MenuButton name="Editor" select={this.selectMenu} selected={selectedMenu} />
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

            .settings-bottom :global(.settings-content) {
              width: 100%;
              border-left: 2px solid ${COLORS.SECONDARY};
            }

            .settings-bottom :global(.settings-content > div:not(:first-child)) {
              border-top: solid 1px ${COLORS.SECONDARY};
            }
          `}
        </style>
      </div>
    )
  }
}

export default managePopout(Settings)
