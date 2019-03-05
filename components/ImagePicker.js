import React from 'react'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'

import RandomImage from './RandomImage'
import PhotoCredit from './PhotoCredit'
import Input from './Input'
import { Link } from './Meta'
import { fileToDataURL } from '../lib/util'
import ApiContext from './ApiContext'

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

const INITIAL_STATE = {
  mode: 'file',
  crop: null,
  imageAspectRatio: null,
  pixelCrop: null,
  photographer: null
}

export default class ImagePicker extends React.Component {
  static contextType = ApiContext
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
    this.handleURLInput = this.handleURLInput.bind(this)
    this.selectImage = this.selectImage.bind(this)
    this.removeImage = this.removeImage.bind(this)
    this.onImageLoaded = this.onImageLoaded.bind(this)
    this.onCropChange = this.onCropChange.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.selectMode = this.selectMode.bind(this)
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

  handleURLInput(e) {
    e.preventDefault()
    const url = e.target[0].value
    return this.context
      .downloadThumbnailImage({ url })
      .then(({ dataURL }) =>
        this.props.onChange({
          backgroundImage: dataURL,
          backgroundImageSelection: null,
          photographer: null
        })
      )
      .catch(err => {
        if (err.message.indexOf('Network Error') > -1) {
          this.setState({
            error:
              'Fetching the image failed. This is probably a CORS-related issue. You can either enable CORS in your browser, or use another image.'
          })
        }
      })
  }

  selectMode(mode) {
    this.setState({ mode })
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
          <span>Upload a background image:</span>
          <button
            className={this.state.mode === 'file' ? 'active' : 'none'}
            onClick={this.selectMode.bind(this, 'file')}
          >
            File
          </button>
          <button
            className={this.state.mode === 'url' ? 'active' : 'none'}
            onClick={this.selectMode.bind(this, 'url')}
          >
            URL
          </button>
          {this.state.mode === 'file' ? (
            <Input
              type="file"
              accept="image/png,image/x-png,image/jpeg,image/jpg"
              onChange={this.selectImage}
            />
          ) : (
            <form onSubmit={this.handleURLInput}>
              <Input type="text" title="Background Image" placeholder="Image URL..." align="left" />
              <button type="submit">Upload</button>
            </form>
          )}
          {this.state.error && <span className="error">{this.state.error}</span>}
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
            button {
              display: inline-block;
            }

            .choose-image,
            .random-image {
              padding: 8px;
            }

            .choose-image > button {
              cursor: pointer;
              color: white;
              background: transparent;
              border: none;
              outline: none;
              padding: 0;
              margin: 0 8px 8px 0;
            }

            .choose-image > button:not(.active) {
              opacity: 0.4;
            }

            form {
              display: flex;
              justify-content: space-between;
            }

            form > button {
              padding: 1px 18px 2px 7px;
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
              margin-top: 0;
            }

            .error {
              color: red;
              margin-top: 8px;
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
              <button onClick={this.removeImage}>&times;</button>
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
              button {
                cursor: pointer;
                color: inherit;
                appearance: none;
                border: none;
                background: none;
                display: block;
                padding: 0;
                margin: 0;
                line-height: 16px;
              }

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
      <div className="image-picker-container">
        <Link href="/static/react-crop.css" />
        {content}
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
