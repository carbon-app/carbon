import React from 'react'
import Spinner from './Spinner'

export default function SpinnerWrapper(props) {
  if (!props.loading) {
    return (
      <div>
        <Spinner />
        <style jsx>
          {`
            div {
              width: 876px;
              height: 240px;
            }
          `}
        </style>
      </div>
    )
  }

  return props.children
}
