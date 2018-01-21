import React from 'react'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import Slider from './Slider'
import { COLORS } from '../lib/constants'

function getCroppedImg(imageDataURL, pixelCrop) {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')

  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageDataURL
    image.onload = () => {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      )

      resolve(canvas.toDataURL('image/jpeg'))
    }
  })
}

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      crop: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    }
    this.selectImage = this.selectImage.bind(this)
    this.removeImage = this.removeImage.bind(this)
    this.onCropChange = this.onCropChange.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onImageLoaded = this.onImageLoaded.bind(this)
  }

  selectImage(e) {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = e => this.props.onChange('backgroundImage', e.target.result)
    reader.readAsDataURL(file)
  }

  removeImage() {
    this.props.onChange('backgroundImage', null)
    this.props.onChange('backgroundImageSelection', null)
  }

  onCropChange(crop, pixelCrop) {
    this.setState({
      crop: { ...crop, aspect: this.state.aspect },
      pixelCrop
    })
  }

  async onDragEnd() {
    this.props.onChange(
      'backgroundImageSelection',
      await getCroppedImg(this.props.imageDataURL, this.state.pixelCrop)
    )
  }

  onImageLoaded(image) {
    this.setState({ aspect: image.width / image.height })
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
            <ReactCrop
              src={this.props.imageDataURL}
              crop={this.state.crop}
              onChange={this.onCropChange}
              onDragEnd={this.onDragEnd}
              onImageLoaded={this.onImageLoaded}
              keepSelection
            />
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
