// Theirs
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import domtoimage from 'dom-to-image'
import ReadFileDropContainer, { DATA_URL, TEXT } from 'dropperx'

import '../node_modules/react-dat-gui/build/react-dat-gui.css';
import DatGui, { DatColor, DatPresets, DatFolder, DatString } from 'react-dat-gui';

// Ours
import Button from './Button'
import Dropdown from './Dropdown'
import BackgroundSelect from './BackgroundSelect'
import Settings from './Settings'
import Toolbar from './Toolbar'
import Overlay from './Overlay'
import Carbon from './Carbon'
import api from '../lib/api'
import {
  THEMES,
  THEMES_HASH,
  LANGUAGES,
  LANGUAGE_MIME_HASH,
  LANGUAGE_MODE_HASH,
  LANGUAGE_NAME_HASH,
  DEFAULT_THEME,
  DEFAULT_EXPORT_SIZE,
  COLORS,
  EXPORT_SIZES_HASH,
  DEFAULT_CODE,
  DEFAULT_SETTINGS
} from '../lib/constants'
import { serializeState } from '../lib/routing'
import { getState } from '../lib/util'

const saveButtonOptions = {
  button: true,
  color: '#c198fb',
  selected: { id: 'SAVE_IMAGE', name: 'Save Image' },
  list: ['png', 'svg'].map(id => ({ id, name: id.toUpperCase() }))
}

