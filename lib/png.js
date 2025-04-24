import { nodeToSvg } from "./svg"
import { blobToDataURL } from "./util";
export async function nodeToPng(node, config) {
    const svgBlob = await nodeToSvg(node, config)
        .then(uri => uri.slice(uri.indexOf(',') + 1))
        .then(data => new Blob([data], { type: 'image/svg+xml' }))
    const svgDataUri = await blobToDataURL(svgBlob);

    // https://zooper.pages.dev/articles/how-to-convert-a-svg-to-png-using-canvas
    const canvas = document.createElement('canvas')
    const transformStyle = config.style.transform;
    const scale = parseFloat(transformStyle.match(/scale\(([^)]+)\)/)[1]) // multiplyer!

    const width = node.getBoundingClientRect().width * scale
    const height = node.getBoundingClientRect().height * scale

    canvas.width = width
    canvas.height = height
    await drawImgToCanvas(svgDataUri, canvas, scale)
    const pngUrl = canvas.toDataURL('image/png')
    return pngUrl
}

function drawImgToCanvas(imgUrl, canvas, scale = 1) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            const ctx = canvas.getContext('2d')
            ctx.scale(scale, scale)
            ctx.drawImage(img, 0, 0)
            resolve()
        }
        img.onerror = reject
        img.src = imgUrl
    })
}