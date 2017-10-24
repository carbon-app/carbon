import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import ArrowDown from './svg/Arrowdown'
import Checkmark from './svg/Checkmark'
import { COLORS } from '../lib/constants'

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false
    }
    this.select = this.select.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  select(item) {
    if (this.props.selected !== item) {
      this.props.onChange(item)
    }
  }

  toggle() {
    this.setState({ isVisible: !this.state.isVisible })
  }

  handleClickOutside() {
    this.setState({ isVisible: false })
  }

  renderListItems() {
    return this.props.list.map((item, i) => (
      <div className="dropdown-list-item" key={i} onClick={this.select.bind(null, item)}>
        <span>{item.name}</span>
        {this.props.selected === item ? <Checkmark /> : null}
        <style jsx>{`
          .dropdown-list-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: ${COLORS.BLACK};
            user-select: none;
            padding: 8px 16px;
            border-bottom: 0.5px solid ${COLORS.SECONDARY};
          }

          .dropdown-list-item:hover {
            background: ${COLORS.HOVER};
          }

          .dropdown-list-item:last-of-type {
            border-bottom: none;
            border-radius: 0px 0px 2px 2px;
          }
        `}</style>
      </div>
    ))
  }

  render() {
    // find longest list value in number of characters
    const MIN_WIDTH = this.props.list.reduce(
      (max, { name }) => (name && name.length > max ? name.length : max),
      0
    )

    return (
      <div
        className="dropdown-container"
        style={{ minWidth: MIN_WIDTH * 14 }}
        onClick={this.toggle}
      >
        <div className={`dropdown-display ${this.state.isVisible ? 'is-visible' : ''}`}>
          <span>{this.props.selected.name}</span>
          <div className="arrow-down">
            <ArrowDown />
          </div>
        </div>
        <div className="dropdown-list">{this.renderListItems()}</div>
        <style jsx>{`
          .arrow-down {
            position: absolute;
            right: 16px;
          }

          .is-visible > .arrow-down {
            transform: rotate(180deg);
          }

          .is-visible {
            border-radius: 3px 3px 0px 0px !important;
          }

          .dropdown-container {
            height: 100%;
            cursor: pointer;
          }

          .dropdown-display {
            height: 100%;
            border: 1px solid ${COLORS.SECONDARY};
            border-radius: 3px;
            user-select: none;
            padding: 8px 16px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            z-index: 1;
          }

          .dropdown-display:hover {
            background: ${COLORS.HOVER};
          }

          .is-visible + .dropdown-list {
            display: block;
          }

          .dropdown-list {
            display: none;
            margin-top: -1px;
            border: 0.5px solid ${COLORS.SECONDARY};
            border-radius: 0px 0px 3px 3px;
            max-height: 350px;
            overflow-y: scroll;
          }
        `}</style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(Dropdown)
