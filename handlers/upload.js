const FormData = require('form-data')
const axios = require('axios')

module.exports = async (req, res) => {
  // validate input
  if (!req.body.image || typeof req.body.image !== 'string') {
    const error = {
      code: 1,
      title: 'no image provided',
      detail: '\'image\' key must be set to a base64 encoded image'
    }
    res.status(400).json({ errors: [error] })
  }

  const image = req.body.image

  // upload image
  const url = 'https://api.imgur.com/3/image'

  const data = new FormData()
  data.append('image', image)
  data.append('type', 'base64')

  const config = {
    headers: {
      Authorization: ` Client-ID ${process.env.IMGUR_ID}`
    }
  }

  try {
    const result = await axios.post(url, data, config)

    if (!result.link) {
      throw new Error('imgur failed to provide a link')
    }

    res.status(200).json({ data: { link: result.link } })
  } catch (e) {
    console.log(Object.keys(e.response))
    const error = { code: 2, title: 'error uploading to imgur' }
    res.status(500).json({ errors: [error] })
  }
}
