const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const uploadImage = (data) => client.post('media/upload', { media_data: data })
const uploadTweet = (media) => client.post('statuses/update', { status: 'carbon copy', media_ids: media.media_id_string })
const extractImageUrl = (stuff) => console.log(stuff.entities.media[0].media_url)

const respondSuccess = (res, url) => res.json({ url })
const respondFail = (res, err) => {
  console.error(`Error: ${err.message || err}`)
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