const Morph = require('morphmorph')
const url = require('url')
const { json, createError, send } = require('micro')
const admin = require('firebase-admin')

const PRIVATE_KEY = JSON.parse(Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64').toString())

const mapper = new Morph({
  types: {
    bool: v => {
      if (v == null) return undefined
      if (v === 'false') return false
      return Boolean(v)
    }
  }
})

const allowedKeys = [
  'backgroundColor',
  'backgroundMode',
  'code',
  { field: 'dropShadow', type: 'bool' },
  'dropShadowBlurRadius',
  'dropShadowOffsetY',
  'exportSize',
  'fontFamily',
  'fontSize',
  'language',
  'lineHeight',
  { field: 'lineNumbers', type: 'bool' },
  'marginHorizontal',
  'marginVertical',
  'paddingHorizontal',
  'paddingVertical',
  'preset',
  { field: 'squaredImage', type: 'bool' },
  'theme',
  'watermark',
  { field: 'widthAdjustment', type: 'bool' },
  { field: 'windowControls', type: 'bool' },
  'windowTheme'
]

function sanitizeInput(obj = {}) {
  return mapper.map(allowedKeys, obj)
}

function getSnippet(req) {
  const parsed = url.parse(req.url, true)
  const id = parsed.query.id

  if (!id) {
    throw createError(400, 'id is a required parameter')
  }

  const db = admin.database()

  return db
    .ref('snippets')
    .child(id)
    .once('value')
    .then(data => {
      if (data.exists) {
        return {
          ...data.val(),
          id
        }
      }

      const axios = require('axios')
      return axios
        .get(`https://api.github.com/gists/${id}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.data)
        .then(({ files }) => {
          const filename = Object.keys(files)[0]
          const snippet = files[filename]

          return {
            code: snippet.content,
            language: snippet.language && snippet.language.toLowerCase()
          }
        })
        .catch(e => {
          throw createError(e.response.status, e.response.data.message)
        })
    })
}

async function createSnippet(user, req) {
  const { code, ...data } = await json(req, { limit: '6mb' })

  if (code == null) {
    throw createError(400, 'code is a required body parameter')
  }

  const db = admin.database()

  return db
    .ref('snippets')
    .push({ ...sanitizeInput(data), code, userId: user.uid })
    .then(ref => ref.once('value'))
    .then(data => ({
      ...data.val(),
      id: data.key
    }))
}

async function updateSnippet(user, req) {
  const parsed = url.parse(req.url, true)
  const id = parsed.query.id && parsed.query.id.replace(/\/$/, '')

  if (!id) {
    throw createError(400, 'id is a required parameter')
  }

  const db = admin.database()
  const ref = db.ref('snippets').child(id)

  return ref
    .once('value')
    .then(data => {
      const value = data.val()
      if (value.userId === user.uid) {
        return value
      }
      throw createError(403, 'Forbidden')
    })
    .then(value =>
      json(req, { limit: '6mb' })
        // null for DELETE
        .then(data => (data ? sanitizeInput(data) : null))
        .then(updates =>
          ref.update(updates).then(() => ({
            ...value,
            ...updates,
            id: ref.key
          }))
        )
    )
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

async function authorizeUser(req) {
  const token = req.headers.authorization.split(/\s+/).pop()
  if (!token) throw createError(401, 'Unauthorized')
  const user = await admin.auth().verifyIdToken(token)
  if (!user) throw createError(401, 'Unauthorized')
  return user
}

module.exports = handleErrors(async function(req, res) {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(PRIVATE_KEY),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    })
  }

  switch (req.method) {
    case 'POST': {
      const user = await authorizeUser(req)
      return createSnippet(user, req, res)
    }
    case 'DELETE':
    case 'PATCH': {
      const user = await authorizeUser(req)
      return updateSnippet(user, req, res)
    }
    case 'GET':
      return getSnippet(req, res)
    default:
      throw createError(501, 'Not Implemented')
  }
})
