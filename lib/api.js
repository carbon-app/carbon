import axios from 'axios'
import debounce from 'lodash.debounce'
import ms from 'ms'

const DOMAIN = process.browser ? document.location.origin : ''
const RATE_LIMIT_CODE = 420

const gistClient = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  }
})

async function tweet(encodedImage) {
  const processedData = encodedImage.split(',')[1]

  return axios
    .post(`${DOMAIN}/twitter`, { data: processedData })
    .then(res => res.data.url)
    .then(url => encodeURIComponent(`Built with #Carbon, by @dawn_labs ${url}`))
    .then(uri => `https://twitter.com/intent/tweet?text=${uri}`)
    .then(openTwitterUrl)
    .catch(checkIfRateLimited)
}

async function image(url) {
  return axios.post(`${DOMAIN}/image`, { url }).then(res => res.data.dataUrl)
}

const getGist = uid => {
  return gistClient
    .get(`/gists/${uid}`)
    .then(res => res.data)
    .then(gist => gist.files)
    .then(files => files[Object.keys(files)[0]])
    .then(file => file.content)
}

// private
function openTwitterUrl(twitterUrl) {
  const width = 575,
    height = 400
  const left = (window.outerWidth - width) / 2
  const right = (window.outerHeight - height) / 2
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

export default {
  getGist,
  tweet: debounce(tweet, ms('5s'), { leading: true, trailing: true }),
  image: debounce(image, ms('5s'), { leading: true, trailing: true })
}
