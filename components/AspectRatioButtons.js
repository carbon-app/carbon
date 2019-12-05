import React from 'react'
import { DEFAULT_ASPECT_RATIO, ASPECT_RATIOS } from '../lib/constants'
import Button from './Button'
import Box from './Box'

const AspectRatioButton = props => {
  const { name, value, aspectRatio, onChange } = props
  const onClick = React.useCallback(() => {
    onChange(value)
  }, [onChange, value])

  const selectedAspectRatio = typeof value === 'undefined' ? DEFAULT_ASPECT_RATIO : value

  return (
    <Button
      border
      center
      className="button uppercase"
      flex="0 0 auto"
      margin="0 0.5rem"
      padding="0.5rem"
      width="3.5rem"
      background="transparent"
      selected={aspectRatio === selectedAspectRatio}
      onClick={onClick}
    >
      {name}
    </Button>
  )
}

const AspectRatioButtons = props => {
  return (
    <Box display="flex">
      {ASPECT_RATIOS.map(aspectRatio => (
        <AspectRatioButton key={aspectRatio.id} {...aspectRatio} {...props} />
      ))}
    </Box>
  )
}

export default AspectRatioButtons
