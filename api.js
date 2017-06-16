import axios from 'axios'

export default {
  uploadImage
}

async function uploadImage (encodedImage) {
   // upload image
  const url = 'https://api.imgur.com/3/image'

  const data = new FormData()
  data.append('image', encodedImage)
  data.append('type', 'base64')

  const config = {
    headers: {
      Authorization: ` Client-ID 87cc98dcdabcbb3`
    }
  }

  try {
    const result = await axios.post(url, data, config)

    console.log('success! ')
    console.log(Object.keys(result.data))
    console.log(result.data)
  } catch (e) {
    console.log('bummer man')
    console.log(e)
  }
}