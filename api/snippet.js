const micro = require('micro')
const { json, createError } = require('micro')

const CARBON_STORAGE_KEY = '~carbon.json'

async function updateSnippet(req) {
  const id = req.url.split('/').pop()
  if (id === 'snippet') {
    // TODO use query param routing
    return null
  }
  const { filename, code, ...config } = await json(req, { limit: '6mb' })
  // TODO filename's are required
  if (!id || !filename) {
    throw createError(400, 'id and filename are required body parameters')
  }

  try {
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

    return await fetch(`https://api.github.com/gists/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ files }),
      headers: req.headers
    }).then(res => res.json())
  } catch (e) {
    console.error(e)
    return null
  }
}
module.exports = micro(function(req, res) {
  switch (req.method) {
    // case 'POST':
    //   return createSnippet(req, res)
    case 'PATCH':
      return updateSnippet(req, res)
    // default:
    //   return getSnippet(req, res)
  }
  throw new Error('Unimplemented')
})
