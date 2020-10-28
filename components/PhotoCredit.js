import React from 'react'

export default function PhotoCredit({ photographer }) {
  return (
    <div className="photo-credit">
      Photo by{' '}
      <a href={`${photographer.profile_url}?utm_source=carbon&utm_medium=referral`}>
        {photographer.name}
      </a>
      <style jsx>
        {`
          .photo-credit {
            cursor: unset;
            user-select: none;
            text-align: left;
            font-size: 10px;
            color: #aaa;
            margin-bottom: -2px;
          }

          .photo-credit a {
            cursor: pointer;
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  )
}
