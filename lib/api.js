import axios from 'axios'
import debounce from 'lodash.debounce'
import ms from 'ms'

import { fileToDataURL } from './util'
import firebase from './client'
import { DEFAULT_CODE } from './constants'

export const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || ''}/api`,
  headers: {
    Accept: 'application/json',
  },
})

function tweet(content, encodedImage) {
  const processedData = encodedImage.split(',')[1]

  return client
    .post('/twitter', {
      imageData: processedData,
      altText: content,
    })
    .then(res => res.data.url)
    .then(url => encodeURIComponent(`Created with @carbon_app ${url}`))
    .then(uri => `https://twitter.com/intent/tweet?text=${uri}`)
    .then(openTwitterUrl)
    .catch(checkIfRateLimited)
}

const RATE_LIMIT_CODE = 420
function checkIfRateLimited(err) {
  if (err.response.status === RATE_LIMIT_CODE) {
    alert(
      "Oh no! Looks like to many people are trying to tweet right now and we've been rate limited. Try again soon or save and upload manually!"
    )
    return
  }

  throw err
}

function image(state) {
  return client.post('/image', { state }).then(res => res.data)
}

function openTwitterUrl(twitterUrl) {
  const width = 575
  const height = 400
  const left = (window.outerWidth - width) / 2
  const top = (window.outerHeight - height) / 2
  const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`

  window.open(twitterUrl, '_blank', opts)
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
    return client.get(`/unsplash/download/${id}`).then(res => res.data)
  },
  async random() {
    const imageUrls = await client.get('/unsplash/random')
    return Promise.all(imageUrls.data.map(downloadThumbnailImage))
  },
}

const imgur = (data, title) => {
  const image = data.split(',')[1]

  return axios
    .post(
      'https://api.imgur.com/3/image',
      { image, title },
      {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
        },
      }
    )
    .then(res => res.data.data.link)
    .then(link => window.open(link, '_blank'))
    .catch(e => {
      console.error(e)
      return null
    })
}

function getSnippet(uid = '', { host, filename } = {}) {
  return client
    .get(`/snippets/${uid}`, {
      baseURL: host ? `https://${host}/api` : undefined,
      params: { filename },
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e)
      return null
    })
}

function listSnippets(page) {
  // IDEA: move into axios interceptor
  return firebase
    .auth()
    .currentUser.getIdToken()
    .then(authorization =>
      client
        .get(`/snippets`, {
          params: {
            page,
          },
          headers: {
            authorization,
          },
        })
        .then(res => res.data)
        .catch(e => {
          console.error(e)
          throw e
        })
    )
}

function updateSnippet(uid, state) {
  const data = {
    ...state,
    code: state.code != null ? state.code : DEFAULT_CODE,
  }

  if (uid) {
    return client
      .patch(`/snippets/${uid}`, data)
      .then(res => res.data)
      .catch(e => {
        console.error(e)
        return null
      })
  }
  return client
    .post(`/snippets`, data)
    .then(res => res.data)
    .catch(e => {
      console.error(e)
      return null
    })
}

function deleteSnippet(uid) {
  return client
    .delete(`/snippets/${uid}`)
    .then(res => res.data)
    .catch(e => {
      console.error(e)
      return null
    })
}

const createSnippet = debounce(data => updateSnippet(null, data), ms('5s'), {
  leading: true,
  trailing: false,
})

export default {
  snippet: {
    get: getSnippet,
    list: listSnippets,
    update: debounce(updateSnippet, ms('1s'), { leading: true, trailing: true }),
    create: createSnippet,
    delete: id => deleteSnippet(id),
  },
  tweet: debounce(tweet, ms('5s'), { leading: true, trailing: false }),
  image: debounce(image, ms('5s'), { leading: true, trailing: false }),
  unsplash,
  imgur,
  downloadThumbnailImage,
}
