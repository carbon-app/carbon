// Theirs
import React from 'react'

export default function GlobalHighlights({ highlights }) {
  return (
    <style jsx global>
      {`
        :global(.CodeMirror__container .CodeMirror) {
          color: ${highlights.text} !important;
          background-color: ${highlights.background} !important;
        }

        :global(.cm-string),
        :global(.cm-string-2) {
          color: ${highlights.string} !important;
        }
        :global(.cm-comment) {
          color: ${highlights.comment} !important;
        }
        :global(.cm-variable) {
          color: ${highlights.variable} !important;
        }
        :global(.cm-variable-2) {
          color: ${highlights.variable2 || highlights.variable} !important;
        }
        :global(.cm-variable-3) {
          color: ${highlights.variable3 || highlights.variable} !important;
        }
        :global(.cm-number) {
          color: ${highlights.number} !important;
        }
        :global(.cm-keyword) {
          color: ${highlights.keyword} !important;
        }
        :global(.cm-property) {
          color: ${highlights.property} !important;
        }
        :global(.cm-def) {
          color: ${highlights.definition} !important;
        }
        :global(.cm-meta) {
          color: ${highlights.meta} !important;
        }
        :global(.cm-operator) {
          color: ${highlights.operator} !important;
        }
        :global(.cm-attribute) {
          color: ${highlights.attribute} !important;
        }
        :global(.cm-tag) {
          color: ${highlights.tag} !important;
        }
        :global(.cm-builtin) {
          color: ${highlights.builtin} !important;
        }

        :global(.cm-s-dracula .CodeMirror-cursor) {
          border-left: solid 2px #159588 !important;
        }

        :global(.cm-s-vscode .CodeMirror-cursor) {
          border-left: solid 2px #bebebe !important;
        }

        :global(.cm-s-solarized) {
          box-shadow: none !important;
        }

        :global(.cm-s-solarized.cm-s-light) {
          text-shadow: #eee8d5 0 1px !important;
        }

        :global(.cm-s-solarized.cm-s-light .CodeMirror-linenumber),
        :global(.cm-s-solarized.cm-s-light .CodeMirror-linenumbers) {
          background-color: #fdf6e3 !important;
        }

        :global(.cm-s-solarized.cm-s-dark .CodeMirror-linenumber),
        :global(.cm-s-solarized.cm-s-dark .CodeMirror-linenumbers) {
          background-color: #002b36 !important;
        }
      `}
    </style>
  )
}
