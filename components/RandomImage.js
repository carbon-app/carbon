import React from 'react'
import Spinner from 'react-spinner'
import { useAsyncCallback } from '@dawnlabs/tacklebox'

import api from '../lib/api'

import PhotoCredit from './PhotoCredit'
import { fileToDataURL } from '../lib/util'

export const downloadThumbnailImage = img => {
  return api.client
    .get(img.url.replace('http://', 'https://'), { responseType: 'blob' })
    .then(res => res.data)
    .then(fileToDataURL)
    .then(dataURL => Object.assign(img, { dataURL }))
}

const getImageDownloadUrl = img =>
  api.client.get(`/unsplash/download/${img.id}`).then(res => res.data.url)

async function getImages() {
  const imageUrls = await api.client.get('/unsplash/random')
  return Promise.all(imageUrls.data.map(downloadThumbnailImage))
}

function RandomImage(props) {
  const { current: cache } = React.useRef([])
  const [cacheIndex, updateIndex] = React.useState(0)

  const [selectImage, { loading: selecting }] = useAsyncCallback(() => {
    const image = cache[cacheIndex]

    return getImageDownloadUrl(image)
      .then(url => api.client.get(url, { responseType: 'blob' }))
      .then(res => res.data)
      .then(blob => props.onChange(blob, image))
  })

  const [updateCache, { loading: updating, data: imgs }] = useAsyncCallback(getImages)

  React.useEffect(() => {
    if (cacheIndex === 0 || cacheIndex > cache.length - 2) {
      updateCache()
    }
  }, [cacheIndex])

  React.useEffect(() => {
    if (imgs) {
      cache.push(...imgs)
    }
  }, [imgs])

  const loading = updating || selecting

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
