import React from 'react'

import Checkmark from './svg/Checkmark'
import { COLORS } from '../lib/constants'
import { toggle } from '../lib/util'

class ListSetting extends React.Component {
  static defaultProps = {
    onOpen: () => {},
    onClose: () => {},
  }

  state = { isVisible: false }

  select = id => {
    if (this.props.selected !== id) {
      this.props.onChange(id)
    }
  }

  toggle = () => {
    const handler = this.state.isVisible ? this.props.onClose : this.props.onOpen
    handler()
    this.setState(toggle('isVisible'))
  }

  renderListItems() {
    return this.props.items.map(item => (
      <div
        role="button"
        tabIndex={0}
        className="list-item"
        key={item.id}
        onClick={this.select.bind(null, item.id)}
      >
        {this.props.children(item, this.props.selected)}
        {this.props.selected === item.id ? <Checkmark /> : null}
        <style jsx>
          {`
            .list-item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              user-select: none;
              padding: 8px 16px;
              border-bottom: 1px solid ${COLORS.SECONDARY};
              background: ${COLORS.DARK_GRAY};
            }
            .list-item:first-of-type {
              border-top: 1px solid ${COLORS.SECONDARY};
            }
            .list-item:last-of-type {
              border-bottom: none;
            }
          `}
        </style>
      </div>
    ))
  }

  render() {
    const { items, selected, title, children } = this.props
    const { isVisible } = this.state

    const selectedItem = items.filter(item => item.id === selected)[0] || {}

    return (
      <div className="list-select-container">
        <div
          role="button"
          tabIndex={0}
          className={`display ${isVisible ? 'is-visible' : ''}`}
          onClick={this.toggle}
        >
          <span className="label">{title}</span>
          {children(selectedItem)}
        </div>
        <div className="list">{this.renderListItems()}</div>
        <style jsx>
          {`
            .display {
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              user-select: none;
              padding: 8px;
            }
            .list {
              display: none;
              margin-top: -1px;
              max-height: 160px;
              overflow-y: scroll;
            }
            .is-visible + .list {
              display: block;
            }
          `}
        </style>
      </div>
    )
  }
}

export default ListSetting
