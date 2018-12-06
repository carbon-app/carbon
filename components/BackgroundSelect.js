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
    const { color, mode, image, onChange, aspectRatio } = this.props
    const { isVisible, mounted } = this.state

    let background =
      typeof color === 'string'
        ? color
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
        : color

    if (!validateColor(background)) {
      background = DEFAULT_BG_COLOR
    }

    return (
      <div className="bg-select-container">
        <div className={`bg-select-display ${isVisible ? 'is-visible' : ''}`}>
          <div className="bg-color-container" onClick={this.toggle}>
            <div className="bg-color-alpha" />
            <div className="bg-color" />
          </div>
        </div>
        <div className="bg-select-pickers" hidden={!isVisible}>
          <WindowPointer fromLeft="15px" />
          <div className="picker-tabs">
            {['color', 'image'].map(tab => (
              <div
                key={tab}
                className={`picker-tab ${mode === tab ? 'active' : ''}`}
                onClick={this.selectTab.bind(null, tab)}
              >
                {capitalizeFirstLetter(tab)}
              </div>
            ))}
          </div>
          <div className="picker-tabs-contents">
            <div style={mode === 'color' ? {} : { display: 'none' }}>
              {mounted && <SketchPicker color={color} onChangeComplete={this.handlePickColor} />}
            </div>
            <div style={mode === 'image' ? {} : { display: 'none' }}>
              <ImagePicker onChange={onChange} imageDataURL={image} aspectRatio={aspectRatio} />
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
              width: 40px;
              border: 1px solid ${COLORS.SECONDARY};
              border-radius: 3px;
            }

            .bg-select-display.is-visible {
              border-width: 2px;
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
              background: ${COLORS.DARK_GRAY};
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
              margin-top: 12px;
              border: 2px solid ${COLORS.SECONDARY};
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
              background: ${COLORS.DARK_GRAY};
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
