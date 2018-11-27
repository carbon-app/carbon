import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import { withRouter } from 'next/router'

import { COLORS, EXPORT_SIZES } from '../lib/constants'
import Button from './Button'
import CopyButton from './CopyButton'
import WindowPointer from './WindowPointer'

import { toggle } from '../lib/util'

const toIFrame = url =>
  `<iframe
  src="https://carbon.now.sh/embed${url}"
  style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>
`

class ExportMenu extends React.PureComponent {
  state = {
    isVisible: false
  }

  toggle = () => this.setState(toggle('isVisible'))

  handleClickOutside = () => this.setState({ isVisible: false })

  handleInputChange = e => this.props.onChange(e.target.name, e.target.value)

  handleExportSizeChange = selectedSize => () => this.props.onChange('exportSize', selectedSize)

  handleExport = format => () => this.props.export(format)

  render() {
    const { exportSize, filename, router } = this.props
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
          <WindowPointer fromRight="28px" color={COLORS.PURPLE} />
          <div className="export-option filename-option">
            <span>File name</span>
            <input
              title="filename"
              placeholder="carbon"
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
                    key={name}
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
            <button className="open-button" onClick={this.handleExport('open')}>
              Open ↗
            </button>
            <CopyButton text={toIFrame(router.asPath)}>
              {({ copied }) => (
                <button className="copy-button">{copied ? 'Copied!' : 'Copy Embed'}</button>
              )}
            </CopyButton>
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

            .filename-option {
              align-items: center;
              justify-content: space-between;
              padding: 0 16px;
            }

            .filename-option input {
              padding: 8px 0;
              width: 60%;
              text-align: right;
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
              line-height: 0;
              opacity: 0.4;
              margin-right: 10px;
            }
            .size-button:last-child {
              margin-right: 0;
            }
            .size-button.selected {
              opacity: 1;
            }

            .copy-button,
            .open-button,
            .save-container {
              display: flex;
              flex: 1;
              justify-content: center;
              align-items: center;
              padding: 12px 16px;
            }

            .copy-button {
              flex-basis: 72px;
            }

            .copy-button,
            .open-button {
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

export default withRouter(enhanceWithClickOutside(ExportMenu))
