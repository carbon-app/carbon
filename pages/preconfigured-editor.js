// Theirs
import React from 'react'
import domtoimage from 'dom-to-image'

// Ours
import Page from '../components/Page'
import Carbon from '../components/Carbon'

import { THEMES, DEFAULT_LANGUAGE, COLORS, DEFAULT_CODE } from '../lib/constants'

import api from '../lib/api'
import { queryToProps, defaults } from '../lib/util'

class ConfigurableEditor extends React.Component {
  /* pathname, asPath, err, req, res */
  static async getInitialProps({ req }) {
    const { query } = req
    const props = queryToProps(query)

    try {
      if (query.gist) {
        const content = await api.getGist(query.gist)
        return Object.assign({ content }, props)
      }
    } catch (e) {
      console.log(e)
    }

    return props
  }

  constructor(props) {
    super(props)

    this.state = {
      background: defaults(props.background, '#ABB8C3'),
      theme: defaults(props.theme, THEMES.seti.id),
      language: defaults(props.language, DEFAULT_LANGUAGE),
      dropShadow: defaults(props.dropShadow, true),
      windowControls: defaults(props.windowControls, true),
      paddingVertical: defaults(props.paddingVertical, '48px'),
      paddingHorizontal: defaults(props.paddingHorizontal, '32px'),
      uploading: false,
      code: props.content
    }

    this.save = this.save.bind(this)
    this.updateCode = this.updateCode.bind(this)
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.SET_CODE = code => this.updateCode(code)
      window.GET_IMAGE = () => this.getCarbonImage()
    }
  }

  getCarbonImage() {
    const node = document.getElementById('section')

    const config = {
      style: {
        transform: 'scale(2)',
        'transform-origin': 'center'
      },
      width: node.offsetWidth * 2,
      height: node.offsetHeight * 2
    }

    return domtoimage.toPng(node, config)
  }

  updateCode(code) {
    this.setState({ code })
  }

  save() {
    this.getCarbonImage().then(dataUrl => {
      const link = document.createElement('a')
      link.download = 'carbon.png'
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      link.remove()
    })
  }

  render() {
    return (
      <Page>
        <div id="editor">
          <Carbon config={this.state} updateCode={this.updateCode}>
            {this.state.code || DEFAULT_CODE}
          </Carbon>
        </div>
        <style jsx>
          {`
            #editor {
              background: ${COLORS.BLACK};
              border: 3px solid ${COLORS.SECONDARY};
              border-radius: 8px;
              padding: 16px;
            }

            .buttons {
              display: flex;
              margin-left: auto;
            }
          `}
        </style>
      </Page>
    )
  }
}

export default ConfigurableEditor
