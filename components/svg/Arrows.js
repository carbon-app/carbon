import React from 'react'

const Up = ({ color = 'white' }) => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5L5 1L9 5" stroke={color} />
  </svg>
)

const Down = ({ color = 'white' }) => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1L5 5L1 1" stroke={color} />
  </svg>
)

const Right = ({ color = 'white' }) => (
  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 9L5 5L1 1" stroke={color} />
  </svg>
)

export { Up, Down, Right }
