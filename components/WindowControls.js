import React from 'react'
import { useCopyTextHandler } from 'actionsack'

import { COLORS } from '../lib/constants'
import { Controls, ControlsBW, ControlsBoxy, ControlsXP, ConstrolsXP } from './svg/Controls'
import CopySVG from './svg/Copy'
import CheckMark from './svg/Checkmark'

const size = 24

const CopyButton = React.memo(function CopyButton({ text }) {
  const { onClick, copied } = useCopyTextHandler(text)

  return (
    <button onClick={onClick} aria-label="Copy Button">
      {copied ? (
        <CheckMark color={COLORS.GRAY} width={size} height={size} />
      ) : (
        <CopySVG size={size} color={COLORS.GRAY} />
      )}
      <style jsx>
        {`
          button {
            border: none;
            cursor: pointer;
            color: ${COLORS.SECONDARY};
            background: transparent;
          }

          &:active {
            outline: none;
          }
        `}
      </style>
    </button>
  )
})

const WINDOW_THEMES_MAP = { bw: <ControlsBW />, boxy: <ControlsBoxy />, xp: <ConstrolsXP/> }

export function TitleBar({ light, value, onChange }) {
  return (
    <div>
      <input
        aria-label="Image title"
        type="text"
        spellCheck="false"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
      />
      <style jsx>
        {`
          div {
            position: absolute;
            margin: 0px;
            top: -3px;
            left: -9px;
            width: 100%;
            text-align: center;
          }

          input {
            width: 250px;
            background: none;
            outline: none;
            border: none;
            text-align: center;
            /**
             * 140px is an arbitrary value, but it's roughly equal to:
             * 2 * (window theme width + window theme outside margin)
             */
            max-width: calc(100% - 140px);
            font-size: 14px;
            color: ${light ? COLORS.BLACK : COLORS.SECONDARY};
          }
        `}
      </style>
    </div>
  )
}

function CSSInjector(theme){
  // [top, margin-left]
  if (theme == 'bw'){
    return [36, 16]
  } else if (theme == 'xp') {
    return [26, 0]
  } else {
    return [34, 14]
  }
} 

export default function WindowControls({
  theme,
  copyable,
  code,
  light,
  titleBar,
  onTitleBarChange,
}) {
  return (
    <div className="window-controls">
      {WINDOW_THEMES_MAP[theme] || <Controls />}
      <TitleBar value={titleBar} onChange={onTitleBarChange} light={light} />
      {copyable && (
        <div className="copy-button">
          <CopyButton text={code} />
        </div>
      )}
      <style jsx>
        {`
          .window-controls {
            margin-top: -24px;
            position: relative;
            top: ${CSSInjector(theme)[0]}px;
            margin-left: ${CSSInjector(theme)[1]}px;
            margin-right: ${theme === 'boxy' ? 16 : 0}px;
            z-index: 2;
            text-align: ${theme === 'boxy' || theme == 'xp' ? 'right' : 'initial'};
            padding-top: ${theme == 'xp' ? 5 : 0}px;
            background-color: ${theme === 'xp' ? 'RGB(48, 88, 162)' : 'None'};
          }

          .copy-button {
            cursor: pointer;
            position: absolute;
            top: 0px;
            right: 16px;
          }
        `}
      </style>
    </div>
  )
}
