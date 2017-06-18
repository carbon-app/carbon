import React from 'react'
import Dropdown from './dropdown'
import ColorPicker from './colorpicker'
import Settings from './settings'
import Button from './button'
import { THEMES, LANGUAGES } from '../lib/constants'

const Toolbar = (props) => (
  <div id="toolbar">
    <Dropdown list={THEMES} />
    <Dropdown list={LANGUAGES} />
    <ColorPicker
      onChange={props.onBGChange}
      bg={props.bg}
    />
    <Settings />
    <div className="buttons">
      <Button
        onClick={props.upload}
        title="Copy Imgur Link"
        bg="#84ACFC"
        style={{ borderRadius: '3px 0px 0px 3px' }}
      />
      <Button onClick={props.save} title="Save Image" bg="#C3E98D" />
    </div>
    <style jsx>{`
      #toolbar {
        width: 100%;
        height: 40px; // TODO fix
        margin-bottom: 16px;
        display: flex;
        position: relative;
        z-index: 1;
        font-size: 14px;
        color: #4F6875;
      }

      .buttons {
        display: flex;
        margin-left: auto;
      }
    `}</style>
  </div>
)

export default Toolbar
