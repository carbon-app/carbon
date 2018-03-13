const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const next = require('next')
const puppeteer = require('puppeteer')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

if (!dev) {
  const LOGS_ID = `${process.env.LOGS_SECRET_PREFIX}:${process.env.NOW_URL}`
  require('now-logs')(LOGS_ID)
}

function wrap(handler) {
  return (req, res) =>
    handler(req, res).catch(err => {
      console.log('ERR:', err)
    })
}

const puppeteerParams = dev
  ? {}
  : {
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }

app
  .prepare()
  .then(puppeteer.launch.bind(puppeteer, puppeteerParams))
  .then(browser => {
    // set up
    const server = express()
    const imageHandler = require('./handlers/image')(browser)

    server.use(morgan('tiny'))

    server.get('/about', (req, res) => app.render(req, res, '/about'))

    // if root, render webpage from next
    server.get('/*', (req, res) => app.render(req, res, '/', req.query))

    // otherwise, try and get gist
    server.get('*', handle)

    // api endpoints
    server.post('/twitter', bodyParser.json({ limit: '5mb' }), require('./handlers/twitter'))
    server.post('/image', bodyParser.json({ limit: '5mb' }), wrap(imageHandler))

    server.listen(port, '0.0.0.0', err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
