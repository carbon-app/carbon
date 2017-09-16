import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import domtoimage from 'dom-to-image'

import Page from '../components/Page'
import ReadFileDropContainer from '../components/ReadFileDropContainer'
import Toolbar from '../components/Toolbar'
import Overlay from '../components/Overlay'
import Carbon from '../components/Carbon'
import api from '../lib/api'
import { THEMES, LANGUAGES, COLORS, DEFAULT_CODE } from '../lib/constants'

class Editor extends React.Component {
  /* pathname, asPath, err, req, res */
  static async getInitialProps ({ asPath }) {
    try {
      if (asPath !== '/') {
        const content = await api.getGist(asPath)
        return { content }
      }
    } catch (e) {
      console.log(e)
    }
    return {}
  }

  constructor()  {
    super()
    this.state = {
      background: '#ABB8C3',
      theme: THEMES[0].id,
      language: 'javascript', // TODO LANGUAGES[0]
      dropShadow: true,
      windowControls: true,
      paddingVertical: '48px',
      paddingHorizontal: '32px',
      uploading: false
    }

    this.save = this.save.bind(this)
    this.upload = this.upload.bind(this)
  }

  getCarbonImage () {
    const node = document.getElementById('section')

    const config = {
      style: {
        transform: 'scale(2)',
        'transform-origin': 'center'
      },
      width: node.offsetWidth * 2,
      height: node.offsetHeight * 2
    }

    return  domtoimage.toPng(node, config)
  }

  save () {
    this.getCarbonImage()
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = 'snippet.png'
      link.href = dataUrl
      link.click()
    })
  }

  upload () {
    this.setState({ uploading: true })
    this.getCarbonImage()
    .then(api.tweet)
    .then(() => this.setState({ uploading: false }))
    .catch((err) => {
      console.error(err)
      this.setState({ uploading: false })
    })
  }

  render () {
    return (
        <Page enableHeroText>
          <div id="editor">
            <Toolbar
              save={this.save}
              upload={this.upload}
              uploading={this.state.uploading}
              onBGChange={color => this.setState({ background: color })}
              onThemeChange={theme => this.setState({ theme: theme.id })}
              onLanguageChange={language => this.setState({ language: language.module })}
              onSettingsChange={(key, value) => this.setState({ [key]: value })}
              bg={this.state.background}
              enabled={this.state}
            />
            <ReadFileDropContainer
              onDrop={droppedContent => this.setState({ droppedContent })}
            >
              <Overlay>
                <Carbon config={this.state}>
                  {this.state.droppedContent || this.props.content || DEFAULT_CODE}
                </Carbon>
              </Overlay>
            </ReadFileDropContainer>
          </div>

          <style jsx>{`
            #editor {
              background: ${COLORS.BLACK};
              border: 3px solid ${COLORS.SECONDARY};
              border-radius: 8px;
              padding: 16px;
            }
          `}
          </style>
        </Page>
    )
  }
}

export default DragDropContext(HTML5Backend)(Editor)
