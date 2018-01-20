import React from 'react'
import Slider from './Slider'
import { COLORS } from '../lib/constants'

export default class extends React.Component {
  constructor() {
    super()
    this.selectImage = this.selectImage.bind(this)
    this.removeImage = this.removeImage.bind(this)
  }

  selectImage(e) {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = e => this.props.onChange('backgroundImage', e.target.result)
    reader.readAsDataURL(file)
  }

  removeImage() {
    this.props.onChange('backgroundImage', null)
  }

  render() {
    let content = (
      <div className="upload-image">
        <span>Click the button below to upload a background image</span>
        <input type="file" accept="image/x-png,image/jpeg,image/jpg" onChange={this.selectImage} />
        <style jsx>{`
          .upload-image {
            padding: 8px;
          }
        `}</style>
      </div>
    )

    if (this.props.imageDataURL) {
      content = (
        <div className="settings-container">
          <div className="image-container">
            <div className="label">
              <span>Background image</span>
              <a href="#" onClick={this.removeImage}>
                x
              </a>
            </div>
            <img src={this.props.imageDataURL} />
          </div>
          <Slider
            usePercentage
            label="Size"
            value={this.props.size || 100}
            minValue={100}
            maxValue={200}
            onChange={this.props.onChange.bind(null, 'backgroundImageSize')}
          />
          <Slider
            usePercentage
            label="X position"
            value={this.props.posX || 0}
            minValue={0}
            maxValue={100}
            onChange={this.props.onChange.bind(null, 'backgroundImagePositionX')}
          />
          <Slider
            usePercentage
            label="Y position"
            value={this.props.posY || 0}
            minValue={0}
            maxValue={100}
            onChange={this.props.onChange.bind(null, 'backgroundImagePositionY')}
          />
          <style jsx>{`
            img {
              width: 100%;
              user-select: none;
              user-drag: none;
            }

            .settings-container > :global(div) {
              border-bottom: solid 1px ${COLORS.SECONDARY};
            }

            .settings-container :global(div):last-child {
              border-bottom: none;
            }

            .image-container {
              padding: 8px;
            }

            .image-container .label {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          `}</style>
        </div>
      )
    }

    return (
      <div>
        <div className="image-picker-container">{content}</div>
        <style jsx>{`
          .settings-container img {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}
