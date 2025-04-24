import { v4 as uuidv4 } from 'uuid';
import { FontRepo } from './fonts';
// getting fonts inspirered by dom-to-image
const fontRepo = new FontRepo();


export async function nodeToSvg(node, config) {
    const { style, filter } = config
    await fontRepo.refresh();

    const nodeBounds = node.getBoundingClientRect()

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    svg.setAttribute('width', nodeBounds.width)
    svg.setAttribute('height', nodeBounds.height)

    const styleTag = document.createElement('style')
    styleTag.textContent = `
        transform: ${style.transform};
        transform-origin: ${style.transformOrigin};
        background: ${style.background};
        align-items: ${style.alignItems};
        justify-content: ${style.justifyContent};
    `

    svg.appendChild(styleTag)
    const neededFonts = new Set();


    const stack = [node]

    while (stack.length > 0) {
        const currentNode = stack.pop()
        // check if is a text node
        if (currentNode.nodeType === Node.TEXT_NODE) {
            // if the node has no content, we skip it
            if (currentNode.textContent.trim() === '' || currentNode.textContent.charCodeAt(0).toString(16) === '200b') {
                continue
            }
            //const charCodeStr = currentNode.textContent.charCodeAt(0).toString(16)
            //console.log(currentNode.textContent, charCodeStr)
            // find parent node
            const parent = currentNode.parentNode
            const parentStyle = window.getComputedStyle(parent)
            const range = document.createRange()
            range.selectNode(currentNode)
            const rect = range.getBoundingClientRect()
            const offsetX = rect.x - nodeBounds.x
            const offsetY = rect.y - nodeBounds.y
            // copy parent styles
            const font = fontRepo.getFont(parentStyle.fontFamily)
            if (font === null) {
                const textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text')
                textNode.setAttribute('fill', parentStyle.color)
                textNode.setAttribute('font-size', parentStyle.fontSize)
                textNode.setAttribute('font-family', parentStyle.fontFamily)
                parentStyle.fontFamily.split(',').forEach(font => neededFonts.add(font.trim()))


                textNode.setAttribute('x', offsetX)
                textNode.setAttribute('y', offsetY)



                textNode.textContent = currentNode.textContent.replace(' ', '\u00A0')
                svg.appendChild(textNode)
            } else {
                const fontSize = parseInt(parentStyle.fontSize.replace('px', ''))
                const path = font.getPath(currentNode.textContent, offsetX, offsetY + fontSize, fontSize)
                const svgPath = path.toDOMElement()
                // set color
                svgPath.setAttribute('fill', parentStyle.color)
                // start
                svg.appendChild(svgPath)
            }

            continue
        }

        // if has no children and not ignored and is div, we convert it to a rect
        if (filter(currentNode)) {
            if (currentNode.tagName === 'DIV') {
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
                const rectStyle = window.getComputedStyle(currentNode)

                const rectBounds = currentNode.getBoundingClientRect()
                const offsetX = rectBounds.x - nodeBounds.x
                const offsetY = rectBounds.y - nodeBounds.y

                rect.setAttribute('x', offsetX)
                rect.setAttribute('y', offsetY)
                rect.setAttribute('width', rectBounds.width)
                rect.setAttribute('height', rectBounds.height)
                rect.setAttribute('fill', rectStyle.backgroundColor)
                // convert this node style to style on the rect
                const nodeStyle = getComputedStyle(currentNode)
                const borderRadious = nodeStyle.getPropertyValue('border-radius')
                if (borderRadious != 'none') {
                    rect.setAttribute('rx', borderRadious)
                    rect.setAttribute('ry', borderRadious)
                }
                const boxShadow = nodeStyle.getPropertyValue('box-shadow')

                if (boxShadow != 'none') {
                    // swap color and positions on box shadow to get it compatible for drop-shadow
                    // color is in rgba format rba(r, g, b, a)
                    const globalParts = boxShadow.split(') ')
                    const colorRGBA = globalParts[0] + ')'
                    const colorParts = colorRGBA.split('(')[1].split(',')
                    colorParts[3] = colorParts[3].replace(')', '')
                    const posParts = globalParts[1].split(" ")
                    const x = posParts[0].replace('px', '')
                    const y = posParts[1].replace('px', '')
                    const blur = posParts[2].replace('px', '')

                    // create a filter for the shadow
                    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
                    const uuid = uuidv4()
                    filter.setAttribute('id', uuid)
                    filter.setAttribute('x', '-50%')
                    filter.setAttribute('y', '-50%')
                    filter.setAttribute('width', '200%')
                    filter.setAttribute('height', '200%')
                    const dropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow')
                    dropShadow.setAttribute('dx', x)
                    dropShadow.setAttribute('dy', y)
                    dropShadow.setAttribute('stdDeviation', parseFloat(blur) / 2)
                    dropShadow.setAttribute('flood-color', `rgb(${colorParts[0]}, ${colorParts[1]}, ${colorParts[2]})`)
                    dropShadow.setAttribute('flood-opacity', colorParts[3])
                    filter.appendChild(dropShadow)
                    svg.appendChild(filter)

                    // clone the rect and apply the filter
                    const rectClone = rect.cloneNode()
                    rectClone.setAttribute('filter', `url(#${uuid})`)
                    rectClone.setAttribute('fill', `rgb(${colorParts[0]}, ${colorParts[1]}, ${colorParts[2]})`)
                    svg.appendChild(rectClone)

                }
                // if the rect color is transparent, we remove the rect
                let isTransparent = false
                if (rectStyle.backgroundColor === "transparent") {
                    isTransparent
                }
                if (rectStyle.backgroundColor.startsWith('rgba')) {
                    const colorParts = rectStyle.backgroundColor.split(',')
                    const alphaPart = colorParts[3].replace(')', '').trim()
                    if (alphaPart === '0') {
                        isTransparent = true
                    }
                }
                if (!isTransparent) {
                    svg.appendChild(rect)
                }
                //console.log(rect)
            } else if (currentNode.tagName === "svg") {
                const svgElement = currentNode.cloneNode(true)
                const svgBounds = currentNode.getBoundingClientRect()
                const offsetX = svgBounds.x - nodeBounds.x
                const offsetY = svgBounds.y - nodeBounds.y
                svgElement.setAttribute('x', offsetX)
                svgElement.setAttribute('y', offsetY)
                svg.appendChild(svgElement)
            }
        }
        //console.log(currentNode)



        for (let i = 0; i < currentNode.childNodes.length; i++) {
            const childNode = currentNode.childNodes[i]
            if (!filter(childNode)) {
                continue
            }
            stack.push(childNode)
        }
    }


    // convert svg to data url
    const svgString = new XMLSerializer().serializeToString(svg)
    return `data:image/svg+xml,${svgString}`



}