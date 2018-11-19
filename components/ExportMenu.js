import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import shallowCompare from 'react-addons-shallow-compare'

import { COLORS, EXPORT_SIZES } from '../lib/constants'
import ExportButton from './ExportButton'
import Button from './Button'
import WindowPointer from './WindowPointer'

class ExportMenu extends React.Component {
  state = {
    isVisible: false
  }

  shouldComponentUpdate(prevProps, prevState) {
    return (
      prevState.isVisible !== this.state.isVisible ||
      (prevState.isVisible && shallowCompare(this, prevProps, prevState))
    )
  }

  toggle = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  handleClickOutside = () => {
    this.setState({ isVisible: false })
  }

  handleInputChange = e => {
    this.props.onChange('filename', e.target.value)
  }

  handleExportSizeChange = selectedSize => () => {
    this.props.onChange('exportSize', selectedSize)
  }

  handleExport = format => () => {
    this.props.export(format)
  }

  render() {
    const { exportSize, filename } = this.props
    const { isVisible } = this.state

    return (
      <div className="export-container">
        <Button
          selected={isVisible}
          className="exportButton"
          onClick={this.toggle}
          title="Export"
          color={COLORS.PURPLE}
        />
        <div className="export-menu" hidden={!isVisible}>
          <WindowPointer fromRight="12px" color={COLORS.PURPLE} />
          <div className="export-option">
            <input
              title="filename"
              placeholder="File name..."
              value={filename}
              name="filename"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="export-option">
            <div className="size-container">
              <span>Size</span>
              <div>
                {EXPORT_SIZES.map(({ name }) => (
                  <button
                    onClick={this.handleExportSizeChange(name)}
                    className={`size-button ${exportSize === name ? 'selected' : ''}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="export-option">
            <div className="open-container">
              <button onClick={this.handleExport('open')}>Open ↗</button>
            </div>
            <div className="copy-container">
              <ExportButton color={COLORS.PURPLE}>Copy Embed</ExportButton>
            </div>
            <div className="save-container">
              <span>Save as</span>
              <div>
                <button onClick={this.handleExport('png')} className="save-button">
                  PNG
                </button>
                <button onClick={this.handleExport('svg')} className="save-button">
                  SVG
                </button>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            button {
              display: flex;
              user-select: none;
              cursor: pointer;
              background: inherit;
              outline: none;
              border: none;
              padding: 0;
              color: ${COLORS.PURPLE};
            }

            button:hover {
              opacity: 1;
            }

            input {
              padding: 8px 16px;
              width: 100%;
              font-size: 12px;
              color: ${COLORS.PURPLE};
              background: transparent;
              border: none;
              outline: none;
            }

            input::placeholder {
              color: ${COLORS.PURPLE};
              opacity: 0.4;
            }

            .export-container {
              position: relative;
              color: ${COLORS.PURPLE};
              font-size: 12px;
            }

            .export-menu {
              box-sizing: content-box;
              position: absolute;
              margin-top: 10px;
              width: 280px;
              border-radius: 3px;
              border: 2px solid ${COLORS.PURPLE};
              right: 0;
              background-color: ${COLORS.BLACK};
            }

            .export-option {
              display: flex;
              border-bottom: 1px solid ${COLORS.PURPLE};
            }
            .export-option:last-child {
              border-bottom: none;
            }

            .size-container {
              display: flex;
              flex: 1;
              padding: 8px 16px;
              justify-content: space-between;
            }
            .size-container > div {
              display: flex;
            }

            .size-button {
              opacity: 0.4;
              margin-right: 10px;
            }
            .size-button:last-child {
              margin-right: 0;
            }
            .size-button.selected {
              opacity: 1;
            }

            .copy-container,
            .open-container,
            .save-container {
              display: flex;
              flex: 1;
              justify-content: center;
              align-items: center;
              padding: 12px 16px;
            }

            .copy-container {
              flex-basis: 72px;
            }

            .copy-container,
            .open-container {
              border-right: 1px solid ${COLORS.PURPLE};
            }

            .save-container {
              flex-direction: column;
            }
            .save-container > span {
              margin-bottom: 6px;
            }
            .save-container > div {
              display: flex;
            }

            .save-button {
              opacity: 0.4;
            }
            .save-button:first-child {
              margin-right: 8px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(ExportMenu)
