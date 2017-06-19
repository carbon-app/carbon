import React from 'react'

import Button from './Button'

// constants
const BUTTON_COLOR = '#84ACFC'

const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  DEBOUNCED: 'DEBOUNCED'
}

const textMap = {
  [STATUS.IDLE]: 'Copy Imgur Link',
  [STATUS.LOADING]: 'Loading...',
  [STATUS.DEBOUNCED]: 'Coppied'
}

class CopyButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: STATUS.IDLE
    }
  }

  handleClick () {
    switch (this.state.status)
  }

  render () {
    return (
      <div>
        <Button onClick={() => {}} title={textMap[this.state.status]} bg={BUTTON_COLOR}/>
      </div>
    )
  }
}

export default CopyButton