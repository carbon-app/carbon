const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const next = require('next')
const puppeteer = require('puppeteer')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production' && !process.env.NOW
const app = next({ dev })
const handle = app.getRequestHandler()

function wrap(handler) {
  return (req, res) =>
    handler(req, res).catch(err => {
      console.log('ERR:', err)
    })
}

app
  .prepare()
  .then(puppeteer.launch)
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

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
