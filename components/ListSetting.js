import React from 'react'
import Checkmark from './svg/Checkmark'
import { COLORS } from '../lib/constants'

class ListSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isVisible: false }
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

  renderListItems() {
    return this.props.items.map(item => (
      <div className="list-item" key={item.id} onClick={this.select.bind(null, item.id)}>
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
              background: rgba(255, 255, 255, 0.165);
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
    const selectedItem = this.props.items.filter(item => item.id === this.props.selected)[0] || {}
    return (
      <div className="list-select-container">
        <div
          className={`display ${this.state.isVisible ? 'is-visible' : ''}`}
          onClick={this.toggle}
        >
          <span className="label">{this.props.title}</span>
          {this.props.children(selectedItem)}
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
              max-height: 80px;
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
