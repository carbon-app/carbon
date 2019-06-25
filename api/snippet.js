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

async function createSnippet(admin, user, req) {
  const { code, ...data } = await json(req, { limit: '6mb' })

  if (code == null) {
    throw createError(400, 'code is a required body parameter')
  }

  const db = admin.database()

  // TODO user
  return db
    .ref('snippets')
    .push({ ...data, code, userId: user.uid })
    .then(ref => ref.once('value'))
    .then(data => ({
      ...data.val(),
      id: data.key
    }))
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
  const ref = db.ref('snippets').child(id)

  // TODO user
  return ref.once('value').then(snapshot => {
    if (snapshot.val().userId === user.uid) {
      const updates = { ...data, userId: user.uid }

      return ref.update(updates).then(() => ({
        ...updates,
        id: snapshot.key
      }))
    }

    throw createError(403, 'Forbidden')
  })
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
  const user = await firebase.auth().verifyIdToken(token)
  if (!user) throw createError(401, 'Unauthorized')
  return user
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
      const user = await authorizeUser(req)
      return createSnippet(firebase, user, req, res)
    }
    case 'PATCH': {
      const user = await authorizeUser(req)
      return updateSnippet(firebase, user, req, res)
    }
    case 'GET':
      return getSnippet(firebase, req, res)
    default:
      throw createError(501, 'Not Implemented')
  }
})
