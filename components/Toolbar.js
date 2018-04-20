import React from 'react'
import { Provider, Subscribe } from 'unstated'

import EditorContainer from '../containers/Editor'
import Button from './Button'
import Dropdown from './Dropdown'
import BackgroundSelect from './BackgroundSelect'
import Settings from './Settings'
import {
  THEMES,
  THEMES_HASH,
  LANGUAGES,
  LANGUAGE_MIME_HASH,
  LANGUAGE_MODE_HASH,
  LANGUAGE_NAME_HASH,
  DEFAULT_THEME
} from '../lib/constants'

const to = [EditorContainer]
const saveButtonOptions = {
  button: true,
  color: '#c198fb',
  selected: { id: 'SAVE_IMAGE', name: 'Save Image' },
  list: ['png', 'svg'].map(id => ({ id, name: id.toUpperCase() }))
}

function Toolbar() {
  return <Subscribe to={to}>{render}</Subscribe>
}

function render(editor) {
  return (
    <div id="toolbar">
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
        {/* TODO don't set container function if no prop */}
        {editor.upload && (
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
      <style jsx>
        {`
          #toolbar {
            width: 100%;
            height: 40px; // TODO fix
            margin-bottom: 16px;
            display: flex;
            position: relative;
            z-index: 3;
            font-size: 14px;
            color: #fff;
          }

          #toolbar > :global(div) {
            margin-right: 8px;
          }

          #toolbar > :global(div):last-child {
            margin-right: 0px;
          }

          .buttons {
            display: flex;
            margin-left: auto;
          }
        `}
      </style>
    </div>
  )
}

export default Toolbar
