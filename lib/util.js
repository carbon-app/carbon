export const toHash = (array) => {
  return array.reduce((hash, item) => {
    const id = item.id
    if (hash[id]) {
      throw new Error('ID already exists')
    }
    hash[id] = item
    return hash
  }, {})
}
