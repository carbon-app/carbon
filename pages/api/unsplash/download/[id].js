const getColors = require('get-image-colors')
const chroma = require('chroma-js')
require('isomorphic-fetch')
const { default: Unsplash, toJson } = require('unsplash-js')

const client = new Unsplash({
  applicationId: process.env.UNSPLASH_ACCESS_KEY,
  secret: process.env.UNSPLASH_SECRET_KEY,
  callbackUrl: process.env.UNSPLASH_CALLBACK_URL,
})

function getColorPalette(buffer) {
  return getColors(buffer, {
    type: 'image/jpeg',
    count: 13,
  })
}

function correctColors(colors) {
  const background = colors.reduce((a, c) => {
    const currLightness = Number(a.get('hsl.l'))
    const lightness = Number(c.get('hsl.l'))

    if (Math.abs(lightness - 0.5) > Math.abs(currLightness - 0.5)) {
      return c
    }

    return a
  })

  const palette = [
    background,
    ...colors
      .filter(c => c !== background)
      .sort((a, b) => chroma.contrast(background, b) - chroma.contrast(background, a)),
  ]

  // palette = chroma.scale(palette.map(c => c.hex())).colors(13, null)

  return palette.map(color => ({
    hex: color.hex(),
    hsl: color.hsl(),
  }))
}

const downloadImage = imageId =>
  client.photos
    .getPhoto(imageId)
    .then(toJson)
    .then(client.photos.downloadPhoto)
    .then(toJson)
    .then(data =>
      fetch(data.url)
        .then(r => r.buffer())
        .then(getColorPalette)
        .then(correctColors)
        .catch(e => {
          console.error(e)
          return null
        })
        .then(palette => ({
          palette,
          ...data,
        }))
    )

module.exports = (req, res) => {
  return downloadImage(req.query.id)
    .then(url => res.status(200).send(url))
    .catch(e => {
      // eslint-disable-next-line
      console.error(e)
      return res.status(500).send()
    })
}
