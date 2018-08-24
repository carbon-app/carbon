const express = require('express')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer')

const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'

process.on('SIGINT', process.exit)

if (!dev) {
  const LOGS_ID = `${process.env.LOGS_SECRET_PREFIX}:${process.env.NOW_URL}`
  require('now-logs')(LOGS_ID)
}

function wrap(handler) {
  return (req, res) =>
    handler(req, res).catch(err => {
      // eslint-disable-next-line
      console.log('ERR:', err)
      res.status(400).end()
    })
}

const puppeteerParams = dev
  ? {}
  : {
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }

puppeteer.launch(puppeteerParams).then(browser => {
  // set up
  const server = express()
  const imageHandler = require('./handlers/image')(browser)
  const unsplashHandler = require('./handlers/unsplash')
  const oembedHandler = require('./handlers/oembed')

  if (dev) {
    server.use(morgan('tiny'))
  }

  server.use(cors())

  server.use(compression())

  // api endpoints
  server.post('/twitter', bodyParser.json({ limit: '5mb' }), require('./handlers/twitter'))
  server.post('/image', bodyParser.json({ limit: '5mb' }), wrap(imageHandler))
  server.get('/unsplash/random', wrap(unsplashHandler.randomImages))
  server.get('/unsplash/download/:imageId', wrap(unsplashHandler.downloadImage))
  server.all('/oembed', oembedHandler)

  server.listen(port, '0.0.0.0', err => {
    if (err) throw err
    // eslint-disable-next-line
    console.log(`> Ready on http://localhost:${port}`)
  })
})
