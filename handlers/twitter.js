const Twitter = require('twit')
const morph = require('morphmorph')

const RATE_LIMIT_CODE = 420
const MAX_ALT_TEXT_LENGTH = 420

let client
try {
  client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })
} catch (e) {
  // eslint-disable-next-line
  console.warn(e.message)
}
const extractMediaId = morph.get('data.media_id_string')
const extractImageUrl = morph.get('data.entities.media.0.display_url')
const extractErrorCode = morph.get('0.code')

const uploadImage = data => client.post('media/upload', { media_data: data })
const uploadMetadata = (altText, twitterRes = {}) => {
  if (!altText) return twitterRes

  const formattedAltText =
    altText.length > MAX_ALT_TEXT_LENGTH
      ? `${altText.slice(0, MAX_ALT_TEXT_LENGTH - 3)}...`
      : altText

  return client
    .post('media/metadata/create', {
      media_id: extractMediaId(twitterRes),
      alt_text: { text: formattedAltText }
    })
    .then(() => twitterRes)
}
const uploadTweet = (twitterRes = {}) =>
  client.post('statuses/update', {
    status: `Carbon Copy #${extractMediaId(twitterRes).slice(0, 8)}`,
    media_ids: extractMediaId(twitterRes)
  })

const respondSuccess = (res, url) => res.json({ url })
const respondFail = (res, err) => {
  const errorCode = extractErrorCode(err)

  // check for rate limit
  if (errorCode === RATE_LIMIT_CODE) {
    return res.status(420).send()
  }

  // eslint-disable-next-line
  console.error(`Error: ${err.message || JSON.stringify(err, null, 2)}`)
  return res.status(500).send()
}

module.exports = (req, res) => {
  if (!req.body.imageData) {
    return res.status(400).send()
  }

  return uploadImage(req.body.imageData)
    .then(uploadMetadata.bind(null, req.body.altText))
    .then(uploadTweet)
    .then(extractImageUrl)
    .then(respondSuccess.bind(null, res))
    .catch(respondFail.bind(null, res))
}
