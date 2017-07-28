import React from 'react'
import domtoimage from 'dom-to-image'

import Button from './Button'
import api from '../lib/api'

// constants
const BUTTON_COLOR = '#c198fb'
const BUTTON_STYLE = { marginRight: '8px' }
const DEBOUNCE_DURATION = 10000

const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  DEBOUNCED: 'DEBOUNCED'
}

const textMap = {
  [STATUS.IDLE]: 'Copy Imgur Link',
  [STATUS.LOADING]: 'Uploading...',
  [STATUS.DEBOUNCED]: 'Copied to Clipboard'
}

class CopyButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: STATUS.IDLE
    }

    // bind methods
    this.handleIdleClick = this.handleIdleClick.bind(this)
    this.handleDebounceClick = this.handleDebounceClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  uploadImage () {
    return domtoimage.toBlob(document.getElementById('container'))
      .then(api.uploadImage)
      .then(res => res.data.id)
      .then(id => `http://i.imgur.com/${id}`)
  }

  handleIdleClick () {
    // set to loading
    this.setState({
      status: STATUS.LOADING
    })

    // upload code image and update state
    this.uploadImage()
      .then(link => {
        console.log('link')
        this.setState({
          status: STATUS.DEBOUNCED,
          link
        })

        setTimeout(() => {
          this.setState({
            status: STATUS.IDLE
          })
        }, DEBOUNCE_DURATION)
      })
  }

  handleDebounceClick () {
    // copy link to clipboard
  }

  handleClick () {
    console.log('called!')
    switch (this.state.status) {
      case STATUS.IDLE:
        this.handleIdleClick()
        break
      case STATUS.DEBOUNCED:
        this.handleDebounceClick()
    }
  }

  render () {
    return (
      <div >
        { this.state.link ? <input id="linkTarget" type="hidden" value="https://github.com/zenorocha/clipboard.js.git" /> : null }
        <Button onClick={this.handleClick} title={textMap[this.state.status]} color={BUTTON_COLOR} style={BUTTON_STYLE} />
      </div>
    )
  }
}

export default CopyButton
