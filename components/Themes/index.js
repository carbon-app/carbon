import React from 'react'
import dynamic from 'next/dynamic'

import Dropdown from '../Dropdown'
import { managePopout } from '../Popout'
import ThemeIcon from '../svg/Theme'
import RemoveIcon from '../svg/Remove'
import { THEMES, COLORS, DEFAULT_THEME } from '../../lib/constants'
import { getThemes, saveThemes, stringifyRGBA, generateId } from '../../lib/util'

const ThemeCreate = dynamic(() => import('./ThemeCreate'), {
  loading: () => null
})

const ThemeItem = ({ children, item, isSelected, onClick }) => (
  <div className="theme-item">
    {children}
    {item.custom && !isSelected && (
      <div role="button" tabIndex={0} className="icon" onClick={onClick(item.id)}>
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

  dropdown = React.createRef()

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

  handleChange = ({ id }) => {
    if (id === 'create') {
      this.props.toggleVisibility()
      this.dropdown.current.closeMenu()
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
          innerRef={this.dropdown}
          icon={themeIcon}
          disableInput={isVisible}
          inputValue={dropdownValue}
          selected={dropdownValue}
          list={dropdownList}
          itemWrapper={this.itemWrapper}
          onChange={this.handleChange}
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

            :global(.CodeMirror__container .CodeMirror) {
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
            :global(.cm-operator) {
              color: ${highlights.operator} !important;
            }
            :global(.cm-attribute) {
              color: ${highlights.attribute} !important;
            }

            :global(.cm-s-dracula .CodeMirror-cursor) {
              border-left: solid 2px #159588 !important;
            }

            :global(.cm-s-solarized) {
              box-shadow: none !important;
            }

            :global(.cm-s-solarized.cm-s-light) {
              text-shadow: #eee8d5 0 1px !important;
            }

            :global(.cm-s-solarized.cm-s-light .CodeMirror-linenumber),
            :global(.cm-s-solarized.cm-s-light .CodeMirror-linenumbers) {
              background-color: #fdf6e3 !important;
            }

            :global(.cm-s-solarized.cm-s-dark .CodeMirror-linenumber),
            :global(.cm-s-solarized.cm-s-dark .CodeMirror-linenumbers) {
              background-color: #002b36 !important;
            }
          `}
        </style>
      </div>
    )
  }
}

export default managePopout(Themes)
