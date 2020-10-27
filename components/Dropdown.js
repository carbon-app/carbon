import React from 'react'
import Downshift from 'downshift'
import { matchSorter } from 'match-sorter'
import VisuallyHidden from '@reach/visually-hidden'
import { Down as ArrowDown } from './svg/Arrows'
import CheckMark from './svg/Checkmark'
import { COLORS } from '../lib/constants'

class Dropdown extends React.PureComponent {
  state = {
    inputValue: this.props.selected.name,
    itemsToShow: this.props.list,
  }

  onUserAction = changes => {
    this.setState(({ inputValue, itemsToShow }) => {
      if (Object.prototype.hasOwnProperty.call(changes, 'inputValue')) {
        if (changes.type === Downshift.stateChangeTypes.keyDownEscape) {
          inputValue = this.userInputtedValue
        } else if (changes.type === Downshift.stateChangeTypes.changeInput) {
          inputValue = changes.inputValue
          this.userInputtedValue = changes.inputValue
        } else {
          inputValue = changes.inputValue
        }
      }

      itemsToShow = this.userInputtedValue
        ? matchSorter(this.props.list, this.userInputtedValue, { keys: ['name'] })
        : this.props.list

      if (
        Object.prototype.hasOwnProperty.call(changes, 'highlightedIndex') &&
        (changes.type === Downshift.stateChangeTypes.keyDownArrowUp ||
          changes.type === Downshift.stateChangeTypes.keyDownArrowDown)
      ) {
        inputValue = itemsToShow[changes.highlightedIndex].name
        this.props.onChange(itemsToShow[changes.highlightedIndex])
      }

      if (Object.prototype.hasOwnProperty.call(changes, 'isOpen')) {
        this.userInputtedValue = ''

        // clear on open
        if (changes.isOpen) {
          inputValue = ''
          this.props.onOpen && this.props.onOpen()
        } else if (changes.isOpen === false && !inputValue) {
          // set on close
          inputValue = this.props.selected.name
        }
      }

      return { inputValue, itemsToShow }
    })
  }

  userInputtedValue = ''

  render() {
    const {
      innerRef,
      color,
      selected,
      onChange,
      itemWrapper,
      icon,
      disableInput,
      title,
    } = this.props
    const { itemsToShow, inputValue } = this.state

    const labelId = title ? `${title.toLowerCase()}-dropdown` : undefined

    return (
      <Downshift
        ref={innerRef}
        inputValue={inputValue}
        selectedItem={selected}
        defaultHighlightedIndex={itemsToShow.findIndex(it => it === selected)}
        itemToString={item => item.name}
        onChange={onChange}
        onUserAction={this.onUserAction}
        labelId={labelId}
      >
        {renderDropdown({
          color,
          list: itemsToShow,
          selected,
          itemWrapper,
          icon,
          disableInput,
          title,
          labelId,
        })}
      </Downshift>
    )
  }
}

const renderDropdown = ({ color, list, itemWrapper, icon, disableInput, title, labelId }) => ({
  isOpen,
  highlightedIndex,
  selectedItem,
  getRootProps,
  getToggleButtonProps,
  getInputProps,
  getItemProps,
}) => {
  return (
    <DropdownContainer {...getRootProps({ refKey: 'innerRef' })}>
      {title && <VisuallyHidden id={labelId}>{title}</VisuallyHidden>}
      <DropdownIcon isOpen={isOpen}>{icon}</DropdownIcon>
      <SelectedItem
        getToggleButtonProps={getToggleButtonProps}
        getInputProps={getInputProps}
        isOpen={isOpen}
        color={color}
        hasIcon={!!icon}
        disabled={disableInput}
      >
        {selectedItem.name}
      </SelectedItem>
      {isOpen ? (
        <ListItems color={color}>
          {list.map((item, index) => (
            <ListItem
              key={index}
              color={color}
              item={item}
              itemWrapper={itemWrapper}
              {...getItemProps({
                item,
                isSelected: selectedItem.name === item.name,
                isHighlighted: highlightedIndex === index,
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

const DropdownContainer = ({ children, innerRef, ...rest }) => {
  return (
    <div {...rest} ref={innerRef} className="dropdown-container">
      {children}
      <style jsx>
        {`
          .dropdown-container {
            position: relative;
            cursor: pointer;
            user-select: none;
            margin-left: 40px;
          }
        `}
      </style>
    </div>
  )
}

const DropdownIcon = ({ children, isOpen }) => {
  if (children) {
    return (
      <div className="dropdown-icon">
        {children}
        <style jsx>
          {`
            .dropdown-icon {
              position: absolute;
              left: -${isOpen ? 38 : 39}px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              box-shadow: inset 0px 0px 0px ${isOpen ? 2 : 1}px white;
              border-radius: 3px 0 0 3px;
              cursor: initial;
            }
          `}
        </style>
      </div>
    )
  } else {
    return null
  }
}

const SelectedItem = ({
  getToggleButtonProps,
  getInputProps,
  children,
  isOpen,
  color,
  hasIcon,
  disabled,
}) => {
  const itemColor = color || COLORS.SECONDARY

  return (
    <span
      {...getToggleButtonProps({ tabIndex: 0 })}
      className={`dropdown-display ${isOpen ? 'is-open' : ''}`}
      data-cy="theme-selector-button"
    >
      <input
        {...getInputProps({ placeholder: children, id: `downshift-input-${children}`, disabled })}
        className="dropdown-display-text"
        spellCheck={false}
      />
      <div className="dropdown-arrow">
        <ArrowDown color={itemColor} />
      </div>
      <style jsx>
        {`
          .dropdown-display {
            display: flex;
            align-items: center;
            height: 40px;
            padding: 0 16px;
            box-shadow: inset 0px 0px 0px 1px ${itemColor};
            border-radius: ${hasIcon ? '0 3px 3px 0' : '3px'};
            outline: none;
          }
          .dropdown-display:hover,
          .dropdown-display:focus {
            background: ${COLORS.HOVER};
          }

          .dropdown-display.is-open {
            border-radius: ${hasIcon ? '0 3px 0 0' : '3px 3px 0 0'};
            box-shadow: inset 0px 0px 0px 2px ${itemColor};
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

          .dropdown-arrow {
            display: flex;
          }

          .is-open > .dropdown-arrow {
            transform: rotate(180deg);
          }
        `}
      </style>
    </span>
  )
}

const ListItems = ({ children, color }) => {
  return (
    <ul role="listbox" className="dropdown-list">
      {children}
      <style jsx>
        {`
          .dropdown-list {
            margin-top: -2px;
            border: 2px solid ${color || COLORS.SECONDARY};
            border-radius: 0 0 3px 3px;
            max-height: 350px;
            overflow-y: scroll;
          }
        `}
      </style>
    </ul>
  )
}

const ListItem = ({ children, color, isHighlighted, isSelected, itemWrapper, item, ...rest }) => {
  const itemColor = color || COLORS.SECONDARY

  return (
    <li {...rest} className="dropdown-list-item" data-cy="dropdown-item">
      {itemWrapper ? (
        itemWrapper({ children, color: itemColor, item, isSelected })
      ) : (
        <span className="dropdown-list-item-text">{children}</span>
      )}
      {isSelected ? <CheckMark /> : null}
      <style jsx>
        {`
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
        `}
      </style>
    </li>
  )
}

export default Dropdown
