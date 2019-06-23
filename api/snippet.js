const url = require('url')
const { json, createError, send } = require('micro')
const firebase = require('firebase-admin')

const PRIVATE_KEY = JSON.parse(Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64').toString())

function getSnippet(admin, req) {
  const parsed = url.parse(req.url, true)
  const id = parsed.query.id

  if (!id) {
    throw createError(401, 'id is a required parameter')
  }

  const db = admin.database()

  return db
    .ref(`/snippets/${id}`)
    .once('value')
    .then(res => {
      const data = res.val()
      // ref exists
      if (data) {
        return {
          ...data,
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

async function createSnippet(admin, user, req) {
  const { code, ...config } = await json(req, { limit: '6mb' })

  if (code == null) {
    throw createError(400, 'code is a required body parameter')
  }

  const db = admin.database()

  // TODO user
  return db
    .ref('/snippets')
    .push({ ...config, code })
    .then(ref => {
      const id = ref.key
      return ref
        .once('value')
        .then(_ => _.val())
        .then(data => ({
          ...data,
          id
        }))
    })
}

async function updateSnippet(admin, user, req) {
  const parsed = url.parse(req.url, true)
  const id = parsed.query.id && parsed.query.id.replace(/\/$/, '')

  if (!id) {
    throw createError(400, 'id is a required parameter')
  }

  // TODO validate data
  const data = await json(req, { limit: '6mb' })

  const db = admin.database()
  const ref = db.ref(`/snippets/${id}`)

  // TODO user
  return ref
    .update({ ...data })
    .then(() => ref.once('value'))
    .then(_ => _.val())
    .then(data => ({
      ...data,
      id
    }))
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
  if (firebase.apps.length === 0) {
    firebase.initializeApp({
      credential: firebase.credential.cert(PRIVATE_KEY),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    })
  }
  switch (req.method) {
    case 'POST': {
      const token = req.headers.authorization.split(/\s+/).pop()
      if (!token) throw createError(401, 'Unauthorized')
      const user = await firebase.auth().verifyIdToken(token)
      if (!user) throw createError(401, 'Unauthorized')
      return createSnippet(firebase, user, req, res)
    }
    case 'PATCH': {
      const token = req.headers.authorization.split(/\s+/).pop()
      if (!token) throw createError(401, 'Unauthorized')
      const user = await firebase.auth().verifyIdToken(token)
      if (!user) throw createError(401, 'Unauthorized')
      return updateSnippet(firebase, user, req, res)
    }
    case 'GET':
      return getSnippet(firebase, req, res)
    default:
      throw createError(501, 'Not Implemented')
  }
})
