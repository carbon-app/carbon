import React from 'react'
import { useAsyncCallback } from 'actionsack'

import Button from './Button'
import Input from './Input'
import { useAuth } from './AuthContext'
import LoginButton from './LoginButton'

import { COLORS } from '../lib/constants'

const X = (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
    <path
      className="base"
      fill="white"
      d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
    />
    <path
      className="glyph"
      fill={COLORS.BLACK}
      d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
    />
  </svg>
)

export default function Billing() {
  const user = useAuth()

  const [submit, { error, loading }] = useAsyncCallback(() => true)
  const success = true

  if (!user) {
    return (
      <div className="login">
        <div>
          <LoginButton />
        </div>
        <style jsx>
          {`
            .login {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </div>
    )
  }

  return (
    <div className="checkout">
      {success ? (
        <div className="column">
          <h4>Thank you for supporting Carbon!</h4>
          <p className="success">
            However, Carbon Diamond is not quite ready yet.
            <br />
            {/* Your card has <u>not</u> been charged or saved today. */}
            <br />
            We greatly appreciate your support, and will let you know when premium features launch!
          </p>
          <p className="success">
            — the Carbon Team{' '}
            <span role="img" aria-label="Black and yellow hearts">
              💛🖤
            </span>
          </p>
        </div>
      ) : (
        <div className="column">
          <h4>
            Upgrade to <span>Diamond</span>
            <br />
            <span className="tag">($5.00 / month)</span>
          </h4>
          <p>Please enter a credit or debit card:</p>
          <form onSubmit={submit}>
            <fieldset>
              {/** Insert Stripe element here */}
              <hr />
              <Input placeholder="Cardholders's name…" name="name" required />
            </fieldset>
            <small>
              (By clicking subscribe, you are accepting the{' '}
              <a href="/terms">terms and conditions</a>)
            </small>
            <br />
            <Button
              display="inline-flex"
              border
              large
              padding="8px 16px"
              margin="8px 0 0"
              type="submit"
              color="rgba(255, 255, 255, 0.7)"
            >
              {loading ? 'Sending…' : 'Subscribe'}
            </Button>
            <div className={`error ${error ? 'visible' : ''}`} role="alert">
              {X}
              <span className="message">{error}</span>
            </div>
          </form>
        </div>
      )}
      <style jsx>
        {`
          .checkout {
            position: relative;

            font-size: 16px;
            font-weight: 500;
            border-radius: 4px;
            padding: 1rem 1.5rem;

            color: white;
            background-color: black;
          }

          a {
            text-decoration: underline;
          }

          p {
            margin: 0 0 8px;
            font-size: 12px;
            font-weight: normal;
          }

          small {
            font-size: 10px;
          }

          h4 {
            font-size: 32px;
            margin: 0 0 2rem;
          }

          .tag {
            display: block;
            font-weight: lighter;
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            margin-top: 0.25rem;
          }

          hr {
            border: 0;
            height: 1px;
            margin: 0.5rem 0 1rem;
            background: ${COLORS.SECONDARY};
          }

          fieldset {
            width: 100%;
            margin: 0 0 2.5rem;
            padding: 0.5rem 0.5rem 0.75rem;
            border: 1px solid ${COLORS.SECONDARY};
            border-radius: 4px;
          }

          fieldset :global(input) {
            text-align: left;
            font-size: 16px;
            color: ${COLORS.BLUE};
          }

          fieldset :global(input::placeholder) {
            opacity: 1;
            color: rgba(255, 255, 255, 0.7);
          }

          fieldset :global(.StripeElement) {
            width: 100%;
            padding: 12px 16px 12px 0;
          }

          form:valid :global(button) {
            color: ${COLORS.BLUE};
            box-shadow: inset 0px 0px 0px 1px ${COLORS.BLUE};
          }

          .error {
            display: inline-flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            top: +3px;
            opacity: 0;
            margin-left: 1rem;
            font-size: 12px;
            transform: translateY(20px);
            transition-property: opacity, transform;
            transition-duration: 0.35s;
            transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          .error.visible {
            opacity: 1;
            transform: none;
          }

          .error svg {
            margin-top: -1px;
          }

          .error .message {
            margin-left: 8px;
            font-size: inherit;
            color: ${COLORS.RED};
          }

          .success {
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 2rem;
          }
        `}
      </style>
    </div>
  )
}
