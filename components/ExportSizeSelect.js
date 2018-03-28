import React from 'react'
import Checkmark from './svg/Checkmark'
import { EXPORT_SIZES, COLORS } from '../lib/constants'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isVisible: false }
    this.select = this.select.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  select(exportSize) {
    if (this.props.selected !== exportSize) {
      this.props.onChange(exportSize)
    }
  }

  toggle() {
    this.setState({ isVisible: !this.state.isVisible })
  }

  renderExportSizes() {
    return EXPORT_SIZES.map(exportSize => (
      <div
        className="list-item"
        key={exportSize.id}
        onClick={this.select.bind(null, exportSize.id)}
      >
        <span style={{ ExportSize: exportSize.id }}>{exportSize.name}</span>
        {this.props.selected === exportSize.id ? <Checkmark /> : null}
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
    const selectedExportSize =
      EXPORT_SIZES.filter(exportSize => exportSize.id === this.props.selected)[0] || {}
    return (
      <div className="export-size-select-container">
        <div
          onClick={this.toggle}
          className={`display ${this.state.isVisible ? 'is-visible' : ''}`}
        >
          <span className="label">Export size</span>
          <span style={{ exportSize: selectedExportSize.id }}>{selectedExportSize.name}</span>
        </div>
        <div className="list">{this.renderExportSizes()}</div>
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
