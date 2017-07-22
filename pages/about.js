import Page from '../components/Page'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'


export default () => (
  <Page>
    <div className="about">
      <div className="mb4">
        <h2>What does this do?</h2>
        <p>You know all of those code screenshots you see on Twitter? Although the code's usually impressive, we think there's room for improvement in the aesthetic department. Carbon is the easiest way to create beautiful images of your source code.  Now you can impress all of your followers with your newfound design prowess. 🎨</p>
      </div>
      <div className="mb4">
        <h2>How do I use it?</h2>
        <h4 className="mb0">Import</h4>
        <p className="mt2 mb1">There are a few different ways to import code into Carbon:</p>
        <ul className="mt0">
          <li>Drag a file into the editor</li>
          <li>Append a GitHub Gist id to the url</li>
          <li>Paste your code directly</li>
        </ul>
        <h4>Customization</h4>
        <p>Once you've got all of your code into Carbon, you can customize your image by changing the syntax theme, background color, window theme, or padding.</p>
        <h4>Export/Sharing</h4>
        <p>After you've customized your image, you can copy a link to the image, save it, or share it on Twitter.</p>
      </div>
      <div className="mb4">
        <h2>I want to make this better.</h2>
        <p>Please do.</p>
      </div>
    </div>
    <style jsx>{`
      p, li {
        color: #777;
      }

      ul {
        list-style-position: inside;
      }

      .about {
        max-width: 632px;
      }
    `}</style>
  </Page>
)
