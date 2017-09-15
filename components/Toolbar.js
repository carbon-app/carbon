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
      <Button className="tweetButton" onClick={props.upload} title={props.uploading ? 'loading...' : 'Tweet Image'} color="#0084b4" style={{ marginRight: '8px' }} />
      <Button onClick={props.save} title="Save Image" color="#57b5f9" />
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
    `}</style>
  </div>
)

export default Toolbar
