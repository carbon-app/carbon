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
      return {
        ...res.val(),
        id
      }
    })

  // const axios = require('axios')
  // return axios
  //   .get(`https://api.github.com/gists/${id}`, {
  //     headers: {
  //       Accept: 'application/vnd.github.v3+json',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(res => res.data)
  //   .then(({ files, ...gist }) => {
  //     // let config

  //     const filename = Object.keys(files)[0]
  //     const snippet = files[filename]

  //     return {
  //       code: snippet.content,
  //       language: snippet.language && snippet.language.toLowerCase()
  //     }
  //   })
}

async function createSnippet(admin, req) {
  const { code, ...config } = await json(req, { limit: '6mb' })

  if (code == null) {
    throw createError(400, 'code is a required body parameter')
  }

  // console.log(admin.auth())

  const db = admin.database()

  return db
    .ref('/snippets')
    .push({ code, ...config })
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

async function updateSnippet(admin, req) {
  const parsed = url.parse(req.url, true)
  const id = parsed.query.id

  // TODO validate data
  const data = await json(req, { limit: '6mb' })

  if (!id) {
    throw createError(400, 'id is a required parameter')
  }

  const db = admin.database()
  const ref = db.ref(`/snippets/${id}`)

  return ref
    .update(data)
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
    case 'POST':
      return createSnippet(firebase, req, res)
    case 'PATCH':
      return updateSnippet(firebase, req, res)
    case 'GET':
      return getSnippet(firebase, req, res)
    default:
      throw createError(501, 'Not Implemented')
  }
})
