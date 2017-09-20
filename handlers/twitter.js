const Twitter = require('twitter')
const morph = require('morphmorph')

const RATE_LIMIT_CODE = 420

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const uploadImage = (data) => client.post('media/upload', { media_data: data })
const uploadTweet = (media) => client.post('statuses/update', { status: 'Carbon Copy', media_ids: media.media_id_string })
const extractImageUrl = morph.get('entities.media.0.display_url')
const extractErrorCode = morph.get('0.code')

const respondSuccess = (res, url) => res.json({ url })
const respondFail = (res, err) => {
  const errorCode = extractErrorCode(err)

  // check for rate limit
  if (errorCode === RATE_LIMIT_CODE) {
    return res.status(420).send()
  }

  console.error(`Error: ${errorCode || err.message}`)
  res.status(500).send()
}

module.exports = (req, res) => {
  if (!req.body.data) {
    return res.status(400).send()
  }

  uploadImage(req.body.data)
    .then(uploadTweet)
    .then(extractImageUrl)
    .then(respondSuccess.bind(null, res))
    .catch(respondFail.bind(null, res))
}
