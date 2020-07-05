import React from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { validate } from 'email-validator'
import { useKeyboardListener } from 'actionsack'

import Input from './Input'
import Button from './Button'
import { COLORS } from '../lib/constants'

const Error = ({ message = 'something went wrong' }) => {
  if (
    message.indexOf &&
    message.indexOf('The domain portion of the email address is invalid') > -1
  ) {
    message = `Oh no, that's not a valid email!`
  }
  if (message.indexOf && message.indexOf('is already subscribed')) {
    message = message.split('<a')[0] // cut off 'Click to subscribe link'
  }
  return (
    <span>
      {message}
      <style jsx>{`
        span {
          position: absolute;
          bottom: 2.75rem;
          font-size: 12px;
          color: ${COLORS.RED};
          text-align: left;
        }
      `}</style>
    </span>
  )
}

const Form = ({ message, subscribe, error }) => {
  const [email, setEmail] = React.useState('')
  const [showError, setShowError] = React.useState(true)
  const disabled = !validate(email)
  return (
    <form
      className="subscribe-form"
      onSubmit={e => {
        e.preventDefault()
        subscribe({ EMAIL: email })
      }}
    >
      <Input
        type="email"
        name="email"
        placeholder="Email address"
        onChange={e => {
          setEmail(e.target.value)
          setShowError(false)
        }}
      />
      <Button hoverBackground={COLORS.BLACK} disabled={disabled}>
        <span>subscribe</span>
      </Button>
      {error && showError && <Error message={message} />}
      <style jsx>
        {`
          span {
            font-size: 14px;
          }
          form {
            display: flex;
          }
          :global(button) > span {
            color: ${disabled ? 'rgba(255, 255, 255, 0.5)' : '#fff'};
          }
          form > :global(input) {
            text-align: left;
            margin-right: 1rem;
            font-size: 14px;
          }
          form > :global(input:-webkit-autofill) {
            background-clip: content-box;
            -webkit-text-fill-color: #fff;
            -webkit-box-shadow: 0 0 0px 1000px ${COLORS.BLACK} inset;
          }
          form > :global(input:-webkit-autofill::selection) {
            -webkit-text-fill-color: #000;
            -webkit-box-shadow: 0 0 0px 1000px #fff inset;
          }
        `}
      </style>
    </form>
  )
}

const EmailSubscribe = () => {
  const [open, setOpen] = React.useState(false)

  useKeyboardListener('Escape', () => setOpen(false))

  if (!process.env.NEXT_PUBLIC_MAILCHIMP_URL) {
    return null
  }

  return (
    <div className="container link">
      <button
        onClick={e => {
          e.preventDefault()
          setOpen(true)
        }}
      >
        mailing list
      </button>
      {open && (
        <MailchimpSubscribe
          url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
          render={({ status, ...props }) => {
            const success = status === 'success'
            const loading = status === 'sending'
            const error = status === 'error'
            return (
              <div className="subscribe-container">
                {loading || success ? (
                  <span>{loading ? 'loading...' : 'subscribed!'}</span>
                ) : (
                  <Form {...props} error={error} />
                )}
              </div>
            )
          }}
        />
      )}
      <style jsx>
        {`
          button {
            padding: 0;
            border: none;
            color: white;
            background: none;
            font-size: 100%;
            cursor: pointer;
            visibility: ${open ? 'hidden' : 'visible'};
          }
          button:hover {
            color: ${COLORS.PRIMARY};
          }
          span {
            font-size: 14px;
          }
          .container {
            display: inline-block;
            position: relative;
            ${open ? 'background: none; margin-top: -2px;' : ''};
            margin-right: 1rem;
            padding-bottom: 2px;
          }
          .subscribe-container {
            position: absolute;
            top: -0.5rem;
            justify-content: space-between;
            border: 1px solid #fff;
            border-radius: 3px;
            padding: 0.5rem 1rem;
            width: 15rem;
            text-align: center;
            /* TODO remove these styles after fixing footer */
            background: ${COLORS.BLACK};
            z-index: 3;
          }
        `}
      </style>
    </div>
  )
}

export default EmailSubscribe
