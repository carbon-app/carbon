import axios from 'axios'

const gistClient = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  }
});

async function uploadImage (encodedImage) {
   // upload image
  const url = 'https://api.imgur.com/3/image'

  const data = new FormData()
  data.append('image', encodedImage)
  data.append('type', 'image/png')

  const config = {
    headers: {
      Authorization: `Client-ID 87cc98dcdabcbb3`
    }
  }

  return axios.post(url, data, config)
    .then(res => res.data)
    .catch(console.log)
}

const getGist = (id) => {
  const uid = id.split('/').pop()
  return gistClient.get(`/gists/${uid}`)
    .then(res => res.data)
    .then(gist => gist.files)
    .then(files => files[Object.keys(files)[0]])
    .then(file => file.content)
}


export default {
  uploadImage,
  getGist
}
