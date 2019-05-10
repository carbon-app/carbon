import React from 'react'

function LineNumbersContainer(props) {
  const lastNumber = React.useRef(null)

  React.useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.CodeMirror-linenumber'))
      .slice(1)
      .map(
        (node, i) => {
          function handler(e) {
            const set = lastNumber.current
            document.querySelectorAll('.CodeMirror-line').forEach((line, j, arr) => {
              // TODO use state instead of mutation
              if (i != j) {
                if (set == null) {
                  line.style.opacity = 0.5
                }
              } else {
                if (e.shiftKey && set != null) {
                  for (let index = Math.min(set, i); index < Math.max(set, i) + 1; index++) {
                    arr[index].style.opacity = arr[set].style.opacity
                  }
                } else {
                  line.style.opacity = line.style.opacity == 1 ? 0.5 : 1
                }
              }
            })
            lastNumber.current = i
          }
          node.addEventListener('click', handler)

          return [node, handler]
        },
        [props.on]
      )

    return () => nodes.map(([n, fn]) => n.removeEventListener('click', fn))
  })

  return props.children
}

export default LineNumbersContainer
