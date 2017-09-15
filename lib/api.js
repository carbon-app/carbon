import axios from 'axios'

const DOMAIN = process.browser ? document.location.origin : ''

const gistClient = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  }
});

async function tweet (encodedImage) {
  const processedData = encodedImage.split(',')[1]

  return axios.post(`${DOMAIN}/twitter`, { data: processedData })
  .then(res => res.data.url)
  .then(url => encodeURIComponent(`Built with #Carbon, by @dawn_labs ${url}`))
  .then(uri => `https://twitter.com/intent/tweet?text=${uri}`)
  .then(openTwitterUrl)
}

const getGist = (id) => {
  const uid = id.split('/').pop()
  return gistClient.get(`/gists/${uid}`)
    .then(res => res.data)
    .then(gist => gist.files)
    .then(files => files[Object.keys(files)[0]])
    .then(file => file.content)
}

// private
function openTwitterUrl (twitterUrl) {
  const width  = 575, height = 400
  const left = (window.outerWidth  - width)  / 2
  const right = (window.outerHeight - height) / 2
  const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`

  window.open(twitterUrl, 'twitter', opts)
}


export default {
  getGist,
  tweet
}
