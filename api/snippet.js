const url = require('url')
const axios = require('axios')
const { json, createError, send, sendError } = require('micro')

// ~ makes the file come later alphabetically, which is how gists are sorted
const CARBON_STORAGE_KEY = '~carbon.json'

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

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  }
  const authorization = req.headers.Authorization || req.headers.authorization
  if (authorization) {
    headers.Authorization = authorization
  }

  return client
    .get(`https://api.github.com/gists/${id}`, { headers })
    .then(res => res.data)
    .then(({ files, ...gist }) => {
      let config
      if (files[CARBON_STORAGE_KEY]) {
        try {
          config = JSON.parse(files[CARBON_STORAGE_KEY].content)
        } catch (error) {
          // pass
        }
      }

      const otherFiles = Object.keys(files).filter(key => key !== CARBON_STORAGE_KEY)

      const snippet = files[otherFiles[0]]

      return {
        gist: {
          ...gist,
          filename: otherFiles[0]
        },
        config: {
          ...config,
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

  if (config && Object.keys(config).length) {
    files[CARBON_STORAGE_KEY] = {
      content: JSON.stringify(config)
    }
  }

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  }
  const authorization = req.headers.Authorization || req.headers.authorization
  if (authorization) {
    headers.Authorization = authorization
  }

  return (
    client
      // TODO
      .post(`https://api.github.com/gists`, { files, public: true }, { headers })
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

  if (config) {
    files[CARBON_STORAGE_KEY] = {
      content: JSON.stringify(config)
    }
  }

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  }
  const authorization = req.headers.Authorization || req.headers.authorization
  if (authorization) {
    headers.Authorization = authorization
  }

  return client
    .patch(`https://api.github.com/gists/${id}`, { files }, { headers })
    .then(res => res.data)
}

module.exports = async function(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        return send(res, 200, await createSnippet(req, res))
      case 'PATCH':
        return send(res, 200, await updateSnippet(req, res))
      case 'GET':
        return send(res, 200, await getSnippet(req, res))
      default:
        return sendError(req, res, createError(501, 'Not Implemented'))
    }
  } catch (err) {
    console.error(err)
    send(res, err.statusCode || 500, err.message || err)
  }
}
