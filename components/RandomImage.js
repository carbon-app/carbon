import React from 'react'
import axios from 'axios'

import { range, fileToDataURL } from '../lib/util'

const RAND_RANGE = 1000000
const UPDATE_SIZE = 10
const WALLPAPER_COLLECTION_ID = 1065396
const RANDOM_WALLPAPER_URL = `https://source.unsplash.com/collection/${WALLPAPER_COLLECTION_ID}/240x320`

const largerImage = url => url.replace(/w=\d+/, 'w=1920').replace(/&h=\d+/, '')
const smallerImage = url => url.replace(/w=\d+/, 'w=240')

async function getImage() {
  // circumvent browser caching
  const sig = Math.floor(Math.random() * RAND_RANGE)

  const res = await axios.get(`${RANDOM_WALLPAPER_URL}?sig=${sig}`, { responseType: 'blob' })
  return {
    url: res.request.responseURL,
    dataURL: await fileToDataURL(res.data)
  }
}

export default class extends React.Component {
  constructor() {
    super()
    this.state = { cache: [] }
    this.selectImage = this.selectImage.bind(this)
    this.updateCache = this.updateCache.bind(this)
    this.nextImage = this.nextImage.bind(this)
  }

  // update in browser (we require window.FileReader)
  componentDidMount() {
    this.updateCache()
  }

  selectImage() {
    axios
      .get(largerImage(this.state.cache[0].url), { responseType: 'blob' })
      .then(res => res.data)
      .then(this.props.onChange)
  }

  updateCache() {
    Promise.all(range(UPDATE_SIZE).map(getImage)).then(imgs =>
      this.setState({ cache: this.state.cache.concat(imgs) })
    )
  }

  nextImage() {
    this.setState({ cache: this.state.cache.slice(1) })

    if (this.state.cache.length < 3) {
      this.updateCache()
    }
  }

  render() {
    const bgImage = this.state.cache[0] && this.state.cache[0].dataURL

    return (
      <div className="random-image-container">
        <div className="controls">
          <span onClick={this.selectImage}>Use Image</span>
          <span onClick={this.nextImage}>Try Another</span>
        </div>
        <div className="image" />
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
            cursor: pointer;
            user-select: none;
          }
        `}</style>
      </div>
    )
  }
}
