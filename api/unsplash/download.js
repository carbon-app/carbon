const url = require('url')
const { send } = require('micro')

require('isomorphic-fetch')
const { default: Unsplash, toJson } = require('unsplash-js')

const client = new Unsplash({
  applicationId: process.env.UNSPLASH_ACCESS_KEY,
  secret: process.env.UNSPLASH_SECRET_KEY,
  callbackUrl: process.env.UNSPLASH_CALLBACK_URL
})

const downloadImage = imageId =>
  client.photos
    .getPhoto(imageId)
    .then(toJson)
    .then(client.photos.downloadPhoto)
    .then(toJson)

module.exports = (req, res) => {
  const { query } = url.parse(req.url, true)
  const imageId = query.id
  return downloadImage(imageId)
    .then(url => send(res, 200, url))
    .catch(e => {
      // eslint-disable-next-line
      console.error(e)
      return send(res, 500)
    })
}
