const url = require('url')
const axios = require('axios')
const { json, createError, send } = require('micro')

const client = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  }
})

function getSnippet(req) {
  const parsed = url.parse(req.url, true)
  const id = parsed.query.id

  if (!id) {
    throw createError(401, 'id is a required parameter')
  }

  const authorization = req.headers.Authorization || req.headers.authorization
  const options = authorization ? { headers: { Authorization: authorization } } : undefined

  return client
    .get(`https://api.github.com/gists/${id}`, options)
    .then(res => res.data)
    .then(({ files, ...gist }) => {
      // let config

      const filename = Object.keys(files)[0]

      const snippet = files[filename]

      return {
        gist: {
          ...gist,
          filename
        },
        config: {
          code: snippet.content,
          language: snippet.language && snippet.language.toLowerCase()
        }
      }
    })
}

async function createSnippet(req) {
  const { code, ...config } = await json(req, { limit: '6mb' })

  if (!code) {
    throw createError(400, 'code is a required body parameter')
  }

  const files = {
    ['index.js']: {
      content: code
    }
  }

  const authorization = req.headers.Authorization || req.headers.authorization
  const options = authorization ? { headers: { Authorization: authorization } } : undefined

  return (
    client
      // TODO
      .post(`https://api.github.com/gists`, { files, public: true }, options)
      .then(res => res.data)
  )
}

async function updateSnippet(req) {
  const parsed = url.parse(req.url, true)
  const id = parsed.query.id

  const { filename, code, ...config } = await json(req, { limit: '6mb' })

  if (!id) {
    throw createError(400, 'id is a required parameter')
  }

  // TODO filename's are required
  if (!filename) {
    throw createError(400, 'filename is a required body parameter')
  }

  if (!code) {
    throw createError(400, 'code is a required body parameter')
  }

  const files = {
    [filename]: {
      content: code
    }
  }

  const authorization = req.headers.Authorization || req.headers.authorization
  const options = authorization ? { headers: { Authorization: authorization } } : undefined

  return client
    .patch(`https://api.github.com/gists/${id}`, { files }, options)
    .then(res => res.data)
}

function handleErrors(fn) {
  return async function(req, res) {
    try {
      return send(res, 200, await fn(req, res))
    } catch (err) {
      console.error(err)
      send(res, err.statusCode || 500, err.message || err)
    }
  }
}

module.exports = handleErrors(async function(req, res) {
  switch (req.method) {
    case 'POST':
      return createSnippet(req, res)
    case 'PATCH':
      return updateSnippet(req, res)
    case 'GET':
      return getSnippet(req, res)
    default:
      throw createError(501, 'Not Implemented')
  }
})
