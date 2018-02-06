import React from 'react'
import Checkmark from './svg/Checkmark'
import { COLORS, FONTS } from '../lib/constants'

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = { isVisible: false }
    this.select = this.select.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  select(fontId) {
    if (this.props.selected !== fontId) {
      this.props.onChange(fontId)
    }
  }

  toggle() {
    this.setState({ isVisible: !this.state.isVisible })
  }

  renderListItems() {
    return FONTS.map((font, i) => (
      <div className="list-item" key={i} onClick={this.select.bind(null, font.id)}>
        <span style={{ fontFamily: font.id }}>{font.name}</span>
        {this.props.selected === font.id ? <Checkmark /> : null}
        <style jsx>{`
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
        `}</style>
      </div>
    ))
  }

  render() {
    const selectedFont = FONTS.filter(font => font.id === this.props.selected)[0] || {}
    return (
      <div className="font-select-container">
        <div
          className={`display ${this.state.isVisible ? 'is-visible' : ''}`}
          onClick={this.toggle}
        >
          <span className="label">Font family</span>
          <span style={{ fontFamily: selectedFont.id }}>{selectedFont.name}</span>
        </div>
        <div className="list">{this.renderListItems()}</div>
        <style jsx>{`
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
        `}</style>
      </div>
    )
  }
}
