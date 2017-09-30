const crypto = require('crypto')

// constants
const MAX_HASH_SET_SIZE = 1000
const COOLDOWN_THRESHOLD = 1000 * 60 * 30
const MAX_CALLS_PER_COOLDOWN = 5
const DEFAULT_HASH = `peszpw5HyQI2xoMFU0csL5n8H1k=`

let hashSet = new Set()
let ipMap = new Map()

// ip functionality
const validateIP = req => {
  const ip = req.ip
  const now = Date.now()

  if (ipMap.size > MAX_HASH_SET_SIZE) {
    ipMap = new Map()
  }

  if (ipMap.has(ip)) {
    const ipObj = ipMap.get(ip)

    if (ipObj.stamp < now - COOLDOWN_THRESHOLD) {
      // reset IP
      ipMap.set(ip, { count: 1, stamp: now })
      return true
    } else if (ipObj.count < MAX_CALLS_PER_COOLDOWN) {
      // bump call count
      ipMap.get(ip).count++
      return true
    }

    return false
  } else {
    // init IP
    ipMap.set(ip, { count: 1, stamp: now })
    return true
  }
}

// data hash functionality
const getHash = dataUrl =>
  crypto
    .createHash('sha1')
    .update(dataUrl)
    .digest('base64')

const checkHash = hash => {
  console.log(hash === DEFAULT_HASH)
  if (hashSet.has(hash)) {
    return false
  }

  if (hashSet.size > MAX_HASH_SET_SIZE) {
    hashSet = new Set()
  }

  if (hash !== DEFAULT_HASH) {
    hashSet.add(hash)
  }

  return true
}

const validate = dataUrl => checkHash(getHash(dataUrl))

module.exports = (req, res, next) => {
  // check ip
  if (!validateIP(req)) {
    return res.status(429).send('enhance your calm')
  }

  // check data
  if (!req.body || !req.body.data || !validate(req.body.data)) {
    return res.status(418).send('too many sloths')
  }

  next()
}
