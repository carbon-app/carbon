
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

  // if root, render webpage from next
  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query)
  })

  // api endpoints
  server.post('/upload', bodyParser.json(), wrap(require('./handlers/upload')))

  // otherwise, try and get gist
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
