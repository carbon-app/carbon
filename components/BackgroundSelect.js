import React from 'react'

import ImagePicker from './ImagePicker'
import ColorPicker from './ColorPicker'
import Button from './Button'
import Popout, { managePopout } from './Popout'
import { COLORS, DEFAULT_BG_COLOR } from '../lib/constants'
import { stringifyColor } from '../lib/util'

function validateColor(str) {
  if (/#\d{3,6}|rgba{0,1}\(.*?\)/gi.test(str) || /\w+/gi.test(str)) {
    return str
  }
}

class BackgroundSelect extends React.PureComponent {
  selectTab = name => {
    if (this.props.mode !== name) {
      this.props.onChange({ backgroundMode: name })
    }
  }

  handlePickColor = color => this.props.onChange({ backgroundColor: stringifyColor(color) })

  render() {
    const {
      color,
      mode,
      image,
      onChange,
      isVisible,
      toggleVisibility,
      carbonRef,
      updateHighlights,
    } = this.props

    const background = validateColor(color) ? color : DEFAULT_BG_COLOR

    const aspectRatio = carbonRef ? carbonRef.clientWidth / carbonRef.clientHeight : 1

    return (
      <div className="bg-select-container">
        <Button
          title="Background Menu"
          border
          center
          selected={isVisible}
          className={`bg-color-container bg-select-display ${isVisible ? 'is-visible' : ''}`}
          onClick={toggleVisibility}
          background="white"
          hoverBackground="white"
          data-cy="display"
        >
          <div className="bg-color-alpha" />
          <div className="bg-color" />
        </Button>

        <Popout
          id="bg-select-pickers"
          pointerLeft="15px"
          hidden={!isVisible}
          style={{ width: '222px' }}
        >
          <div className="picker-tabs">
            {['color', 'image'].map(tab => (
              <Button
                key={tab}
                padding="8px 0"
                center
                className="capitalize"
                onClick={this.selectTab.bind(null, tab)}
                background={mode === tab ? COLORS.BLACK : COLORS.DARK_GRAY}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className="picker-tabs-contents">
            <div hidden={mode !== 'color'}>
              <ColorPicker color={color} onChange={this.handlePickColor} />
            </div>
            <div hidden={mode !== 'image'}>
              <ImagePicker
                onChange={onChange}
                imageDataURL={image}
                aspectRatio={aspectRatio}
                updateHighlights={updateHighlights}
              />
            </div>
          </div>
        </Popout>
        <style jsx>
          {`
            .bg-select-container {
              height: 100%;
            }

            .bg-select-container :global(.bg-select-display) {
              position: relative;
              overflow: hidden;
              height: 100%;
              width: 40px;
              border: 1px solid ${COLORS.SECONDARY};
            }

            .bg-select-container :global(.bg-select-display.is-visible),
            .bg-select-container :global(.bg-select-display:focus) {
              border-width: 2px;
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
              border-bottom: 2px solid ${COLORS.SECONDARY};
            }

            .picker-tabs :global(button) {
              border-right: 1px solid ${COLORS.SECONDARY};
            }

            .picker-tabs :global(button:last-child) {
              border-right: none;
            }
          `}
        </style>
      </div>
    )
  }
}

export default managePopout(BackgroundSelect)
