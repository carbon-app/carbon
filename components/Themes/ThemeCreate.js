import React from 'react'

import Input from '../Input'
import Button from '../Button'
import ListSetting from '../ListSetting'
import Popout from '../Popout'
import ColorPicker from '../ColorPicker'
import { HIGHLIGHT_KEYS, COLORS } from '../../lib/constants'
import { stringifyColor, generateId } from '../../lib/util'

const colorPickerStyle = {
  backgroundColor: COLORS.BLACK,
  padding: 0,
  margin: '4px',
}

const colorPresets = []

const HighlightPicker = ({ title, onChange, color }) => (
  <div className="color-picker-container">
    <div className="color-picker-header">
      <span className="capitalize">{title}</span>
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

const ThemeCreate = ({
  theme,
  themes,
  highlights,
  create,
  updateHighlights,
  name,
  onInputChange,
}) => {
  const [preset, updatePreset] = React.useState(theme.id)
  const [highlight, selectHighlight] = React.useState()

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
            onChange={onInputChange}
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
        <div className="theme-colors capitalize">
          {HIGHLIGHT_KEYS.map(key => (
            <div className="field" key={key}>
              <Button
                padding="4px 4px 4px 8px"
                onClick={() => selectHighlight(key)}
                background={highlight === key ? COLORS.HOVER : COLORS.BLACK}
              >
                <div className="row">
                  <span className="capitalize">{key}</span>
                  <span
                    className="color-square"
                    style={{
                      backgroundColor: highlights[key],
                      boxShadow: `inset 0px 0px 0px ${highlight === key ? 2 : 1}px ${
                        COLORS.SECONDARY
                      }`,
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
              custom: true,
            })
          }
        >
          Create +
        </Button>
      </div>
      {highlight && (
        <HighlightPicker
          title={highlight}
          color={highlights[highlight]}
          onChange={color => updateHighlights({ [highlight]: stringifyColor(color) })}
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
