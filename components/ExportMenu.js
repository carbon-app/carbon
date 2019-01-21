import React from 'react'
import { withRouter } from 'next/router'

import { COLORS, EXPORT_SIZES } from '../lib/constants'
import Button from './Button'
import Input from './Input'
import CopyButton from './CopyButton'
import Popout, { managePopout } from './Popout'

const toIFrame = url =>
  `<iframe
  src="https://carbon.now.sh/embed${url}"
  style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>
`

const CopyEmbed = withRouter(
  React.memo(
    ({ router: { asPath } }) => (
      <CopyButton text={toIFrame(asPath)}>
        {({ copied }) => (
          <Button center color={COLORS.PURPLE} padding="12px 16px" flex="1 0 68px">
            {copied ? 'Copied!' : 'Copy Embed'}
          </Button>
        )}
      </CopyButton>
    ),
    (prevProps, nextProps) => prevProps.router.asPath === nextProps.router.asPath
  )
)

const popoutStyle = { width: '280px', right: 0 }

class ExportMenu extends React.PureComponent {
  handleInputChange = ({ target: { name, value } }) => this.props.onChange(name, value)

  handleExportSizeChange = selectedSize => () => this.props.onChange('exportSize', selectedSize)

  handleExport = format => () => this.props.export(format)

  render() {
    const { exportSize, filename, isVisible, toggleVisibility, disablePNG } = this.props

    return (
      <div className="export-menu-container" id="export-menu">
        <div className="flex">
          <Button
            border
            large
            color={COLORS.PURPLE}
            padding="0 16px"
            selected={isVisible}
            onClick={toggleVisibility}
          >
            Export
          </Button>
        </div>
        <Popout
          hidden={!isVisible}
          borderColor={COLORS.PURPLE}
          pointerRight="28px"
          style={popoutStyle}
        >
          <div className="export-row">
            <span className="filename">File name</span>
            <Input
              title="filename"
              placeholder="carbon"
              value={filename}
              name="filename"
              onChange={this.handleInputChange}
              color={COLORS.PURPLE}
            />
          </div>
          <div className="export-row">
            <span>Size</span>
            <div className="flex">
              {EXPORT_SIZES.map(({ name }, i) => (
                <Button
                  center
                  key={name}
                  hoverColor={COLORS.PURPLE}
                  margin={i === EXPORT_SIZES.length - 1 ? 0 : '0 10px 0 0'}
                  color={exportSize === name ? COLORS.PURPLE : COLORS.DARK_PURPLE}
                  onClick={this.handleExportSizeChange(name)}
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
          <div className="export-row">
            <Button center color={COLORS.PURPLE} onClick={this.handleExport('open')}>
              Open
            </Button>
            <CopyEmbed />
            <div className="save-container">
              <span>Save as</span>
              <div>
                {!disablePNG && (
                  <Button
                    center
                    margin="0 8px 0 0"
                    hoverColor={COLORS.PURPLE}
                    color={COLORS.DARK_PURPLE}
                    onClick={this.handleExport('png')}
                    id="export-png"
                  >
                    PNG
                  </Button>
                )}
                <Button
                  center
                  hoverColor={COLORS.PURPLE}
                  color={COLORS.DARK_PURPLE}
                  onClick={this.handleExport('svg')}
                  id="export-svg"
                >
                  SVG
                </Button>
              </div>
            </div>
          </div>
        </Popout>
        <style jsx>
          {`
            .export-menu-container {
              position: relative;
              color: ${COLORS.PURPLE};
            }

            .flex {
              display: flex;
              height: 100%;
            }

            .export-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 8px 16px;
              border-bottom: 1px solid ${COLORS.PURPLE};
            }
            .export-row > :global(button) {
              border-right: 1px solid ${COLORS.PURPLE};
            }
            .export-row:last-child {
              border-bottom: none;
              padding: 0;
            }

            .filename {
              flex-basis: 72px;
            }

            .save-container {
              display: flex;
              flex: 1;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 12px 16px;
            }
            .save-container > div {
              margin-top: 6px;
              display: flex;
              flex: 1;
            }
          `}
        </style>
      </div>
    )
  }
}

export default managePopout(ExportMenu)
