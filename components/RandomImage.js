import React from 'react'
import axios from 'axios'
import Spinner from 'react-spinner'

import { fileToDataURL } from '../lib/util'

const downloadThumbnailImage = img => {
  return axios
    .get(img.url, { responseType: 'blob' })
    .then(res => res.data)
    .then(fileToDataURL)
    .then(dataURL => Object.assign(img, { dataURL }))
}

const getImageDownloadUrl = img =>
  axios.get(`/unsplash/download/${img.id}`).then(res => res.data.url)

class RandomImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { cacheIndex: 0, loading: false }
    this.selectImage = this.selectImage.bind(this)
    this.updateCache = this.updateCache.bind(this)
    this.getImages = this.getImages.bind(this)
    this.nextImage = this.nextImage.bind(this)
  }

  // fetch images in browser (we require window.FileReader)
  componentDidMount() {
    // clear cache when remounted
    this.cache = []
    this.updateCache()
  }

  async getImages() {
    const imageUrls = await axios.get('/unsplash/random')
    return Promise.all(imageUrls.data.map(downloadThumbnailImage))
  }

  cache = []
  imageUrls = {}

  selectImage() {
    const image = this.cache[this.state.cacheIndex]

    this.setState({ loading: true })
    getImageDownloadUrl(image)
      .then(url => axios.get(url, { responseType: 'blob' }))
      .then(res => res.data)
      .then(blob => this.props.onChange(blob, image))
      .then(() => this.setState({ loading: false }))
  }

  updateCache() {
    this.setState({ loading: true })
    this.getImages()
      .then(imgs => (this.cache = this.cache.concat(imgs)))
      .then(() => this.setState({ loading: false }))
  }

  nextImage() {
    if (this.state.loading) return

    this.setState({ cacheIndex: this.state.cacheIndex + 1 })

    if (this.state.cacheIndex > this.cache.length - 2) {
      this.updateCache()
    }
  }

  render() {
    const linkUrl = this.cache[this.state.cacheIndex] && this.cache[this.state.cacheIndex].url
    const bgImage = this.cache[this.state.cacheIndex] && this.cache[this.state.cacheIndex].dataURL

    return (
      <div className="random-image-container">
        <div className="controls">
          <span onClick={this.selectImage}>Use Image</span>
          <span onClick={this.nextImage}>Try Another</span>
        </div>
        <LinkWrapper url={linkUrl && `${linkUrl}&utm_source=carbon&utm_medium=referral`}>
          <div className="image">{this.state.loading && <Spinner />}</div>
        </LinkWrapper>
        <style jsx>
          {`
            .image {
              width: 100%;
              height: 120px;
              background: url(${bgImage});
              background-size: cover;
              background-repeat: no-repeat;
            }

            .controls {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
            }

            span {
              opacity: ${this.state.loading ? 0.5 : 1};
              cursor: ${this.state.loading ? 'not-allowed' : 'pointer'};
              user-select: none;
            }
          `}
        </style>
      </div>
    )
  }
}

function LinkWrapper({ url, children }) {
  return url ? <a href={url}>{children}</a> : <div>{children}</div>
}

export default RandomImage
