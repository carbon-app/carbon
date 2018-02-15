import React from 'react'
import Downshift from 'downshift'
import ArrowDown from './svg/Arrowdown'
import CheckMark from './svg/Checkmark'
import { COLORS } from '../lib/constants'

const Dropdown = ({ list, selected, onChange }) => {
  return (
    <Downshift
      render={renderDropdown(list)}
      selectedItem={selected}
      defaultHighlightedIndex={list.findIndex(it => it === selected)}
      itemToString={item => item.name}
      onChange={onChange}
      stateReducer={reduceState(list)}
    />
  )
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

const renderDropdown = list => ({
  isOpen,
  highlightedIndex,
  setHighlightedIndex,
  selectHighlightedItem,
  selectedItem,
  getRootProps,
  getButtonProps,
  getInputProps,
  getItemProps
}) => {
  return (
    <DropdownContainer {...getRootProps({ refKey: 'innerRef' })} minWidth={minWidth(list)}>
      <SelectedItem {...getButtonProps()} {...getInputProps()} isOpen={isOpen}>
        {selectedItem.name}
      </SelectedItem>
      {isOpen ? (
        <ListItems>
          {list.map((item, index) => (
            <ListItem
              key={index}
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
        }
      `}</style>
    </div>
  )
}

const SelectedItem = ({ children, isOpen, ...rest }) => {
  return (
    <span {...rest} tabIndex="0" className="dropdown-display">
      <span className="dropdown-display-text">{children}</span>
      <div className={`dropdown-arrow ${isOpen ? 'is-reverse' : ''}`}>
        <ArrowDown />
      </div>
      <style jsx>{`
        .dropdown-display {
          display: flex;
          align-items: center;
          height: 100%;
          border: 1px solid ${COLORS.SECONDARY};
          border-radius: 3px;
          padding: 8px 16px;
        }
        .dropdown-display-text {
          flex-grow: 1;
        }
        .dropdown-arrow.is-reverse {
          transform: rotate(180deg);
        }
      `}</style>
    </span>
  )
}

const ListItems = ({ children }) => {
  return (
    <ul className="dropdown-list">
      {children}
      <style jsx>{`
        .dropdown-list {
          margin-top: -1px;
          border: 1px solid ${COLORS.SECONDARY};
          border-radius: 0 0 3px 3px;
          max-height: 350px;
          overflow-y: scroll;
        }
      `}</style>
    </ul>
  )
}

const ListItem = ({ children, isHighlighted, isSelected, ...rest }) => {
  return (
    <li {...rest} className="dropdown-list-item">
      <span className="dropdown-list-item-text">{children}</span>
      {isSelected ? <CheckMark /> : null}
      <style jsx>{`
        .dropdown-list-item {
          display: flex;
          align-items: center;
          background: ${isHighlighted ? COLORS.HOVER : COLORS.BLACK};
          padding: 8px 16px;
          border-bottom: 1px solid ${COLORS.SECONDARY};
        }
        .dropdown-list-item:hover {
          background: ${COLORS.HOVER};
        }
        .dropdown-list-item-text {
          flex-grow: 1;
        }
      `}</style>
    </li>
  )
}

function minWidth(list) {
  return list.reduce((max, { name }) => {
    const wordSize = name.length * 12
    return wordSize > max ? wordSize : max
  }, 0)
}

export default Dropdown
