const visit = require('unist-util-visit')

module.exports = ({ markdownAST }, { width = '1024px', height = '473px' } = {}) => {
  visit(markdownAST, 'text', node => {
    const { value } = node
    const match = /https:\/\/carbon\.now\.sh\/{0,1}(.*)/.exec(value)
    if (match) {
      const url = match[1]
      node.type = 'html'
      node.value = `<iframe
  src="https://carbon.now.sh/embed${url}"
  width="${width}"
  height="${height}"
  frameborder="0"
  style="transform:scale(0.7); border: 0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>`
    }
  })

  return markdownAST
}
