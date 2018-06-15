import React from 'react'
import { fileToDataURL } from '../lib/util'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.selectImage = this.selectImage.bind(this)
  }

  selectImage(e) {
    const file = e.target ? e.target.files[0] : e

    return fileToDataURL(file).then(customWatermark => this.props.onChange(customWatermark))
  }

  render() {
    return (
      <div className={`toggle`}>
        <span>
          <input
            type="file"
            accept="image/x-png,image/jpeg,image/jpg,image/svg+xml"
            onChange={this.selectImage}
          />
          <span className="labelText"> Upload Custom Watermark </span>
        </span>

        <style jsx>
          {`
            .toggle {
              display: flex;
              align-items: center;
              justify-content: ${this.props.center ? 'center' : 'space-between'};
              cursor: pointer;
              user-select: none;
              padding: 8px;
            }

            input {
              width: 100%;
              margin-top: -10px;
              margin-left: -10px;
              padding: 35px 0 0 0;
              height: 15px;
              overflow: hidden;
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
              position: absolute;
              z-index: 10;
            }
          `}
        </style>
      </div>
    )
  }
}
