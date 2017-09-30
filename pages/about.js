import Page from '../components/Page'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { COLORS } from '../lib/constants'

export default () => (
  <Page>
    <div className="about">
      <div className="mb4">
        <h2>What does this do?</h2>
        <p>
          You know all of those code screenshots you see on Twitter? Although the code's usually
          impressive, we saw room for improvement in the aesthetic department. Carbon is the easiest
          way to create beautiful images of your source code. So what are you waiting for? Go
          impress all of your followers with your newfound design prowess. <span>🎨</span>
        </p>
      </div>
      <div className="mb4">
        <h2>How do I use it?</h2>
        <h4 className="mb0">Import</h4>
        <p className="mb1 mt2">There are a few different ways to import code into Carbon:</p>
        <ul className="mt0 mb3">
          <li>Drop a file into the editor</li>
          <li>
            Append a GitHub gist id to the url (<a
              className="link"
              href="/0db00e81d5416c339181e59481c74b59"
            >
              example
            </a>)
          </li>
          <li>Paste your code directly</li>
        </ul>
        <h4 className="mb0">Customization</h4>
        <p className="mt2 mb3">
          Once you've got all of your code into Carbon, you can customize your image by changing the
          syntax theme, background color, window theme, or padding.
        </p>
        <h4 className="mb0">Export/Sharing</h4>
        <p className="mt2">
          After you've customized your image you can Tweet a link to the image, or save it directly.
        </p>
      </div>
      <div>
        <h2>I want to make this better.</h2>
        <p>
          <a className="link" href="https://github.com/dawnlabs/carbon">
            Please do.
          </a>
        </p>
      </div>
    </div>
    <style jsx>{`
      p,
      li {
        color: ${COLORS.GRAY};
      }

      span {
        color: #fff;
      }

      ul {
        list-style-position: inside;
        list-style-type: circle;
      }

      .about {
        max-width: 632px;
      }
    `}</style>
  </Page>
)
