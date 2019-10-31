import React from 'react'
import { useKeyboardListener } from 'actionsack'
import Popout from './Popout'
import Button from './Button'
import ColorPicker from './ColorPicker'
import ThemeIcon from './svg/Theme'
import { COLORS } from '../lib/constants'

const styleEditorButtonStyle = { width: 32, maxWidth: 32, height: 32, borderRadius: '50%' }

function ModifierButton(props) {
  return (
    <Button
      flex={0}
      padding="0"
      center
      margin="0 8px 0 0"
      style={{ borderBottom: `1px solid ${props.selected ? 'white' : 'transparent'}` }}
      onClick={props.onClick}
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
        bold: !state.bold
      }
    }
    case 'ITALICS': {
      return {
        ...state,
        italics: !state.italics
      }
    }
    case 'UNDERLINE': {
      return {
        ...state,
        underline: !state.underline
      }
    }
    case 'COLOR': {
      return {
        ...state,
        color: action.color
      }
    }
  }
  throw new Error('Invalid action')
}

function SelectionEditor({ onChange, onClose }) {
  useKeyboardListener('Escape', onClose)
  const [visible, setVisible] = React.useState(false)
  const [open, setOpen] = React.useState(true)

  const [state, dispatch] = React.useReducer(reducer, {
    bold: false,
    italics: false,
    underline: false,
    color: null
  })

  React.useEffect(() => {
    onChange(state)
  }, [onChange, state])

  return (
    <div style={{ position: 'relative' }}>
      <Button
        title="Style Menu"
        border
        center
        selected={visible}
        style={styleEditorButtonStyle}
        margin="4px 0 0"
        onClick={() => setVisible(v => !v)}
      >
        <ThemeIcon />
      </Button>
      <Popout hidden={!visible} pointerLeft="9px">
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
            >
              <u>U</u>
            </ModifierButton>
            <button className="color-square" onClick={() => setOpen(o => !o)} />
          </div>
          {open && (
            <div className="color-picker-container">
              <ColorPicker
                color={state.color || COLORS.PRIMARY}
                disableAlpha={true}
                onChange={d => dispatch({ type: 'COLOR', color: d.hex })}
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
              background: ${state.color || COLORS.PRIMARY};
              box-shadow: ${`inset 0px 0px 0px ${open ? 2 : 1}px ${COLORS.SECONDARY}`};
            }
            .color-picker-container {
              width: 218px;
              border-top: 2px solid ${COLORS.SECONDARY};
            }
          `}
        </style>
      </Popout>
    </div>
  )
}

export default SelectionEditor
