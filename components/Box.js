import React from 'react'

const Box = props => {
  return (
    <div className="box">
      {props.children}
      <style jsx>
        {`
          .box {
            display: ${props.display};
            margin-top: ${props.marginTop};
            margin-bottom: ${props.marginBottom};
            ${props.justifyContent && `justify-content: ${props.justifyContent};`}
          }
        `}
      </style>
    </div>
  )
}

Box.defaultProps = {
  display: 'block',
  marginTop: 0,
  marginBottom: 0
}

export default Box
