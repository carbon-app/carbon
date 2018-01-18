import React from 'react'

export default class extends React.Component {
  constructor() {
    super()
    this.state = { imageUrl: '' }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = e => this.setState({ imageUrl: e.target.result })
    reader.readAsDataURL(file)
  }

  render() {
    let content = (
      <div className="upload-image-button">
        <span>Click here to upload a background image</span>
        <input type="file" accept="image/x-png,image/jpeg,image/jpg" onChange={this.onChange} />
      </div>
    )

    if (this.state.imageUrl) {
      content = <img src={this.state.imageUrl} />
    }

    return (
      <div>
        <div className="image-picker-container">{content}</div>
        <style jsx>{`
          .image-picker-container {
            padding: 8px;
          }

          .upload-image-button {
            /* user-select: none;
            cursor: pointer; */
          }
        `}</style>
      </div>
    )
  }
}
