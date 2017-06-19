import React from 'react'
import { Hyper, BW, None } from './svg/Themes'

const THEME_IMGS = [None, Hyper, BW]

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = { selected: props.selected || THEME_IMGS[0] }
    this.select = this.select.bind(this)
  }

  select(theme) {
    if (this.state.selected !== theme) {
      this.props.onChange(theme)
      this.setState({ selected: theme })
    }
  }

  renderThemes() {
    return THEME_IMGS.map((Img, i) => (
      <div className={`theme ${this.state.selected === Img ? "selected" : ""}`}
        key={i} onClick={this.select.bind(null, Img)}>
        <Img/>
        <style jsx>{`
          .theme {
            margin-right: 8px;
          }

          .theme:last-of-type {
            margin-right: 0px;
          }
        `}</style>
      </div>
    ))
  }

  render() {
    return (
      <div className="window-theme">
        <span className="label">Theme</span>
        <div className="themes">
          { this.renderThemes() }
        </div>
        <style jsx>{`
          .window-theme {
            padding: 8px;
            border-bottom: solid 1px #000;
          }

          .window-theme span {
            display: inline-block;
            margin-bottom: 8px;
          }

          .themes {
            display: flex;
            flex-direction: row;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}
