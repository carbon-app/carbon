import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import ArrowDown from './svg/arrowdown'

class Dropdown extends React.Component {
  constructor(props) {
    super()
    this.state = {
      listVisible: false,
      selected: props.selected || props.list[0]
    }
    this.select = this.select.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  select(item) {
    this.setState({ selected: item })
  }

  toggle() {
    this.setState({ listVisible: !this.state.listVisible })
  }

  handleClickOutside() {
    this.setState({ listVisible: false });
  }

  renderListItems() {
    return this.props.list.map((item, i) => (
      <div className={`dropdown-list-item ${this.state.selected === item ? "selected" : ""}`} key={i} onClick={this.select.bind(null, item)}>
        <span>{ item.name }</span>
        <style jsx>{`
          .dropdown-list-item {
            background: #000;
            user-select: none;
            padding: 8px 16px;
            border-bottom: 0.5px solid #333;
          }

          .selected {
            background: #506874;
            color: #fff;
          }

          .dropdown-list-item:not(.selected):hover {
            background: #131313;
          }

          .dropdown-list-item:last-of-type {
            border-bottom: none;
            border-radius: 0px 0px 3px 3px;
          }
        `}</style>
      </div>
    ))
  }

  render() {
    // find longest list value in number of characters
    const MIN_WIDTH = this.props.list.reduce((max, { name }) =>
      (name.length > max ? name.length : max), 0)

    return (
      <div className="dropdown-container" style={{ minWidth: MIN_WIDTH * 14 }} onClick={this.toggle}>
        <div className={`dropdown-display ${this.state.listVisible ? 'list-visible' : ''}`}>
          <span>{ this.state.selected.name }</span>
          <div className="arrow-down"><ArrowDown /></div>
        </div>
        <div className="dropdown-list">
          { this.renderListItems() }
        </div>
        <style jsx>{`
          .arrow-down {
            position: absolute;
            right: 16px;
          }

          .list-visible > .arrow-down {
            transform: rotate(180deg);
          }

          .list-visible {
            border-radius: 3px 3px 0px 0px !important;
          }

          .dropdown-container {
            height: 36px;
            cursor: pointer;
            color: #fff;
          }

          .dropdown-display {
            border: 0.5px solid #333;
            border-radius: 3px;
            user-select: none;
            padding: 8px 16px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            z-index: 1;
            background: #000;
          }

          .dropdown-display:hover {
            background: #131313;
          }

          .list-visible + .dropdown-list {
            display: block;
          }

          .dropdown-list {
            display: none;
            margin-top: -2px;
            border: 0.5px solid #333;
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
