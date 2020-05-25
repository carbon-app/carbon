import React from 'react'
import { useAsyncCallback } from 'actionsack'

import { Spinner } from './SpinnerWrapper'
import { useAPI } from './ApiContext'
import PhotoCredit from './PhotoCredit'

function RandomImage(props) {
  const cacheRef = React.useRef([])
  const [cacheIndex, updateIndex] = React.useState(0)
  const api = useAPI()

  const [selectImage, { loading: selecting }] = useAsyncCallback(() => {
    const image = cacheRef.current[cacheIndex]

    return api.unsplash.download(image.id).then(data => props.onChange({ ...image, ...data }))
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
        <button disabled={loading} onClick={selectImage}>
          Use Image
        </button>
        <button disabled={loading} onClick={() => updateIndex(i => i + 1)}>
          Try Another
        </button>
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

          button {
            opacity: ${loading ? 0.5 : 1};
            cursor: ${loading ? 'not-allowed' : 'pointer'};
            user-select: none;
            appearance: none;
            border: none;
            background: none;
            color: inherit;
            font-size: inherit;
            padding: 0;
          }

          button:focus {
            outline: none;
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  )
}

export default RandomImage
