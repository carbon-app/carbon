// Theirs
import { Container } from 'unstated'
import domtoimage from 'dom-to-image'

// Ours
import api from '../lib/api'
import {
  DEFAULT_EXPORT_SIZE,
  EXPORT_SIZES_HASH,
  DEFAULT_CODE,
  DEFAULT_SETTINGS
} from '../lib/constants'
import { serializeState } from '../lib/routing'
import { getState, isImage } from '../lib/util'

class EditorContainer extends Container {
  constructor(props = {}) {
    super(props)
    this.state = {
      ...DEFAULT_SETTINGS,
      uploading: false,
      code: props.content
    }

    this.save = this.save.bind(this)
    this.upload = this.upload.bind(this)
    this.updateSetting = this.updateSetting.bind(this)
    this.updateCode = this.updateSetting.bind(this, 'code')
    this.updateAspectRatio = this.updateSetting.bind(this, 'aspectRatio')
    this.updateTitleBar = this.updateSetting.bind(this, 'titleBar')
    this.updateTheme = this.updateTheme.bind(this)
    this.updateLanguage = this.updateLanguage.bind(this)
    this.updateBackground = this.updateBackground.bind(this)
    this.resetDefaultSettings = this.resetDefaultSettings.bind(this)
    this.getCarbonImage = this.getCarbonImage.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  componentDidMount() {
    // Load from localStorage and then URL params
    this.setState({
      ...getState(localStorage),
      ...this.props.initialState
    })
  }

  componentDidUpdate() {
    this.props.onUpdate(this.state)
  }

  getCarbonImage({ format } = { format: 'png' }) {
    // if safari, get image from api
    if (
      navigator.userAgent.indexOf('Safari') !== -1 &&
      navigator.userAgent.indexOf('Chrome') === -1 &&
      format === 'png'
    ) {
      const encodedState = serializeState(this.state)
      return api.image(encodedState)
    }

    const node = document.getElementById('export-container')

    const exportSize = (EXPORT_SIZES_HASH[this.state.exportSize] || DEFAULT_EXPORT_SIZE).value
    const width = node.offsetWidth * exportSize
    const height = this.state.squaredImage
      ? node.offsetWidth * exportSize
      : node.offsetHeight * exportSize

    const config = {
      style: {
        transform: `scale(${exportSize})`,
        'transform-origin': 'center',
        background: this.state.squaredImage ? this.state.backgroundColor : 'none'
      },
      filter: n => {
        // %[00 -> 19] cause failures
        if (n.innerText && n.innerText.match(/%[0-1][0-9]/)) {
          return false
        }
        if (n.className) {
          return String(n.className).indexOf('eliminateOnRender') < 0
        }
        return true
      },
      width,
      height
    }

    if (format === 'svg') {
      return domtoimage
        .toSvg(node, config)
        .then(dataUrl => dataUrl.split('&nbsp;').join('&#160;'))
        .then(uri => uri.slice(uri.indexOf(',') + 1))
        .then(data => new Blob([data], { type: 'image/svg+xml' }))
        .then(data => window.URL.createObjectURL(data))
    }

    return domtoimage.toBlob(node, config).then(blob => window.URL.createObjectURL(blob))
  }

  updateSetting(key, value) {
    this.setState({ [key]: value })
  }

  save({ id: format = 'png' }) {
    const link = document.createElement('a')

    return this.getCarbonImage({ format }).then(url => {
      link.download = `carbon.${format}`
      link.href = url
      document.body.appendChild(link)
      link.click()
      link.remove()
    })
  }

  resetDefaultSettings() {
    this.setState(DEFAULT_SETTINGS)
    localStorage.clear()
  }

  upload() {
    this.setState({ uploading: true })
    this.getCarbonImage({ format: 'png' })
      .then(this.props.tweet)
      .catch(console.error)
      .then(() => this.setState({ uploading: false }))
  }

  onDrop([file]) {
    if (isImage(file)) {
      this.setState({
        backgroundImage: file.content,
        backgroundImageSelection: null,
        backgroundMode: 'image'
      })
    } else {
      this.setState({ code: file.content, language: 'auto' })
    }
  }

  updateTheme(theme) {
    this.updateSetting('theme', theme.id)
  }

  updateLanguage(language) {
    this.updateSetting('language', language.mime || language.mode)
  }

  updateBackground({ photographer, ...changes } = {}) {
    if (photographer) {
      this.setState(({ code = DEFAULT_CODE }) => ({
        ...changes,
        code: code + `\n\n// Photo by ${photographer.name} on Unsplash`
      }))
    } else {
      this.setState(changes)
    }
  }
}

EditorContainer.defaultProps = {
  onUpdate: () => {}
}

export default EditorContainer
