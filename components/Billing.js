import React from 'react'
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements'

import Button from './Button'
import Input from './Input'
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
      fill="var(--dark)"
      d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
    />
  </svg>
)

function Billing(props) {
  const [error, setError] = React.useState(null)

  const submit = async e => {
    e.preventDefault()
    setError(null)

    const res = await props.stripe.createToken({ name: props.name })

    console.error(res)
    if (res.error) {
      return setError(res.error.message)
    }

    // const response = await fetch('/api/charge', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'text/plain' },
    //   body: res.token.id
    // })

    // if (response.ok) {
    //   props.onSubmit()
    // }
  }
  return (
    <div>
      <div className="checkout">
        <div className="column">
          <h4>
            Upgrade to <span>Diamond</span>
          </h4>
          <p>Please enter a credit or debit card:</p>
          <form onSubmit={submit}>
            <fieldset>
              <CardElement
                {...{
                  iconStyle: 'solid',
                  style: {
                    base: {
                      iconColor: '#57b5f9',
                      color: '#fff',
                      fontWeight: 500,
                      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                      fontSize: '16px',
                      fontSmoothing: 'antialiased',

                      ':-webkit-autofill': {
                        color: '#fce883'
                      },
                      '::placeholder': {
                        color: '#87BBFD'
                      }
                    },
                    invalid: {
                      iconColor: COLORS.RED,
                      color: COLORS.RED
                    }
                  }
                }}
              />
              <hr />
              <Input placeholder="Cardholders's name..." required />
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
            >
              {props.loading ? 'Sending...' : 'Subscribe'}
            </Button>
            <div className={`error ${error ? 'visible' : ''}`} role="alert">
              {X}
              <span className="message">{error}</span>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
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
        }

        small {
          font-size: 10px;
        }

        h4 {
          font-size: 32px;
          margin: 0 0 2rem;
        }

        hr {
          border: 0;
          height: 1px;
          margin: 0.5rem 0 1rem;
          background: white;
        }

        fieldset {
          width: 100%;
          margin: 0 0 2rem;
          padding: 0.5rem 0.5rem 0.75rem;
          border: 1px solid white;
          border-radius: 4px;
        }

        fieldset :global(input) {
          text-align: left;
          font-size: 16px;
        }

        fieldset :global(.StripeElement) {
          width: 100%;
          padding: 12px 16px 12px 0;
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
      `}</style>
    </div>
  )
}

const BillingWithStripe = injectStripe(Billing)

export default function() {
  const [stripe, setStripe] = React.useState(null)
  React.useEffect(() => {
    setStripe(window.Stripe(process.env.STRIPE_PUBLIC_KEY))
  }, [])
  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <BillingWithStripe />
      </Elements>
    </StripeProvider>
  )
}
