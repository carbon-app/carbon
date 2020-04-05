import React from 'react'

import Button from './Button'
import { COLORS, DEFAULT_PRESETS } from '../lib/constants'
import * as Arrows from './svg/Arrows'
import Remove from './svg/Remove'

const removeButtonStyles = {
  position: 'absolute',
  top: '6px',
  right: '6px',
  width: '11px',
  height: '11px',
  borderRadius: '999px',
}

const Preset = React.memo(({ remove, apply, selected, preset }) => {
  const isSelected = preset.id === selected

  return (
    <div className="preset-container">
      <Button
        onClick={() => apply(preset)}
        disabled={isSelected}
        border={isSelected}
        selected={isSelected}
        hoverBackground={preset.backgroundColor}
        style={{
          height: '96px',
          borderRadius: '3px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'contain',
          backgroundImage: `url('${preset.icon}')`,
          backgroundColor: preset.backgroundColor,
        }}
      />
      {preset.custom && (
        <Button
          center
          hoverBackground={COLORS.SECONDARY}
          background={COLORS.SECONDARY}
          onClick={() => remove(preset.id)}
          style={removeButtonStyles}
        >
          <Remove />
        </Button>
      )}
      <style jsx>
        {`
          .preset-container {
            display: flex;
            position: relative;
            flex: 0 0 96px;
            margin-right: 8px;
          }

          .preset-container :global(button:focus) {
            box-shadow: inset 0px 0px 0px 1px ${COLORS.SECONDARY};
          }
        `}
      </style>
    </div>
  )
})

const arrowButtonStyle = {
  position: 'absolute',
  top: 0,
  right: '16px',
  height: '100%',
}

const Presets = React.memo(
  ({ show, create, toggle, undo, presets, selected, remove, apply, applied, contentRef }) => {
    const customPresetsLength = presets.length - DEFAULT_PRESETS.length

    const disabledCreate = selected != null

    return (
      <div className="settings-presets">
        <div className="settings-presets-header">
          <span>Presets</span>
          {show && (
            <Button
              margin="0 0 0 8px"
              flex="0 0 54px"
              color={COLORS.GRAY}
              hoverBackground="transparent"
              hoverColor={disabledCreate ? COLORS.GRAY : COLORS.SECONDARY}
              onClick={create}
              disabled={disabledCreate}
            >
              create +
            </Button>
          )}
          <Button center onClick={toggle} style={arrowButtonStyle} hoverBackground={COLORS.BLACK}>
            {show ? <Arrows.Up /> : <Arrows.Down />}
          </Button>
        </div>
        {show && (
          <div className="settings-presets-content" ref={contentRef}>
            {presets
              .filter(p => p.custom)
              .map(preset => (
                <Preset
                  key={preset.id}
                  remove={remove}
                  apply={apply}
                  preset={preset}
                  selected={selected}
                />
              ))}
            {customPresetsLength > 0 ? <div className="settings-presets-divider" /> : null}
            {presets
              .filter(p => !p.custom)
              .map(preset => (
                <Preset key={preset.id} apply={apply} preset={preset} selected={selected} />
              ))}
          </div>
        )}
        {show && applied && (
          <div className="settings-presets-applied">
            <span>Preset applied!</span>
            <Button
              center
              flex="0"
              onClick={undo}
              color={COLORS.BLACK}
              hoverBackground="transparent"
              background="transparent"
            >
              undo <span>&#x21A9;</span>
            </Button>
          </div>
        )}
        <style jsx>
          {`
            .settings-presets {
              border-bottom: 2px solid ${COLORS.SECONDARY};
            }

            .settings-presets-header {
              display: flex;
              padding: 8px;
              position: relative;
              color: ${COLORS.SECONDARY};
              width: 100%;
              align-items: center;
            }

            .settings-presets-content {
              display: flex;
              overflow-x: scroll;
              margin: 0 8px 12px 8px;
              align-items: center;
              /* https://iamsteve.me/blog/entry/using-flexbox-for-horizontal-scrolling-navigation */
              flex-wrap: nowrap;
              -webkit-overflow-scrolling: touch;
            }

            .settings-presets-divider {
              height: 72px;
              padding: 1px;
              border-radius: 3px;
              margin-right: 8px;
              background-color: ${COLORS.DARK_GRAY};
            }

            .settings-presets-applied {
              display: flex;
              justify-content: space-between;
              background-color: ${COLORS.SECONDARY};
              color: ${COLORS.BLACK};
              padding: 4px 8px;
            }

            .settings-presets-applied span {
              float: right;
              margin: 2px 0 0 2px;
            }
          `}
        </style>
      </div>
    )
  }
)

export default Presets
