import React from 'react'
import Spinner from 'react-spinner'
import { useAsyncCallback } from '@dawnlabs/tacklebox'

import ApiContext from './ApiContext'
import PhotoCredit from './PhotoCredit'

function RandomImage(props) {
  const cacheRef = React.useRef([])
  const [cacheIndex, updateIndex] = React.useState(0)
  const api = React.useContext(ApiContext)

  const [selectImage, { loading: selecting }] = useAsyncCallback(() => {
    const image = cacheRef.current[cacheIndex]

    return api.unsplash.download(image.id).then(blob => props.onChange(blob, image))
  })

  const [updateCache, { loading: updating, error, data: imgs }] = useAsyncCallback(
    api.unsplash.random
  )

  const needsFetch = !error && !updating && (!imgs || cacheIndex > cacheRef.current.length - 2)

  React.useEffect(() => {
    if (needsFetch) {
      updateCache()
    }
  }, [needsFetch, updateCache])

  React.useEffect(() => {
    if (imgs) {
      cacheRef.current.push(...imgs)
    }
  }, [imgs])

  const loading = updating || selecting

  const cache = cacheRef.current
  const photographer = cache[cacheIndex] && cache[cacheIndex].photographer
  const bgImage = cache[cacheIndex] && cache[cacheIndex].dataURL
  return (
    <div className="random-image-container">
      <div className="controls">
        <span role="button" tabIndex={0} disabled={loading} onClick={selectImage}>
          Use Image
        </span>
        <span role="button" tabIndex={0} disabled={loading} onClick={() => updateIndex(i => i + 1)}>
          Try Another
        </span>
      </div>
      <div className="image">{loading && <Spinner />}</div>
      {photographer && <PhotoCredit photographer={photographer} />}
      <style jsx>
        {`
          .image {
            width: 100%;
            height: 140px;
            background: url(${bgImage});
            background-size: cover;
            background-repeat: no-repeat;
            margin-bottom: 4px;
          }

          .controls {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
          }

          span {
            opacity: ${loading ? 0.5 : 1};
            cursor: ${loading ? 'not-allowed' : 'pointer'};
            user-select: none;
          }
        `}
      </style>
    </div>
  )
}

export default RandomImage
