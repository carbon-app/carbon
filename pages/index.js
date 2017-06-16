import React from 'react'
import Axios from 'axios'

import CodeImage from '../components/codeImage'
import api from '../api'

const code = `
const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}`

export default (props) => {
  return (
    <div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}
      </style>
      <h1> Welcome to Code Image</h1>
      <CodeImage>
        {code}
      </CodeImage>
    </div>
  )
}
