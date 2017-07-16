import React from 'react'
import Dropdown from './Dropdown'
import ColorPicker from './ColorPicker'
import Settings from './Settings'
import Button from './Button'
import CopyButton from './CopyButton'
import { THEMES, LANGUAGES } from '../lib/constants'

const Toolbar = (props) => (
  <div id="toolbar">
    <Dropdown list={THEMES} onChange={props.onThemeChange}/>
    <Dropdown list={LANGUAGES} onChange={props.onLanguageChange}/>
    <ColorPicker
      onChange={props.onBGChange}
      bg={props.bg}
    />
    <Settings onChange={props.onSettingsChange} enabled={props.enabled} />
    <div className="buttons">
      <CopyButton />
      <Button onClick={props.save} title="Save Image" color="#84ACFC" />
    </div>
    <style jsx>{`
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

      .buttons {
        display: flex;
        margin-left: auto;
      }
    `}</style>
  </div>
)

export default Toolbar
