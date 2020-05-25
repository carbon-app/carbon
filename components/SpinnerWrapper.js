import React from 'react'

export function Spinner({ size = 24 }) {
  return (
    <div className="bounce">
      <div className="bounce-dot"></div>
      <div className="bounce-dot"></div>
      <style jsx>
        {`
          .bounce {
            width: ${size}px;
            height: ${size}px;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .bounce-dot {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;
            animation: bounce 2s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);
          }

          .bounce-dot:nth-child(2) {
            animation-delay: -1s;
          }

          @keyframes bounce {
            0%,
            100% {
              transform: scale(0);
            }
            45%,
            55% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  )
}

export default function SpinnerWrapper(props) {
  if (props.loading) {
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
