import React from 'react'
import Popout from './Popout'
import Button from './Button'
import ColorPicker from './ColorPicker'
import { COLORS } from '../lib/constants'

function ModifierButton(props) {
  return (
    <Button
      flex={0}
      padding="0"
      center
      margin="0 8px 0 0"
      style={{ borderBottom: `1px solid ${props.selected ? 'white' : 'transparent'}` }}
      onClick={() => props.onChange(s => !s)}
    >
      {props.children}
    </Button>
  )
}

function SelectionEditor({ pos, onChange }) {
  const [open, setOpen] = React.useState(false)
  const [bold, setBold] = React.useState(false)
  const [italics, setItalics] = React.useState(false)
  const [underline, setUnderline] = React.useState(false)
  const [color, setColor] = React.useState(null)
  React.useEffect(() => {
    onChange({
      bold,
      italics,
      underline,
      color
    })
  }, [onChange, bold, color, italics, underline])
  return (
    <Popout
      hidden={false}
      pointerLeft="62px"
      style={{
        zIndex: 100,
        top: pos.top,
        left: pos.left
      }}
    >
      <div className="colorizer">
        <div className="modifier">
          <ModifierButton selected={bold} onChange={setBold}>
            <b>B</b>
          </ModifierButton>
          <ModifierButton selected={italics} onChange={setItalics}>
            <i>I</i>
          </ModifierButton>
          <ModifierButton selected={underline} onChange={setUnderline}>
            <u>U</u>
          </ModifierButton>
          <button className="color-square" onClick={() => setOpen(o => !o)} />
        </div>
        {open && (
          <div className="color-picker-container">
            <ColorPicker
              color={color || COLORS.PRIMARY}
              disableAlpha={true}
              onChange={d => setColor(d.hex)}
            />
          </div>
        )}
      </div>
      <style jsx>
        {`
          .modifier {
            padding: 0px 8px;
            display: flex;
          }
          .colorizer b {
            font-weight: bold;
          }
          .colorizer i {
            font-style: italic;
          }
          .colorizer :global(button) {
            min-width: 24px;
          }
          .color-square {
            cursor: pointer;
            appearance: none;
            outline: none;
            border: none;
            border-radius: 3px;
            padding: 12px;
            margin: 4px 0 4px auto;
            background: ${color || COLORS.PRIMARY};
            box-shadow: ${`inset 0px 0px 0px ${open ? 2 : 1}px ${COLORS.SECONDARY}`};
          }
          .color-picker-container {
            width: 218px;
            border-top: 2px solid ${COLORS.SECONDARY};
          }
        `}
      </style>
    </Popout>
  )
}

export default SelectionEditor
