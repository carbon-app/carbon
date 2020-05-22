import React from 'react'
import { useKeyboardListener } from 'actionsack'
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
      onClick={props.onClick}
      color={props.color}
    >
      {props.children}
    </Button>
  )
}

function reducer(state, action) {
  switch (action.type) {
    case 'BOLD': {
      return {
        ...state,
        bold: !state.bold,
      }
    }
    case 'ITALICS': {
      return {
        ...state,
        italics: !state.italics,
      }
    }
    case 'UNDERLINE': {
      return {
        ...state,
        underline: Number(state.underline + 1) % 3,
      }
    }
    case 'COLOR': {
      return {
        ...state,
        color: action.color,
      }
    }
  }
  throw new Error('Invalid action')
}

function SelectionEditor({ onChange }) {
  const [open, setOpen] = React.useState(false)

  useKeyboardListener('Escape', () => setOpen(false))

  const [state, dispatch] = React.useReducer(reducer, {
    bold: null,
    italics: null,
    underline: null,
    color: null,
  })

  React.useEffect(() => {
    onChange(state)
  }, [onChange, state])

  return (
    <div style={{ position: 'relative' }}>
      <div className="colorizer">
        <div className="modifier">
          <ModifierButton selected={state.bold} onClick={() => dispatch({ type: 'BOLD' })}>
            <b>B</b>
          </ModifierButton>
          <ModifierButton selected={state.italics} onClick={() => dispatch({ type: 'ITALICS' })}>
            <i>I</i>
          </ModifierButton>
          <ModifierButton
            selected={state.underline}
            onClick={() => dispatch({ type: 'UNDERLINE' })}
            color={state.underline === 2 ? COLORS.RED : undefined}
          >
            <u>U</u>
          </ModifierButton>
          <button className="color-square" onClick={() => setOpen(o => !o)} />
        </div>
        <Popout hidden={!open} pointerLeft="16px" style={{ left: 82 }}>
          <div className="color-picker-container">
            <ColorPicker
              color={state.color || COLORS.PRIMARY}
              disableAlpha={true}
              onChange={d => dispatch({ type: 'COLOR', color: d.hex })}
            />
          </div>
        </Popout>
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
            min-width: 20px;
          }
          .color-square {
            cursor: pointer;
            appearance: none;
            outline: none;
            border: none;
            border-radius: 3px;
            padding: 12px;
            margin: 4px 0 4px auto;
            background: ${state.color || COLORS.PRIMARY};
            box-shadow: ${`inset 0px 0px 0px ${open ? 2 : 1}px ${COLORS.SECONDARY}`};
          }
          .color-picker-container {
            width: 218px;
            border-top: 2px solid ${COLORS.SECONDARY};
          }
        `}
      </style>
    </div>
  )
}

export default SelectionEditor
