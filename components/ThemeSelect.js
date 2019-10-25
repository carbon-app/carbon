import React from 'react'
import { None, BW, Sharp } from './svg/WindowThemes'
import { COLORS } from '../lib/constants'

const WINDOW_THEMES_MAP = { none: None, sharp: Sharp, bw: BW }
export const WINDOW_THEMES = Object.keys(WINDOW_THEMES_MAP)

class ThemeSelect extends React.Component {
  select = theme => {
    if (this.props.selected !== theme) {
      this.props.onChange(theme)
    }
  }

  renderThemes() {
    return WINDOW_THEMES.map(theme => {
      const Img = WINDOW_THEMES_MAP[theme]
      const checked = this.props.selected === theme
      return (
        <div
          key={theme}
          role="radio"
          checked={checked}
          aria-checked={checked}
          tabIndex={checked ? 0 : -1}
          onClick={this.select.bind(null, theme)}
          value={theme}
        >
          <Img />
          <style jsx>
            {`
              [role='radio'] {
                cursor: pointer;
                margin-right: 8px;
                outline: none;
              }

              [aria-checked='true'] :global(svg) {
                border-radius: 3px;
                border: solid 2px ${COLORS.SECONDARY};
              }

              [role='radio']:last-of-type {
                margin-right: 0px;
              }
            `}
          </style>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="window-theme">
        <span className="label" id="window-theme-label">
          Theme
        </span>
        <div className="themes" role="radiogroup" aria-labelledby="window-theme-label">
          {this.renderThemes()}
        </div>
        <style jsx>
          {`
            .window-theme {
              padding: 8px;
            }

            .window-theme span {
              display: inline-block;
              margin-bottom: 2px;
            }

            .themes {
              display: flex;
              flex-direction: row;
              width: 100%;
            }
          `}
        </style>
      </div>
    )
  }
}

export default ThemeSelect
