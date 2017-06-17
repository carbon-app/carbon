import React from 'react'
import Dropdown from './dropdown'
import ColorPicker from './colorpicker'
import Settings from './settings'

const themes = [
  {
    name: 'dracula'
  },
  {
    name: 'solarized'
  }
]

const langauges = [
  {
    name: 'javascript'
  },
  {
    name: 'python'
  },
  {
    name: 'c'
  },
  {
    name: 'shitty ass java'
  }
]

export default class extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="toolbar">
        <Dropdown list={themes} />
        <Dropdown list={langauges} />
        <ColorPicker />
        <Settings />
        <div className="toolbar-btn copy"><span>Copy Imgur Link</span></div>
        <div className="toolbar-btn dl"><span>Save Image</span></div>
        <style jsx>{`
          #toolbar {
            width: 100%;
            height: 40px; // TODO fix
            margin-bottom: 16px;
            display: flex;
            position: relative;
            z-index: 1;
          }

          .toolbar-btn {
            height: 37px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 16px;
            color: #000;
            border: 0.5px solid #333;
            border-radius: 3px;
          }

          .copy {
            background: #84ACFC;
            border-radius: 3px 0px 0px 3px;
          }

          .dl {
            background: #C3E98D;
            border-radius: 0px 3px 3px 0px;
            border-left: 0px;
          }
        `}</style>
      </div>
    )
  }
}
