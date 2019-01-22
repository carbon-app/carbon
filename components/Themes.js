import React from 'react'

import Dropdown from './Dropdown'
import Input from './Input'
import Button from './Button'
import ListSetting from './ListSetting'
import Popout, { managePopout } from './Popout'
import ColorPicker from './ColorPicker'
import ThemeIcon from './svg/Theme'
import RemoveIcon from './svg/Remove'
import { THEMES, HIGHLIGHT_KEYS, COLORS, DEFAULT_THEME } from '../lib/constants'
import { getThemes, saveThemes, capitalize, stringifyRGBA, generateId } from '../lib/util'

const colorPickerStyle = {
  backgroundColor: COLORS.BLACK,
  padding: 0,
  margin: '4px'
}
const colorPresets = []

const HighlightPicker = ({ title, onChange, color }) => (
  <div className="color-picker-container">
    <div className="color-picker-header">
      <span>{title}</span>
    </div>
    <ColorPicker
      color={color}
      onChange={onChange}
      presets={colorPresets}
      style={colorPickerStyle}
    />
    <style jsx>
      {`
        .color-picker-container {
          width: 218px;
          border-left: 2px solid ${COLORS.SECONDARY};
          padding: 2px;
        }

        .color-picker-header {
          background-color: ${COLORS.BLACK};
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px 0;
        }
      `}
    </style>
  </div>
)

const ThemeCreate = ({
  theme,
  themes,
  highlights,
  name,
  preset,
  selected,
  createTheme,
  applyPreset,
  updateName,
  selectHighlight,
  updateHighlight
}) => (
  <Popout pointerLeft="15px" style={{ display: 'flex' }}>
    <div className="theme-settings">
      <div className="field name-field">
        <span>Name</span>
        <Input
          title="name"
          name="name"
          placeholder="Custom Theme"
          value={name}
          onChange={updateName}
          maxLength="32"
        />
      </div>
      <div className="theme-select">
        <ListSetting
          title="Preset"
          items={themes}
          selected={preset || theme}
          onOpen={selectHighlight(null)}
          onChange={applyPreset}
        >
          {({ name }) => <span>{name}</span>}
        </ListSetting>
      </div>
      <div className="theme-colors">
        {HIGHLIGHT_KEYS.map(key => (
          <div className="field" key={key}>
            <Button
              padding="4px 4px 4px 8px"
              onClick={selectHighlight(key)}
              background={selected === key ? COLORS.HOVER : COLORS.BLACK}
            >
              <div className="row">
                <span>{capitalize(key)}</span>
                <span
                  className="color-square"
                  style={{
                    backgroundColor: highlights[key],
                    boxShadow: `inset 0px 0px 0px ${selected === key ? 2 : 1}px ${COLORS.SECONDARY}`
                  }}
                />
              </div>
            </Button>
          </div>
        ))}
      </div>
      <Button
        center
        disabled={!name}
        className="create-button"
        padding="8px 0"
        background={COLORS.SECONDARY}
        hoverBackground={COLORS.SECONDARY}
        color={COLORS.BLACK}
        onClick={createTheme}
      >
        Create +
      </Button>
    </div>
    {selected && (
      <HighlightPicker
        title={capitalize(selected)}
        color={highlights[selected]}
        onChange={updateHighlight}
      />
    )}
    <style jsx>
      {`
        .field {
          align-items: center;
          border-bottom: solid 1px ${COLORS.SECONDARY};
          display: flex;
          height: 35px;
          justify-content: space-between;
          position: relative;
        }

        .field:nth-last-child(-n + 2) {
          border-width: 2px;
        }

        .row {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: space-between;
        }

        .name-field {
          padding: 8px;
        }

        .theme-select {
          width: 100%;
        }

        .theme-settings {
          display: flex;
          flex-direction: column;
          width: 224px;
        }

        .theme-colors {
          display: flex;
          flex-wrap: wrap;
          border-top: 2px solid ${COLORS.SECONDARY};
          text-transform: capitalize;
        }

        .theme-colors .field {
          width: 50%;
        }

        .theme-colors .field:nth-child(odd) {
          border-right: 1px solid ${COLORS.SECONDARY};
        }

        .color-square {
          border-radius: 3px;
          padding: 12px;
        }
      `}
    </style>
  </Popout>
)

const ThemeItem = ({ children, item, isSelected, onClick }) => (
  <div className="theme-item">
    {children}
    {item.custom && !isSelected && (
      <div className="icon" onClick={onClick(item.id)}>
        <RemoveIcon color={COLORS.SECONDARY} />
      </div>
    )}
    <style jsx>
      {`
        .theme-item {
          display: flex;
          flex: 1;
          justify-content: ${item.id === 'create' ? 'center' : 'space-between'};
          align-items: center;
        }

        .icon {
          display: flex;
          margin-right: 6px;
        }
      `}
    </style>
  </div>
)

