import React from 'react'
import Page from '../components/Page'

function Contributors() {
  const [contributors, setContributors] = React.useState([])

  React.useEffect(() => {
    fetch('https://api.github.com/repos/carbon-app/carbon/contributors?per_page=100')
      .then(response => response.json())
      .then(contributors =>
        setContributors(contributors.filter(contributor => !contributor.login.endsWith('[bot]')))
      )
  }, [])

  return (
    <div>
      {contributors.map(contributor => (
        <a key={contributor.id} href={contributor.html_url} target="_blank" rel="noreferrer">
          <img alt={contributor.login} className="contributor" src={contributor.avatar_url} />
        </a>
      ))}
      <style jsx>
        {`
          .contributor {
            border-radius: 50%;
            border: 2px solid white;
            width: 32px;
            height: 32px;
            margin-right: 12px;
            transition: all 300ms ease;
            margin-bottom: 8px;
          }

          .contributor:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </div>
  )
}

export default function About() {
  return (
    <Page>
      <div className="about">
        <div className="mb4">
          <h2>What does this do?</h2>
          <p>Carbon lets you create and share beautiful images of your source code</p>
          <p>
            You know all of those code screenshots you see on Twitter? Although the code&apos;s
            usually impressive, we thought there was room for improvement in the aesthetic
            department. So what are you waiting for? Go try it out and impress all your developer
            and designer friends.{' '}
            <span role="img" aria-label="Palette">
              🎨
            </span>
          </p>
        </div>
        <div className="mb4">
          <h2>Who uses it?</h2>
          <p>
            Carbon is used by thousands of developers daily, including experts at:
            <img
              className="mt2"
              width="508px"
              src="/static/svg/open-source-companies-2.svg"
              alt="Companies that trust Carbon: Google, Airbnb, GitHub, Coinbase, and Microsoft"
            />
          </p>
        </div>
        <div className="mb4">
          <h2>How do I use it?</h2>
          <h4 className="mb0 mt3">Import</h4>
          <p className="mb1 mt2">There are a few different ways to import code into Carbon:</p>
          <ul className="mt0 mb3">
            <li>Drop a file into the editor</li>
            <li>
              Append a GitHub gist id to the url (
              <a className="link" href="/0db00e81d5416c339181e59481c74b59">
                example
              </a>
              )
            </li>
            <li>Paste your code directly</li>
          </ul>
          <h4 className="mb0 mt4">Customization</h4>
          <p className="mt2 mb3">
            Once you&apos;ve got all of your code into Carbon, you can customize your image by
            changing the syntax theme, background color/image, window theme, or padding.
          </p>
          <p className="mt2 mb3">
            You can even drop an image file onto the editor to set the background to that image.
            Give it a try!
          </p>
          <h4 className="mb0 mt4">Export/Sharing</h4>
          <p className="mt2 mb3">
            After you&apos;ve customized your image you can Tweet a link to the image, or save it
            directly.
          </p>
          <p className="mt2 mb3">
            If you use the &apos;Tweet&apos; button, Carbon will automatically make your image
            accessible. However, if you want to manually tweet your Carbon image, please check out (
            <a
              className="link"
              href="https://help.twitter.com/en/using-twitter/picture-descriptions"
            >
              how to make your Twitter images accessible
            </a>
            ).
          </p>
          <p className="mt2 mb3">
            If you include a Carbon image in a post, the source code will be invisible to assistive
            technology — it will not be possible to enlarge or copy it, etc. Please, think about
            adding another element with the source code as text, like (
            <a
              className="link"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details"
            >
              an HTML Details Element
            </a>
            ) below the image.
          </p>
          <h4 className="mb0 mt4" id="shortcuts">
            Keyboard Shortcuts
          </h4>
          <table className="mt2 mb3">
            <tbody>
              <tr>
                <td>Open settings menu</td>
                <td>
                  <kbd>⌘ /</kbd>
                </td>
              </tr>
              <tr>
                <td>Export as PNG</td>
                <td>
                  <kbd>⇧ ⌘ E</kbd>
                </td>
              </tr>
              <tr>
                <td>Export as SVG</td>
                <td>
                  <kbd>⇧ ⌘ S</kbd>
                </td>
              </tr>
              <tr>
                <td>Copy image to clipboard</td>
                <td>
                  <kbd>⇧ ⌘ C</kbd>
                </td>
              </tr>
              <tr>
                <td>Reset settings</td>
                <td>
                  <kbd>⇧ ⌘ \</kbd>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>I want to make this better.</h2>
          <p>
            <a className="link" href="https://github.com/carbon-app/carbon#contribute--support">
              Contributors welcome!
            </a>
          </p>
          <br />
          <Contributors />
        </div>
      </div>
      <style jsx>
        {`
          .about {
            font-size: 16px;
            max-width: 632px;
            margin: 0 auto var(--x4);
          }

          @media (max-width: 768px) {
            .about {
              max-width: 90vw;
            }
          }

          img {
            max-width: 100%;
          }

          h2 {
            font-weight: bold;
            font-size: 32px;
          }
          h4 {
            font-weight: bold;
          }

          p,
          li {
            color: #fff;
          }

          ul {
            list-style-position: inside;
            list-style-type: circle;
          }

          span {
            color: #fff;
          }

          td {
            padding: 0.25rem 0;
          }

          kbd {
            margin-left: var(--x3);
            letter-spacing: 0.1em;
          }
        `}
      </style>
    </Page>
  )
}
