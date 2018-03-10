import React from 'react'
import Downshift from 'downshift'
import matchSorter from 'match-sorter'
import ArrowDown from './svg/Arrowdown'
import CheckMark from './svg/Checkmark'
import { COLORS } from '../lib/constants'

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
    this.userInputtedValue = ''
  }

  onUserAction = changes => {
    this.setState(({ inputValue }) => {
      const isClosingMenu = changes.hasOwnProperty('isOpen') && !changes.isOpen

      if (changes.hasOwnProperty('inputValue')) {
        if (changes.type === Downshift.stateChangeTypes.keyDownEscape) {
          inputValue = this.userInputtedValue
        } else {
          inputValue = changes.inputValue
          this.userInputtedValue = changes.inputValue
        }
      }

      if (isClosingMenu) {
        this.userInputtedValue = ''
      }
      return { inputValue }
    })
  }

  render() {
    const { button, color, list, selected, onChange } = this.props
    const newList = this.userInputtedValue
      ? matchSorter(list, this.state.inputValue, { keys: ['name'] })
      : list

    return (
      <Downshift
        render={renderDropdown({ button, color, list: newList, selected })}
        selectedItem={selected}
        defaultHighlightedIndex={list.findIndex(it => it === selected)}
        itemToString={item => item.name}
        onChange={onChange}
        stateReducer={reduceState(list)}
        onUserAction={this.onUserAction}
      />
    )
  }
}

const reduceState = list => (state, changes) => {
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownArrowUp:
    case Downshift.stateChangeTypes.keyDownArrowDown:
      return { ...changes, selectedItem: list[changes.highlightedIndex] }
    default:
      return changes
  }
}

const renderDropdown = ({ button, color, list, selected }) => ({
  isOpen,
  highlightedIndex,
  setHighlightedIndex,
  selectHighlightedItem,
  selectedItem,
  getRootProps,
  getButtonProps,
  getInputProps,
  getItemProps,
  inputValue,
  typeable
}) => {
  return (
    <DropdownContainer
      {...getRootProps({ refKey: 'innerRef' })}
      minWidth={minWidth(button, selected, list)}
    >
      <SelectedItem
        {...getButtonProps()}
        getInputProps={getInputProps}
        isOpen={isOpen}
        color={color}
        button={button}
      >
        {selectedItem.name}
      </SelectedItem>
      {isOpen ? (
        <ListItems color={color}>
          {list.map((item, index) => (
            <ListItem
              key={index}
              color={color}
              {...getItemProps({
                item,
                isSelected: selectedItem === item,
                isHighlighted: highlightedIndex === index
              })}
            >
              {item.name}
            </ListItem>
          ))}
        </ListItems>
      ) : null}
    </DropdownContainer>
  )
}

const DropdownContainer = ({ children, innerRef, minWidth, ...rest }) => {
  return (
    <div {...rest} ref={innerRef} className="dropdown-container">
      {children}
      <style jsx>{`
        .dropdown-container {
          min-width: ${minWidth}px;
          cursor: pointer;
          user-select: none;
        }
      `}</style>
    </div>
  )
}

const SelectedItem = ({ getInputProps, children, isOpen, color, button, ...rest }) => {
  const itemColor = color || COLORS.SECONDARY

  return (
    <span {...rest} tabIndex="0" className={`dropdown-display ${isOpen ? 'is-open' : ''}`}>
      {button ? (
        <span className="dropdown-display-text">{children}</span>
      ) : (
        <input {...getInputProps({ placeholder: children })} className="dropdown-display-text" />
      )}
      <div role="button" className={`dropdown-arrow`}>
        <ArrowDown fill={itemColor} />
      </div>
      <style jsx>{`
        .dropdown-display {
          display: flex;
          align-items: center;
          height: 100%;
          border: 1px solid ${itemColor};
          border-radius: 3px;
          padding: 8px 16px;
          outline: none;
        }
        .dropdown-display:hover {
          background: ${COLORS.HOVER};
        }

        .dropdown-display.is-open {
          border-radius: 3px 3px 0 0;
        }

        .dropdown-display-text {
          flex-grow: 1;
          color: ${itemColor};
          background: transparent;
          border: none;
          outline: none;
          font-size: inherit;
          font-family: inherit;
        }
        .is-open > .dropdown-arrow {
          transform: rotate(180deg);
        }
      `}</style>
    </span>
  )
}

const ListItems = ({ children, color }) => {
  return (
    <ul role="listbox" className="dropdown-list">
      {children}
      <style jsx>{`
        .dropdown-list {
          margin-top: -1px;
          border: 1px solid ${color || COLORS.SECONDARY};
          border-radius: 0 0 3px 3px;
          max-height: 350px;
          overflow-y: scroll;
        }
      `}</style>
    </ul>
  )
}

const ListItem = ({ children, color, isHighlighted, isSelected, ...rest }) => {
  const itemColor = color || COLORS.SECONDARY

  return (
    <li {...rest} role="option" className="dropdown-list-item">
      <span className="dropdown-list-item-text">{children}</span>
      {isSelected ? <CheckMark /> : null}
      <style jsx>{`
        .dropdown-list-item {
          display: flex;
          align-items: center;
          background: ${isHighlighted ? COLORS.HOVER : COLORS.BLACK};
          padding: 8px 16px;
          border-bottom: 1px solid ${itemColor};
        }

        .dropdown-list-item:last-child {
          border-bottom: none;
        }

        .dropdown-list-item:hover {
          background: ${COLORS.HOVER};
        }
        .dropdown-list-item-text {
          flex-grow: 1;
          color: ${itemColor};
        }
      `}</style>
    </li>
  )
}

function minWidth(isButton, selected, list) {
  const items = isButton ? [...list, selected] : list

  return items.reduce((max, { name }) => {
    const wordSize = name.length * 10 + 32
    return wordSize > max ? wordSize : max
  }, 0)
}

Dropdown.defaultProps = {}

export default Dropdown
