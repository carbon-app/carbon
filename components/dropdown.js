import React from 'react'
import ArrowDown from './svg/arrowdown'

export default class extends React.Component {
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
    return (
      <div className="dropdown-container" onClick={this.toggle}>
        <div className={`dropdown-display ${this.state.listVisible ? 'list-visible' : ''}`}>
          <span>{ this.state.selected.name }</span>
          <div className="arrow-down"><ArrowDown /></div>
        </div>
        <div className="dropdown-list">
          { this.renderListItems() }
        </div>
        <style jsx>{`
          .arrow-down {
            margin-left: 16px;
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
            justify-content: center;
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
          }
        `}</style>
      </div>
    )
  }
}
