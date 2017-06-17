import React from 'react'
import Dropdown from './dropdown'
import ColorPicker from './colorpicker'

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
        <div className="settings"></div>
        <div className="toolbarbtn"><span>Copy Imgur Link</span></div>
        <style jsx>{`
          #toolbar {
            width: 100%;
            height: 40px; // TODO fix
            margin-bottom: 16px;
            display: flex;
            position: relative;
            z-index: 1;
          }
        `}</style>
      </div>
    )
  }
}