const themePresets = [
  {
    Seti: {
      "background": "#151718",
      "color": "#cfd2d1",
      "cm-keyword": "#e6cd69",
      "cm-operator": "#9fca56",
      "cm-def": "#55b5db",
      "cm-meta": "#55b5db",
      "cm-string": "#55b5db",
      // "cm-variable": "#a074c4",
      "cm-variable-2": "#a074c4",
      "cm-property": "#a074c4",
      "cm-number": "#cd3f45"
    },
    Material: {
      "background": "#263238",
      "color": "#e9eded",
      "cm-keyword": "#c792ea",
      "cm-operator": "#e9eded",
      "cm-def": "#e9eded",
      "cm-meta": "#80cbc4",
      "cm-string": "#c3e88d",
      // "cm-variable": "#a074c4",
      "cm-variable-2": "#80cbc4",
      "cm-property": "#80cbae",
      "cm-number": "#f77669"
    },
  }
]
const customThemes = themePresets[0]
const defaultTheme = {
  "background": "#",
  "color": "#",
  "cm-keyword": "#",
  "cm-operator": "#",
  "cm-def": "#",
  "cm-meta": "#",
  "cm-string": "#",
  // "cm-variable": "#",
  "cm-variable-2": "#",
  "cm-property": "#",
  "cm-number": "#"
}

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign(
      {
        ...DEFAULT_SETTINGS,
        uploading: false,
        code: props.content,
        customThemeStyle: {
          current: defaultTheme,
          presets: themePresets,
        }
      },
      this.props.initialState
    )

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
    this.colorsChanged = this.colorsChanged.bind(this)
    this.loadCustomFont = this.loadCustomFont.bind(this)
  }

  componentDidMount() {
    // Load from localStorage instead of query params
    if (!this.props.initialState) {
      const state = getState(localStorage)
      if (state) {
        this.setState(state)
      }
    }

    // Load initial custom theme
    this.state.theme === 'custom' && this.setCustomStyles()
  }

  componentDidUpdate() {
    this.props.onUpdate(this.state)
  }

  getCarbonImage({ format, type } = { format: 'png' }) {
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
      filter: n => (n.className ? String(n.className).indexOf('eliminateOnRender') < 0 : true),
      width,
      height,
      // %[00 -> 19] cause failures
      filter: node => !(node.innerText && node.innerText.match(/%[0-1][0-9]/))
    }

    if (type === 'blob')
      return domtoimage
        .toBlob(node, config)
        .then(blob => window.URL.createObjectURL(blob, { type: 'image/png' }))

    if (format === 'svg')
      return domtoimage.toSvg(node, config).then(dataUrl => dataUrl.split('&nbsp;').join('&#160;'))

    return domtoimage.toPng(node, config)
  }

  updateSetting(key, value) {
    this.setState({ [key]: value })
  }

  save({ id: format = 'png' }) {
    const link = document.createElement('a')

    const type = format === 'png' ? 'blob' : undefined

    return this.getCarbonImage({ format, type }).then(url => {
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
      .then(api.tweet)
      .then(() => this.setState({ uploading: false }))
      .catch(err => {
        console.error(err)
        this.setState({ uploading: false })
      })
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

  updateBackground(changes, cb) {
    this.setState(changes, cb)
  }

  colorsChanged(newColors) {
    const customThemeStyle = this.state.customThemeStyle
    customThemeStyle.current = newColors
    this.setState({customThemeStyle})
    this.setCustomStyles()
  }

  loadCustomFont() {
    const currentCustomFontElement = document.getElementById("custom-font")
    const head = document.getElementsByTagName('head')[0]
    const link = document.createElement('link')
    link.id = "custom-font"
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = this.state.customThemeStyle.current.fontURL
    link.media = 'all'

    if(currentCustomFontElement) {
      currentCustomFontElement.remove()
      head.appendChild(link)
    }
    else {
      head.appendChild(link)
    }
  }

  setCustomStyles() {
    // Convert customThemeStyle to iterable object
    const withoutFontProps = Object.assign({}, this.state.customThemeStyle.current)
    delete withoutFontProps.fontURL
    delete withoutFontProps.fontName
    const iterableStyles = Object.entries(withoutFontProps)

    // The editor background and text color properties need to be handled differently
    const windowProps = ["background", "color"]
    const isWindowProp = (property) => windowProps.includes(property)

    const currentStyle = this.state.customThemeStyle.current

    const customFontCSS = `
    .CodeMirror__container > .CodeMirror
      {
        font-family: ${currentStyle.fontName ? currentStyle.fontName : DEFAULT_SETTINGS.fontFamily} !important;
        font-size: ${currentStyle.fontSize ? currentStyle.fontSize : DEFAULT_SETTINGS.fontSize}px !important;
      }
    `

    // Return CSS string of custom theme styles
    const generateCustomStyleCSS = () => {
      return iterableStyles.map(([key, value]) => {
        return isWindowProp(key)
          ? `.cm-s-custom.CodeMirror {${key}: ${value};}`
          : `.cm-s-custom .${key} {color: ${value};}`
      }).join("\n") + customFontCSS
    }

    this.loadCustomFont()

    // Get the custom-styles node and remove it's previous CSS text
    const style = document.getElementById("custom-styles")
    style.firstChild && style.removeChild(style.firstChild);

    // Set the style element content to our generated CSS
    style.appendChild(document.createTextNode(generateCustomStyleCSS()))
  }



  render() {
    const themeStyles = {...this.state.customThemeStyle.current, ...this.state.customThemeStyle.fontURL, ...this.state.customThemeStyle.fontName, ...this.state.customThemeStyle.fontSize}
    return (
      <React.Fragment>
        <div id="editor">
          <Toolbar>
            <Dropdown
              selected={THEMES_HASH[this.state.theme] || DEFAULT_THEME}
              list={THEMES}
              onChange={this.updateTheme}
            />
            <Dropdown
              selected={
                LANGUAGE_NAME_HASH[this.state.language] ||
                LANGUAGE_MIME_HASH[this.state.language] ||
                LANGUAGE_MODE_HASH[this.state.language]
              }
              list={LANGUAGES}
              onChange={this.updateLanguage}
            />
            <BackgroundSelect
              onChange={this.updateBackground}
              mode={this.state.backgroundMode}
              color={this.state.backgroundColor}
              image={this.state.backgroundImage}
              aspectRatio={this.state.aspectRatio}
            />
            <Settings
              {...this.state}
              onChange={this.updateSetting}
              resetDefaultSettings={this.resetDefaultSettings}
            />
            <div className="buttons">
              <Button
                className="tweetButton"
                onClick={this.upload}
                title={this.state.uploading ? 'Loading...' : 'Tweet Image'}
                color="#57b5f9"
                style={{ marginRight: '8px' }}
              />
              <Dropdown {...saveButtonOptions} onChange={this.save} />
            </div>
            <DatGui data={themeStyles} onUpdate={this.colorsChanged}>
              <DatPresets label='Theme Presets' options={this.state.customThemeStyle.presets} onUpdate={this.colorsChanged} />
              <DatString label='Custom Font Name' path="fontName" />
              <DatString label='Custom Font Size' path="fontSize" />
              <DatString label='Custom Font URL' path="fontURL" />
              <DatFolder title='Show Colors'>
                {Object.keys(this.state.customThemeStyle.current).map(key => <DatColor path={key} label={key} key={key} />)}
              </DatFolder>
            </DatGui>
          </Toolbar>

          <ReadFileDropContainer readAs={readAs} onDrop={this.onDrop}>
            {({ isOver, canDrop }) => (
              <Overlay
                isOver={isOver || canDrop}
                title={`Drop your file here to import ${isOver ? '✋' : '✊'}`}
              >
                <Carbon
                  config={this.state}
                  updateCode={this.updateCode}
                  onAspectRatioChange={this.updateAspectRatio}
                  titleBar={this.state.titleBar}
                  updateTitleBar={this.updateTitleBar}
                >
                  {this.state.code != null ? this.state.code : DEFAULT_CODE}
                </Carbon>
              </Overlay>
            )}
          </ReadFileDropContainer>
        </div>
        <style jsx>
          {`
            #editor {
              background: ${COLORS.BLACK};
              border: 3px solid ${COLORS.SECONDARY};
              border-radius: 8px;
              padding: 16px;
            }

            .buttons {
              display: flex;
              margin-left: auto;
            }
          `}
        </style>
        <style id="custom-styles" />
      </React.Fragment>
    )
  }
}

function isImage(file) {
  return file.type.split('/')[0] === 'image'
}

function readAs(file) {
  if (isImage(file)) {
    return DATA_URL
  }
  return TEXT
}

Editor.defaultProps = {
  onUpdate: () => {}
}

export default DragDropContext(HTML5Backend)(Editor)
