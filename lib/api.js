import axios from 'axios'
import debounce from 'lodash.debounce'
import ms from 'ms'

import { fileToDataURL } from './util'

const client = axios.create({
  baseURL: `${
    process.env.API_URL || process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'
  }/api`
})

const RATE_LIMIT_CODE = 420

const gistClient = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  }
})

function tweet(content, encodedImage) {
  const processedData = encodedImage.split(',')[1]

  return client
    .post('/twitter', {
      imageData: processedData,
      altText: content
    })
    .then(res => res.data.url)
    .then(url => encodeURIComponent(`Built with #Carbon, by @dawn_labs ${url}`))
    .then(uri => `https://twitter.com/intent/tweet?text=${uri}`)
    .then(openTwitterUrl)
    .catch(checkIfRateLimited)
}

function image(state) {
  return client.post('/image', { state }).then(res => res.data)
}

function getGist(uid) {
  return gistClient
    .get(`/gists/${uid}`)
    .then(res => res.data)
    .then(gist => gist.files)
    .then(files => files[Object.keys(files)[0]])
}

// private
function openTwitterUrl(twitterUrl) {
  const width = 575
  const height = 400
  const left = (window.outerWidth - width) / 2
  const top = (window.outerHeight - height) / 2
  const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`

  window.open(twitterUrl, 'twitter', opts)
}

function checkIfRateLimited(err) {
  if (err.response.status === RATE_LIMIT_CODE) {
    alert(
      "Oh no! Looks like to many people are trying to tweet right now and we've been rate limited. Try again soon or save and upload manually!"
    )
    return
  }

  throw err
}

const downloadThumbnailImage = img => {
  return client
    .get(img.url.replace('http://', 'https://'), { responseType: 'blob' })
    .then(res => res.data)
    .then(fileToDataURL)
    .then(dataURL => Object.assign(img, { dataURL }))
}

const unsplash = {
  download(id) {
    return client
      .get(`/unsplash/download/${id}`)
      .then(res => res.data.url)
      .then(url => client.get(url, { responseType: 'blob' }))
      .then(res => res.data)
  },
  async random() {
    const imageUrls = await client.get('/unsplash/random')
    return Promise.all(imageUrls.data.map(downloadThumbnailImage))
  }
}

export default {
  gist: {
    get: getGist
  },
  tweet: debounce(tweet, ms('5s'), { leading: true, trailing: false }),
  image: debounce(image, ms('5s'), { leading: true, trailing: false }),
  unsplash,
  downloadThumbnailImage
}
