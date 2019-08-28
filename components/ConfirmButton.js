import React from 'react'
import Button from './Button'

export default function ConfirmButton(props) {
  const [confirmed, setConfirmed] = React.useState(false)
  return (
    <Button
      {...props}
      onClick={e => {
        if (confirmed) {
          props.onClick(e)
          setConfirmed(false)
        } else {
          setConfirmed(true)
        }
      }}
      onBlur={() => setConfirmed(false)}
    >
      {confirmed ? 'Are you sure?' : props.children}
    </Button>
  )
}