const themeIcon = <ThemeIcon />

class Themes extends React.PureComponent {
  selectedTheme = DEFAULT_THEME

  state = {
    themes: THEMES,
    preset: this.props.theme,
    highlights: {},
    name: 'Custom Theme',
    selected: null
  }

  componentDidMount() {
    const storedThemes = getThemes(localStorage) || []

    this.setState(({ themes }) => {
      const newThemes = [...storedThemes, ...themes]

      const name = `Custom Theme ${newThemes.filter(({ name }) => name.startsWith('Custom Theme'))
        .length + 1}`

      this.selectedTheme = newThemes.find(({ id }) => id === this.props.theme) || DEFAULT_THEME

      return {
        themes: newThemes,
        highlights: this.selectedTheme.highlights,
        name
      }
    })
  }

  applyPreset = preset =>
    this.setState(({ themes }) => ({
      preset,
      highlights: themes.find(({ id }) => id === preset).highlights
    }))

  handleDropdown = ({ id }) => {
    if (id === 'create') {
      this.props.toggleVisibility()
    } else {
      this.props.updateTheme(id)
    }
  }

  updateName = ({ target: { value: name } }) => this.setState({ name })

  selectHighlight = highlight => () =>
    this.setState(({ selected }) => ({
      selected: selected === highlight ? null : highlight
    }))

  updateHighlight = ({ rgb }) =>
    this.setState({
      highlights: {
        ...this.state.highlights,
        [this.state.selected]: stringifyRGBA(rgb)
      }
    })

  removeTheme = id => event => {
    event.stopPropagation()

    const { themes } = this.state

    const newThemes = themes.filter(t => t.id !== id)

    saveThemes(localStorage, newThemes.filter(({ custom }) => custom))

    if (this.props.theme === id) {
      this.props.updateTheme(DEFAULT_THEME.id)
    } else {
      this.setState({ themes: newThemes })
    }
  }

  createTheme = () => {
    const { themes, name, highlights } = this.state

    const id = `theme:${generateId()}`

    const newTheme = {
      id,
      name,
      highlights,
      custom: true
    }

    const customThemes = [newTheme, ...themes.filter(({ custom }) => custom)]

    saveThemes(localStorage, customThemes)

    this.props.updateTheme(id)
  }

  itemWrapper = props => <ThemeItem {...props} onClick={this.removeTheme} />

  render() {
    const { theme, isVisible, toggleVisibility } = this.props
    const { name, themes, highlights, selected, preset } = this.state

    const dropdownValue = isVisible ? { name } : { id: theme, name: this.selectedTheme.name }

    const dropdownList = [
      {
        id: 'create',
        name: 'Create +'
      },
      ...themes
    ]

    return (
      <div className="themes">
        <Dropdown
          icon={themeIcon}
          disableInput={isVisible}
          inputValue={dropdownValue}
          selected={dropdownValue}
          list={dropdownList}
          itemWrapper={this.itemWrapper}
          onChange={this.handleDropdown}
          onOpen={isVisible && toggleVisibility}
        />
        {isVisible && (
          <ThemeCreate
            key={theme}
            preset={preset}
            name={name}
            theme={theme}
            themes={themes}
            highlights={highlights}
            selected={selected}
            applyPreset={this.applyPreset}
            createTheme={this.createTheme}
            updateName={this.updateName}
            selectHighlight={this.selectHighlight}
            updateHighlight={this.updateHighlight}
          />
        )}
        <style jsx>
          {`
            .themes {
              position: relative;
            }

            :global(.react-codemirror2 .CodeMirror) {
              color: ${highlights.text} !important;
              background-color: ${highlights.background} !important;
            }

            :global(.cm-string),
            :global(.cm-string-2) {
              color: ${highlights.string} !important;
            }
            :global(.cm-comment) {
              color: ${highlights.comment} !important;
            }
            :global(.cm-variable),
            :global(.cm-variable-2),
            :global(.cm-variable-3) {
              color: ${highlights.variable} !important;
            }
            :global(.cm-number) {
              color: ${highlights.number} !important;
            }
            :global(.cm-keyword) {
              color: ${highlights.keyword} !important;
            }
            :global(.cm-property) {
              color: ${highlights.property} !important;
            }
            :global(.cm-def) {
              color: ${highlights.definition} !important;
            }
            :global(.cm-meta) {
              color: ${highlights.meta} !important;
            }
          `}
        </style>
      </div>
    )
  }
}

export default managePopout(Themes)
