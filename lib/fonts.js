// font parsing based on https://github.com/tsayen/dom-to-image
import { parse } from 'opentype.js';
// eslint is bullshitting here. woff2-encoder/decompress is valid (see https://github.com/itskyedo/woff2-encoder)
// eslint-disable-next-line import/no-unresolved
import decompress from 'woff2-encoder/decompress';

// will download and fetch fonts that are loaded, usable for drawing!
const URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g

export class FontRepo {


    constructor() {
        this.fonts = {}
    }



    async refresh() {
        // this can only run on the client!
        if (typeof document === 'undefined') {
            return
        }


        const stylesheets = Array.from(document.styleSheets)

        const fontData = []
        // fetch all the fonts
        for (const sheet of stylesheets) {
            try {
                const rules = sheet.cssRules
                for (const rule of rules) {
                    if (rule.constructor.name == 'CSSFontFaceRule' && rule.style.getPropertyValue('src').includes('url')) {
                        const font = rule.style.getPropertyValue('font-family').toLowerCase().replace(/['"]/g, '')

                        // check the global font repo if we already have this font
                        if (this.fonts[font] !== undefined) {
                            continue
                        }

                        const src = rule.style.getPropertyValue('src')
                        const regexResult = src.match(URL_REGEX)
                        if (regexResult == undefined) {
                            continue;
                        }
                        const url = src.match(URL_REGEX)[0].replace(URL_REGEX, '$1')
                        // TODO: dom-to-image has a edge case where the stylesheet has a different url or somehting? check there if this blows up
                        fontData.push({ font, url })
                    }
                }
            } catch (e) {
                //console.error(e)
                // not all the css rules can be read and this is fine!
                // (it's not that important, as long as we get the fonts we don't care)
            }
        }


        const uInt8FontData = await Promise.all(fontData.map(async ({ font, url }) => {
            // if it is a data url, just convert to a Uint8Array
            if (url.startsWith('data:')) {
                const base64 = url.split(',')[1]
                const binary = atob(base64)
                const bytes = new Uint8Array(binary.length)
                for (let i = 0; i < binary.length; i++) {
                    bytes[i] = binary.charCodeAt(i)
                }
                return { font, data: bytes }
            }

            // if it is a url, fetch it
            const response = await fetch(url)
            const blob = await response.blob()
            const buffer = await blob.arrayBuffer()
            return { font, data: new Uint8Array(buffer) }
        }))
        const toAddFonts = await Promise.all(uInt8FontData.map(async ({ font, data }) => {
            const format = FontRepo.detectFontFormat(data);
            let openTypeFont = null;
            try {
                if (format === 'WOFF2') {
                    const decompressed = await decompress(data);
                    openTypeFont = parse(decompressed.buffer);
                } else if (format !== null) {
                    openTypeFont = parse(data.buffer)
                }
            } catch (e) {
                //console.error('Failed to parse font', font, e)
            }

            return { font, openTypeFont }
        }))

        toAddFonts.forEach(({ font, openTypeFont }) => {
            if (openTypeFont === null) {
                return;
            }
            this.fonts[font] = openTypeFont
        })
        //console.log(this.fonts);
    }

    static detectFontFormat(uint8Array) {

        const first4BytesHex = Array.from(uint8Array.slice(0, 4)) // Extract first 4 bytes
            .map(byte => byte.toString(16).padStart(2, '0')) // Convert to hex, pad to 2 digits
            .join(''); // Combine into a single string

        switch (first4BytesHex) {
            case '774f4632': // WOFF2
                return 'WOFF2';
            case '774f4646': // WOFF
                return 'WOFF';
            case '00010000': // TTF
            case '4f54544f': // OTF
                return 'TTF/OTF';
            default:
                throw new Error(`Unknown font format: ${first4BytesHex}`);
        }
    }

    getFont(fontFamily) {
        // split the font family by comma and go through each font, if we have it, return it else zero
        const fonts = fontFamily.split(',').map(font => font.trim().toLowerCase()).map(font => font.replace(/['"]/g, '').toLowerCase())
        for (const font of fonts) {
            if (this.fonts[font] !== undefined) {
                return this.fonts[font]
            }
        }
        return null
    }

}

