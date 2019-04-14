import React from 'react'
import dynamic from 'next/dynamic'

import Dropdown from '../Dropdown'
import { managePopout } from '../Popout'
import ThemeIcon from '../svg/Theme'
import RemoveIcon from '../svg/Remove'
import { COLORS, DEFAULT_THEME } from '../../lib/constants'
import { getRouteState } from '../../lib/routing'

const ThemeCreate = dynamic(() => import('./ThemeCreate'), {
  loading: () => null
})

const ThemeItem = ({ children, item, isSelected, remove }) => (
  <div className="theme-item">
    {children}
    {item.custom && !isSelected && (
      <div
        role="button"
        tabIndex={0}
        className="icon"
        onClick={e => {
          e.stopPropagation()
          remove(item.id)
        }}
      >
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

const getCustomName = themes =>
  `Custom Theme ${themes.filter(({ name }) => name.startsWith('Custom Theme')).length + 1}`

class Themes extends React.PureComponent {
  state = {
    highlights: {},
    name: ''
  }

  componentDidMount() {
    const { queryState } = getRouteState(this.props.router)

    if (queryState.highlights) {
      this.updateHighlights(queryState.highlights)
    }
  }

  dropdown = React.createRef()

  static getDerivedStateFromProps(props) {
    if (!props.isVisible) {
      const themeConfig =
        (props.themes && props.themes.find(t => t.id === props.theme)) || DEFAULT_THEME
      return {
        highlights: themeConfig.highlights,
        name: getCustomName(props.themes)
      }
    }
    return null
  }

  handleThemeSelected = theme => {
    const { toggleVisibility, update } = this.props
    if (theme.id === 'create') {
      toggleVisibility()
      this.dropdown.current.closeMenu()
    } else {
      update(theme.id)
    }
  }

  updateHighlights = updates =>
    this.setState(({ highlights }) => ({
      highlights: {
        ...highlights,
        ...updates
      }
    }))

  create = theme => {
    this.props.toggleVisibility()
    this.props.create(theme)
  }

  itemWrapper = props => <ThemeItem {...props} remove={this.props.remove} />

  render() {
    const { themes, theme, isVisible, toggleVisibility } = this.props
    const { highlights } = this.state

    const themeConfig = themes.find(t => t.id === theme) || DEFAULT_THEME

    const dropdownValue = isVisible ? { name: this.state.name } : themeConfig

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
          selected={dropdownValue}
          list={dropdownList}
          itemWrapper={this.itemWrapper}
          onChange={this.handleThemeSelected}
          onOpen={isVisible && toggleVisibility}
        />
        {isVisible && (
          <ThemeCreate
            theme={themeConfig}
            themes={themes}
            highlights={highlights}
            create={this.create}
            updateHighlights={this.updateHighlights}
            name={this.state.name}
            onInputChange={e => this.setState({ name: e.target.value })}
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
