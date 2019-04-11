import React from 'react'

import Input from '../Input'
import Button from '../Button'
import ListSetting from '../ListSetting'
import Popout from '../Popout'
import ColorPicker from '../ColorPicker'
import { HIGHLIGHT_KEYS, COLORS } from '../../lib/constants'
import { capitalize, stringifyRGBA, generateId } from '../../lib/util'

const colorPickerStyle = {
  backgroundColor: COLORS.BLACK,
  padding: 0,
  margin: '4px'
}

const colorPresets = []

const HighlightPicker = ({ title, onChange, color }) => (
  <div className="color-picker-container">
    <div className="color-picker-header">
      <span>{title}</span>
    </div>
    <ColorPicker
      color={color}
      onChange={onChange}
      presets={colorPresets}
      style={colorPickerStyle}
    />
    <style jsx>
      {`
        .color-picker-container {
          width: 218px;
          border-left: 2px solid ${COLORS.SECONDARY};
          padding: 2px;
        }

        .color-picker-header {
          background-color: ${COLORS.BLACK};
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px 0;
        }
      `}
    </style>
  </div>
)

const getCustomName = themes =>
  `Custom Theme ${themes.filter(({ name }) => name.startsWith('Custom Theme')).length + 1}`

const ThemeCreate = ({ theme, themes, highlights, create, updateHighlights }) => {
  const [preset, updatePreset] = React.useState(theme.id)
  const [highlight, selectHighlight] = React.useState()
  const [name, updateName] = React.useState(getCustomName(themes))

  return (
    <Popout pointerLeft="15px" style={{ display: 'flex' }}>
      <div className="theme-settings">
        <div className="field name-field">
          <span>Name</span>
          <Input
            title="name"
            name="name"
            placeholder="Custom Theme"
            value={name}
            onChange={({ target: { value } }) => updateName(value)}
            maxLength="32"
          />
        </div>
        <div className="theme-select">
          <ListSetting
            title="Preset"
            items={themes}
            selected={preset}
            onOpen={() => selectHighlight(null)}
            onChange={id => {
              updatePreset(id)
              updateHighlights(themes.find(t => t.id === id).highlights)
            }}
          >
            {({ name }) => <span>{name}</span>}
          </ListSetting>
        </div>
        <div className="theme-colors">
          {HIGHLIGHT_KEYS.map(key => (
            <div className="field" key={key}>
              <Button
                padding="4px 4px 4px 8px"
                onClick={() => selectHighlight(key)}
                background={highlight === key ? COLORS.HOVER : COLORS.BLACK}
              >
                <div className="row">
                  <span>{capitalize(key)}</span>
                  <span
                    className="color-square"
                    style={{
                      backgroundColor: highlights[key],
                      boxShadow: `inset 0px 0px 0px ${highlight === key ? 2 : 1}px ${
                        COLORS.SECONDARY
                      }`
                    }}
                  />
                </div>
              </Button>
            </div>
          ))}
        </div>
        <Button
          center
          disabled={!name}
          className="create-button"
          padding="8px 0"
          background={COLORS.SECONDARY}
          hoverBackground={COLORS.SECONDARY}
          color={COLORS.BLACK}
          onClick={() =>
            create({
              id: `theme:${generateId()}`,
              name,
              highlights,
              custom: true
            })
          }
        >
          Create +
        </Button>
      </div>
      {highlight && (
        <HighlightPicker
          title={capitalize(highlight)}
          color={highlights[highlight]}
          onChange={({ rgb }) => updateHighlights({ [highlight]: stringifyRGBA(rgb) })}
        />
      )}
      <style jsx>
        {`
          .field {
            align-items: center;
            border-bottom: solid 1px ${COLORS.SECONDARY};
            display: flex;
            height: 35px;
            justify-content: space-between;
            position: relative;
          }

          .field:nth-last-child(-n + 2) {
            border-width: 2px;
          }

          .row {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: space-between;
          }

          .name-field {
            padding: 8px;
          }

          .theme-select {
            width: 100%;
          }

          .theme-settings {
            display: flex;
            flex-direction: column;
            width: 224px;
          }

          .theme-colors {
            display: flex;
            flex-wrap: wrap;
            border-top: 2px solid ${COLORS.SECONDARY};
            text-transform: capitalize;
          }

          .theme-colors .field {
            width: 50%;
          }

          .theme-colors .field:nth-child(odd) {
            border-right: 1px solid ${COLORS.SECONDARY};
          }

          .color-square {
            border-radius: 3px;
            padding: 12px;
          }
        `}
      </style>
    </Popout>
  )
}

export default ThemeCreate
