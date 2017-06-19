import React from 'react'

// constants
const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  DEBOUNCED: 'DEBOUNCED'
}

class CopyButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: STATUS.IDLE
    }
  }
}