import React from 'react'
import axios from 'axios'
import Spinner from 'react-spinner'

import { range, fileToDataURL } from '../lib/util'

const RAND_RANGE = 1000000
const UPDATE_SIZE = 20
const WALLPAPER_COLLECTION_ID = 136026
const RANDOM_WALLPAPER_URL = `https://source.unsplash.com/collection/${WALLPAPER_COLLECTION_ID}/240x320`

const largerImage = url => url.replace(/w=\d+/, 'w=1920').replace(/&h=\d+/, '')
const smallerImage = url => url.replace(/w=\d+/, 'w=240')

export default class extends React.Component {
  constructor() {
    super()
    this.state = { cacheIndex: 0, loading: false }
    this.selectImage = this.selectImage.bind(this)
    this.updateCache = this.updateCache.bind(this)
    this.getImage = this.getImage.bind(this)
    this.nextImage = this.nextImage.bind(this)
  }

  cache = []
  imageUrls = {}

  // fetch images in browser (we require window.FileReader)
  componentDidMount() {
    // clear cache when remounted
    this.cache = []
    this.updateCache()
  }

  async getImage() {
    // circumvent browser caching
    const sig = Math.floor(Math.random() * RAND_RANGE)

    const res = await axios.get(`${RANDOM_WALLPAPER_URL}?sig=${sig}`, { responseType: 'blob' })

    // image already in cache?
    if (this.imageUrls[res.request.responseURL]) return

    this.imageUrls[res.request.responseURL] = true
    return {
      url: res.request.responseURL,
      dataURL: await fileToDataURL(res.data)
    }
  }

  selectImage() {
    this.setState({ loading: true })
    axios
      .get(largerImage(this.cache[this.state.cacheIndex].url), { responseType: 'blob' })
      .then(res => res.data)
      .then(this.props.onChange)
      .then(() => this.setState({ loading: false }))
  }

  updateCache() {
    this.setState({ loading: true })
    Promise.all(range(UPDATE_SIZE).map(this.getImage))
      .then(imgs => imgs.filter(img => img)) // remove null
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
    const bgImage = this.cache[this.state.cacheIndex] && this.cache[this.state.cacheIndex].dataURL

    if (!bgImage) return null

    return (
      <div className="random-image-container">
        <div className="controls">
          <span onClick={this.selectImage}>Use Image</span>
          <span onClick={this.nextImage}>Try Another</span>
        </div>
        <div className="image">{this.state.loading && <Spinner />}</div>
        <style jsx>{`
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
        `}</style>
      </div>
    )
  }
}
