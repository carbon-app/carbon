import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import { SketchPicker } from 'react-color'
import WindowPointer from './WindowPointer'
import ImagePicker from './ImagePicker'
import { COLORS, DEFAULT_BG_COLOR } from '../lib/constants'
import { validateColor } from '../lib/colors'
import { parseRGBA, capitalizeFirstLetter } from '../lib/util'

class BackgroundSelect extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { isVisible: false, mounted: false }
    this.toggle = this.toggle.bind(this)
    this.selectTab = this.selectTab.bind(this)
    this.handlePickColor = this.handlePickColor.bind(this)
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  toggle() {
    this.setState({ isVisible: !this.state.isVisible })
  }

  selectTab(name) {
    if (this.props.mode !== name) {
      this.props.onChange({ backgroundMode: name })
    }
  }

  handleClickOutside() {
    this.setState({ isVisible: false })
  }

  handlePickColor(color) {
    this.props.onChange({ backgroundColor: parseRGBA(color.rgb) })
  }

  render() {
    let background = this.props.color
    background =
      typeof background === 'string'
        ? background
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
        : background

    if (!validateColor(background)) {
      background = DEFAULT_BG_COLOR
    }

    const { mode, image } = this.props

    return (
      <div className="bg-select-container">
        <div className="bg-select-display">
          <div className="bg-select-label">
            <span>BG</span>
          </div>
          <div className="bg-color-container" onClick={this.toggle}>
            <div className="bg-color-alpha" />
            <div className="bg-color" />
          </div>
        </div>
        <div className="bg-select-pickers" hidden={!this.state.isVisible}>
          <WindowPointer fromLeft="15px" />
          <div className="picker-tabs">
            {['color', 'image'].map(tab => (
              <div
                key={tab}
                className={`picker-tab ${this.props.mode === tab ? 'active' : ''}`}
                onClick={this.selectTab.bind(null, tab)}
              >
                {capitalizeFirstLetter(tab)}
              </div>
            ))}
          </div>
          <div className="picker-tabs-contents">
            <div style={this.props.mode === 'color' ? {} : { display: 'none' }}>
              {this.state.mounted && (
                <SketchPicker color={this.props.color} onChangeComplete={this.handlePickColor} />
              )}
            </div>
            <div style={this.props.mode === 'image' ? {} : { display: 'none' }}>
              <ImagePicker
                onChange={this.props.onChange}
                imageDataURL={this.props.image}
                aspectRatio={this.props.aspectRatio}
              />
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .bg-select-container {
              height: 100%;
            }

            .bg-select-display {
              display: flex;
              overflow: hidden;
              height: 100%;
              width: 72px;
              border: 1px solid ${COLORS.SECONDARY};
              border-radius: 3px;
            }

            .bg-select-label {
              display: flex;
              align-items: center;
              justify-content: center;
              user-select: none;
              cursor: default;
              height: 100%;
              padding: 0 8px;
              border-right: 1px solid ${COLORS.SECONDARY};
            }

            .bg-color-container {
              position: relative;
              width: 100%;
              background: #fff;
              cursor: pointer;
            }

            .bg-color {
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
              ${mode === 'image'
                ? `background: url(${image});
                 background-size: cover;
                 background-repeat: no-repeat;`
                : `background: ${background};`};
            }

            .bg-color-alpha {
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==);
            }

            .picker-tabs {
              display: flex;
              border-bottom: 1px solid ${COLORS.SECONDARY};
            }

            .picker-tab {
              user-select: none;
              cursor: pointer;
              background: rgba(255, 255, 255, 0.165);
              width: 50%;
              text-align: center;
              padding: 8px 0;
              border-right: 1px solid ${COLORS.SECONDARY};
            }

            .picker-tab:last-child {
              border-right: none;
            }

            .picker-tab.active {
              background: none;
            }

            .bg-select-pickers {
              position: absolute;
              width: 222px;
              margin-left: 36px;
              margin-top: 4px;
              border: 1px solid ${COLORS.SECONDARY};
              border-radius: 3px;
              background: #1a1a1a;
            }

            /* react-color overrides */
            .bg-select-pickers :global(.sketch-picker) {
              background: #1a1a1a !important;
              padding: 8px 8px 0 !important;
              margin: 0 auto 1px !important;
            }

            .bg-select-pickers :global(.sketch-picker > div:nth-child(3) > div > div > span) {
              color: ${COLORS.SECONDARY} !important;
            }

            .bg-select-pickers :global(.sketch-picker > div:nth-child(3) > div > div > input) {
              width: 100% !important;
              box-shadow: none;
              outline: none;
              border-radius: 2px;
              background: rgba(255, 255, 255, 0.165);
              color: #fff !important;
            }

            /* prettier-ignore */
            .bg-select-pickers :global(.sketch-picker > div:nth-child(2) > div:nth-child(1) > div:nth-child(2), .sketch-picker > div:nth-child(2) > div:nth-child(2)) {
            background: #fff;
          }
          `}
        </style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(BackgroundSelect)
