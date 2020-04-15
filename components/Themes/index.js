import React from 'react'
import dynamic from 'next/dynamic'

import Dropdown from '../Dropdown'
import { managePopout } from '../Popout'
import ThemeIcon from '../svg/Theme'
import RemoveIcon from '../svg/Remove'
import { COLORS } from '../../lib/constants'

const ThemeCreate = dynamic(() => import('./ThemeCreate'), {
  loading: () => null,
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
    name: '',
  }

  dropdown = React.createRef()

  static getDerivedStateFromProps(props) {
    if (!props.isVisible) {
      return {
        name: getCustomName(props.themes),
      }
    }
    return null
  }

  handleThemeSelected = theme => {
    if (theme) {
      const { toggleVisibility, update } = this.props
      if (theme.id === 'create') {
        toggleVisibility()
        this.dropdown.current.closeMenu()
      } else {
        update(theme.id)
      }
    }
  }

  create = theme => {
    this.props.toggleVisibility()
    this.props.create(theme)
  }

  itemWrapper = props => <ThemeItem {...props} remove={this.props.remove} />

  render() {
    const { themes, theme, isVisible, toggleVisibility } = this.props

    const highlights = { ...theme.highlights, ...this.props.highlights }

    const dropdownValue = isVisible ? { name: this.state.name } : theme

    const dropdownList = [
      {
        id: 'create',
        name: 'Create +',
      },
      ...themes,
    ]

    return (
      <div className="themes" data-cy="themes-container">
        <Dropdown
          title="Theme"
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
            theme={theme}
            themes={themes}
            highlights={highlights}
            create={this.create}
            updateHighlights={this.props.updateHighlights}
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
            :global(.cm-variable) {
              color: ${highlights.variable} !important;
            }
            :global(.cm-variable-2) {
              color: ${highlights.variable2 || highlights.variable} !important;
            }
            :global(.cm-variable-3) {
              color: ${highlights.variable3 || highlights.variable} !important;
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
