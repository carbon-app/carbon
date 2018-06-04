import React from 'react'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'

import RandomImage from './RandomImage'
import PhotoCredit from './PhotoCredit'
import { fileToDataURL } from '../lib/util'

const getCroppedImg = (imageDataURL, pixelCrop) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')

  return new Promise(resolve => {
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

const INITIAL_STATE = { crop: null, imageAspectRatio: null, pixelCrop: null, photographer: null }

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
    this.selectImage = this.selectImage.bind(this)
    this.removeImage = this.removeImage.bind(this)
    this.onImageLoaded = this.onImageLoaded.bind(this)
    this.onCropChange = this.onCropChange.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (state.crop) {
      // update crop for editor container aspect-ratio change
      return {
        crop: makeAspectCrop(
          {
            ...state.crop,
            aspect: nextProps.aspectRatio
          },
          state.imageAspectRatio
        )
      }
    }
    return null
  }

  async onDragEnd() {
    if (this.state.pixelCrop) {
      const croppedImg = await getCroppedImg(this.props.imageDataURL, this.state.pixelCrop)
      this.props.onChange({ backgroundImageSelection: croppedImg })
    }
  }

  onCropChange(crop, pixelCrop) {
    this.setState({
      crop: { ...crop, aspect: this.props.aspectRatio },
      pixelCrop
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

  selectImage(e, { photographer } = {}) {
    const file = e.target ? e.target.files[0] : e

    return fileToDataURL(file).then(dataURL =>
      this.setState({ photographer }, () => {
        this.props.onChange({
          backgroundImage: dataURL,
          backgroundImageSelection: null,
          photographer
        })
      })
    )
  }

  removeImage() {
    this.setState(INITIAL_STATE, () => {
      this.props.onChange({
        backgroundImage: null,
        backgroundImageSelection: null
      })
    })
  }

  render() {
    let content = (
      <div>
        <div className="choose-image">
          <span>Click the button below to upload a background image:</span>
          <input
            type="file"
            accept="image/x-png,image/jpeg,image/jpg"
            onChange={this.selectImage}
          />
        </div>
        <hr />
        <div className="random-image">
          <span>
            Or use a random <a href="https://unsplash.com/">Unsplash</a> image:
          </span>
          <RandomImage onChange={this.selectImage} />
        </div>
        <style jsx>
          {`
            .choose-image,
            .random-image {
              padding: 8px;
            }

            input {
              cursor: pointer;
              outline: none;
            }

            span {
              display: block;
              margin-bottom: 16px;
            }

            a {
              text-decoration: underline;
            }

            hr {
              border-bottom: none;
              margin-bottom: 0;
            }
          `}
        </style>
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
            {this.state.photographer && <PhotoCredit photographer={this.state.photographer} />}
          </div>
          <style jsx>
            {`
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
            `}
          </style>
        </div>
      )
    }

    return (
      <div>
        <div className="image-picker-container">{content}</div>
        <style jsx>
          {`
            .image-picker-container {
              font-size: 12px;
            }
          `}
        </style>
      </div>
    )
  }
}
