import React from 'react'
import { COLORS } from '../lib/constants'
import Checkmark from './svg/Checkmark'
import { RESOLUTIONS } from '../lib/constants'

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = { isVisible: false }
    this.select = this.select.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  select(resolution) {
    if (this.props.selected !== resolution) {
      this.props.onChange(resolution)
    }
  }

  toggle() {
    this.setState({ isVisible: !this.state.isVisible })
  }

  renderResolutions() {
    return RESOLUTIONS.map((resolution, i) => {
      return (
        <div className="list-item" key={i} onClick={this.select.bind(null, resolution.id)}>
          <span style={{ Resolution: resolution.id }}>{resolution.name}</span>
          {this.props.selected === resolution.id ? <Checkmark /> : null}
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
      )
    })
  }

  render() {
    const selectedResolution =
      RESOLUTIONS.filter(resolution => resolution.id === this.props.selected)[0] || {}
    return (
      <div className="resolution-select-container">
        <div
          onClick={this.toggle}
          className={`display ${this.state.isVisible ? 'is-visible' : ''}`}
        >
          <span className="label">Resolution</span>
          <span style={{ resolution: selectedResolution.id }}>{selectedResolution.name}</span>
        </div>
        <div className="list">{this.renderResolutions()}</div>
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
