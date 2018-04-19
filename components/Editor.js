// Theirs
import React from 'react'
import { Provider, Subscribe } from 'unstated'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import domtoimage from 'dom-to-image'
import ReadFileDropContainer, { DATA_URL, TEXT } from 'dropperx'

// Ours
import EditorContainer from '../containers/Editor'
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
  COLORS,
  DEFAULT_CODE,
  DEFAULT_SETTINGS
} from '../lib/constants'
import { isImage } from '../lib/util'

const saveButtonOptions = {
  button: true,
  color: '#c198fb',
  selected: { id: 'SAVE_IMAGE', name: 'Save Image' },
  list: ['png', 'svg'].map(id => ({ id, name: id.toUpperCase() }))
}

const to = [EditorContainer]

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.inject = [new EditorContainer(props)]
    this.renderEditor = this.renderEditor.bind(this)
  }

  renderEditor(editor) {
    return (
      <React.Fragment>
        <div id="editor">
          <Toolbar>
            <Dropdown
              selected={THEMES_HASH[editor.state.theme] || DEFAULT_THEME}
              list={THEMES}
              onChange={editor.updateTheme}
            />
            <Dropdown
              selected={
                LANGUAGE_NAME_HASH[editor.state.language] ||
                LANGUAGE_MIME_HASH[editor.state.language] ||
                LANGUAGE_MODE_HASH[editor.state.language]
              }
              list={LANGUAGES}
              onChange={editor.updateLanguage}
            />
            <BackgroundSelect
              onChange={editor.updateBackground}
              mode={editor.state.backgroundMode}
              color={editor.state.backgroundColor}
              image={editor.state.backgroundImage}
              aspectRatio={editor.state.aspectRatio}
            />
            <Settings
              {...editor.state}
              onChange={editor.updateSetting}
              resetDefaultSettings={editor.resetDefaultSettings}
            />
            <div className="buttons">
              {this.props.tweet && (
                <Button
                  className="tweetButton"
                  onClick={editor.upload}
                  title={editor.state.uploading ? 'Loading...' : 'Tweet Image'}
                  color="#57b5f9"
                  style={{ marginRight: '8px' }}
                />
              )}
              <Dropdown {...saveButtonOptions} onChange={editor.save} />
            </div>
          </Toolbar>

          <ReadFileDropContainer readAs={readAs} onDrop={editor.onDrop}>
            {({ isOver, canDrop }) => (
              <Overlay
                isOver={isOver || canDrop}
                title={`Drop your file here to import ${isOver ? '✋' : '✊'}`}
              >
                <Carbon
                  config={editor.state}
                  updateCode={editor.updateCode}
                  onAspectRatioChange={editor.updateAspectRatio}
                  titleBar={editor.state.titleBar}
                  updateTitleBar={editor.updateTitleBar}
                >
                  {editor.state.code != null ? editor.state.code : DEFAULT_CODE}
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
      </React.Fragment>
    )
  }

  render() {
    return (
      <Provider inject={this.inject}>
        <Subscribe to={to}>{this.renderEditor}</Subscribe>
      </Provider>
    )
  }
}

function readAs(file) {
  if (isImage(file)) {
    return DATA_URL
  }
  return TEXT
}

export default DragDropContext(HTML5Backend)(Editor)
