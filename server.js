const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

function wrap (handler) {
  return (req, res) => handler(req, res).catch((err) => {
    console.log('error handler triggereedddd')
    console.log(err)
  })
}

app.prepare()
.then(() => {
  const server = express()

  server.use(morgan('tiny'))

  server.get('/about', (req, res) =>
    app.render(req, res, '/about'))

  // if root, render webpage from next
  server.get('*', (req, res) =>
    app.render(req, res, '/', req.query))

  // otherwise, try and get gist
  server.get('*', handle)

  // api endpoints
  server.post('/upload', bodyParser.json(), wrap(require('./handlers/upload')))
  server.post('/twitter', bodyParser.json({ limit: '5mb' }), require('./handlers/twitter'))

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
