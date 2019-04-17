import React from 'react'
import ListSetting from './ListSetting'
import { COLORS, FONTS } from '../lib/constants'
import { fileToDataURL } from '../lib/util'

const EXTENSIONS = ['.otf', '.ttf', '.woff']

const Font = ({ id, name, link }, selected) => (
  <React.Fragment>
    <span style={id === 'upload' ? { textAlign: 'center', width: '100%' } : { fontFamily: id }}>
      {name}
    </span>
    {link && selected === id && (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <span style={id === 'upload' ? { textAlign: 'center', width: '100%' } : { fontFamily: id }}>
          Purchase
        </span>
      </a>
    )}
    <style jsx>
      {`
        /* Prod Only */
        a {
          display: block;
          color: ${COLORS.BLACK};
          background: ${COLORS.PRIMARY};
          border-radius: 2px;
          padding: 2px 3px;
          font-weight: bold;
        }
      `}
    </style>
  </React.Fragment>
)

function FontSelect(props) {
  const inputEl = React.useRef(null)

  function onChange(id) {
    if (id === 'upload') {
      inputEl.current.click()
    } else {
      props.onChange(id)
    }
  }

  async function onFiles(e) {
    const { files } = e.target

    const name = files[0].name.split('.')[0]
    const url = await fileToDataURL(files[0])

    props.onUpload(name, url)
  }

  return (
    <div>
      <ListSetting
        title="Font"
        items={[{ id: 'upload', name: 'Upload +' }, ...FONTS]}
        {...props}
        onChange={onChange}
      >
        {Font}
      </ListSetting>
      <input
        hidden
        ref={inputEl}
        type="file"
        multiple
        accept={EXTENSIONS.join(',')}
        onChange={onFiles}
      />
    </div>
  )
}

export default FontSelect
