import React from 'react'
import { withRouter } from 'next/router'
import { useCopyTextHandler, useOnline } from '@dawnlabs/tacklebox'

import { COLORS, EXPORT_SIZES } from '../lib/constants'
import Button from './Button'
import Input from './Input'
import Popout, { managePopout } from './Popout'

const toIFrame = url =>
  `<iframe
  src="https://carbon.now.sh/embed${url}"
  style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>
`

const toURL = url => encodeURI(`https://carbon.now.sh/embed${url}`)

const MAX_PAYLOAD_SIZE = 5e6 // bytes
function verifyPayloadSize(str) {
  if (typeof str !== 'string') return true

  return new Blob([str]).size < MAX_PAYLOAD_SIZE
}

const CopyEmbed = withRouter(({ router: { asPath }, mapper, title, margin }) => {
  const text = React.useMemo(() => mapper(asPath), [mapper, asPath])
  const { onClick, copied } = useCopyTextHandler(text)

  return (
    <Button
      onClick={onClick}
      center
      hoverColor={COLORS.PURPLE}
      color={COLORS.DARK_PURPLE}
      margin={margin}
      style={{ minWidth: 48 }}
    >
      {copied ? 'Copied!' : title}
    </Button>
  )
})

const popoutStyle = { width: '280px', right: 0 }

class ExportMenu extends React.PureComponent {
  input = React.createRef()

  handleInputChange = ({ target: { name, value } }) => this.props.onChange(name, value)

  handleExportSizeChange = selectedSize => () => this.props.onChange('exportSize', selectedSize)

  handleExport = format => () =>
    this.props.export(format, {
      filename: this.input.current.value
    })

  render() {
    const { exportSize, isVisible, toggleVisibility, disablePNG } = this.props

    return (
      <div className="export-menu-container" id="export-menu">
        <div className="flex">
          <Button
            border
            large
            center
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
            <Input ref={this.input} title="filename" placeholder="carbon" color={COLORS.PURPLE} />
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
            <div className="save-container">
              <span>Copy embed</span>
              <div>
                <CopyEmbed title="URL" mapper={toURL} margin="0 4px 0 0" />
                <CopyEmbed title="IFrame" mapper={toIFrame} margin="0 0 0 4px" />
              </div>
            </div>
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

            .save-container:first-of-type {
              padding: 12px 12px;
              border-right: 1px solid ${COLORS.PURPLE};
            }
          `}
        </style>
      </div>
    )
  }
}

export default managePopout(function({ backgroundImage, ...props }) {
  const tooLarge = React.useMemo(() => !verifyPayloadSize(backgroundImage), [backgroundImage])
  const online = useOnline()

  const [isSafari, setSafari] = React.useState(false)
  React.useEffect(() => {
    setSafari(
      window.navigator &&
        window.navigator.userAgent.indexOf('Safari') !== -1 &&
        window.navigator.userAgent.indexOf('Chrome') === -1
    )
  }, [])

  const disablePNG = isSafari && (tooLarge || !online)

  return <ExportMenu {...props} disablePNG={disablePNG} />
})
