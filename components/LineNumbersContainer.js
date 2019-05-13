import React from 'react'

function LineNumbersContainer(props) {
  const lastNumber = React.useRef(null)

  React.useEffect(() => {
    const rows = Array.from(document.querySelectorAll('.CodeMirror-linenumber')).slice(1)
    const lines = document.querySelectorAll('.CodeMirror-line')

    const nodes = rows.map(
      (row, i) => {
        function handler(e) {
          const prev = lastNumber.current

          lines.forEach((line, j, arr) => {
            if (i != j) {
              if (prev == null) {
                // TODO props.doc.current.editor.doc.addLineClass(j, 'text', 'blurred')
                line.style.opacity = 0.5
              }
            } else {
              if (e.shiftKey && prev != null) {
                for (let index = Math.min(prev, i); index < Math.max(prev, i) + 1; index++) {
                  arr[index].style.opacity = arr[prev].style.opacity
                }
              } else {
                line.style.opacity = line.style.opacity == 1 ? 0.5 : 1
              }
            }
          })

          lastNumber.current = i
        }

        row.addEventListener('click', handler)

        return [row, handler]
      },
      [props.on]
    )

    return () => nodes.map(([n, fn]) => n.removeEventListener('click', fn))
  })

  return props.children
}

export default LineNumbersContainer
