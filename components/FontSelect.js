import React from 'react'
import ListSetting from './ListSetting'
import { FONTS } from '../lib/constants'
import { fileToDataURL as blobToUrl } from '../lib/util'

const EXTENSIONS = ['.otf', '.ttf', '.woff']

const Font = ({ id, name }) => (
  <span style={id === 'upload' ? { textAlign: 'center', width: '100%' } : { fontFamily: id }}>
    {name}
  </span>
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
    const url = await blobToUrl(files[0])

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
