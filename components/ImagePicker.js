import React from 'react'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import Slider from './Slider'
import { COLORS } from '../lib/constants'

const getCroppedImg = (imageDataURL, pixelCrop) => {
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

const INITIAL_STATE = { crop: null, imageAspectRatio: null, pixelCrop: null }

export default class extends React.Component {
  constructor() {
    super()
    this.state = INITIAL_STATE
    this.selectImage = this.selectImage.bind(this)
    this.removeImage = this.removeImage.bind(this)
    this.onImageLoaded = this.onImageLoaded.bind(this)
    this.onCropChange = this.onCropChange.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.crop && this.props.aspectRatio != nextProps.aspectRatio) {
      // update crop for editor container aspect-ratio change
      this.setState({
        crop: makeAspectCrop(
          {
            ...this.state.crop,
            aspect: nextProps.aspectRatio
          },
          this.state.imageAspectRatio
        )
      })
    }
  }

  selectImage(e) {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = e =>
      this.props.onChange({ backgroundImage: e.target.result, backgroundImageSelection: null })
    reader.readAsDataURL(file)
  }

  removeImage() {
    this.setState(INITIAL_STATE, () => {
      this.props.onChange({
        backgroundMode: 'color',
        backgroundImage: null,
        backgroundImageSelection: null
      })
    })
  }

  onImageLoaded(image) {
    const imageAspectRatio = image.width / image.height
    const initialCrop = {
      x: 0,
      y: 0,
      width: 100,
      aspect: this.props.aspectRatio
    }

    this.setState({
      imageAspectRatio,
      crop: makeAspectCrop(initialCrop, imageAspectRatio)
    })
  }

  onCropChange(crop, pixelCrop) {
    this.setState({
      crop: { ...crop, aspect: this.props.aspectRatio },
      pixelCrop
    })
  }

  async onDragEnd() {
    if (this.state.pixelCrop) {
      const croppedImg = await getCroppedImg(this.props.imageDataURL, this.state.pixelCrop)
      this.props.onChange({ backgroundImageSelection: croppedImg })
    }
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

          span {
            display: block;
            margin-bottom: 16px;
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
                &times;
              </a>
            </div>
            <ReactCrop
              src={this.props.imageDataURL}
              onImageLoaded={this.onImageLoaded}
              crop={this.state.crop}
              onChange={this.onCropChange}
              onDragEnd={this.onDragEnd}
              minHeight={10}
              minWidth={10}
              keepSelection
            />
          </div>
          <style jsx>{`
            .settings-container img {
              width: 100%;
            }

            .label {
              user-select: none;
              margin-bottom: 4px;
            }

            :global(.ReactCrop__image) {
              user-select: none;
              user-drag: none;
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
          .image-picker-container {
            font-size: 12px;
          }
        `}</style>
      </div>
    )
  }
}
