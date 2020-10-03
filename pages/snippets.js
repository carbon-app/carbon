// Theirs
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAsyncCallback } from 'actionsack'

import Button from '../components/Button'
import LoginButton from '../components/LoginButton'
import ConfirmButton from '../components/ConfirmButton'
import { MetaLinks } from '../components/Meta'
import Carbon from '../components/Carbon'
import Page from '../components/Page'

import { useAuth } from '../components/AuthContext'
import { useAPI } from '../components/ApiContext'

import { COLORS, DEFAULT_SETTINGS } from '../lib/constants'

function correctTimestamp(n) {
  if (n < 9e12) {
    return n * 1000
  }
  return n
}

function Snippet(props) {
  const config = {
    ...DEFAULT_SETTINGS,
    ...props,
    fontSize: '2px',
    windowControls: false,
  }

  return (
    <div className="snippet">
      <div className="column">
        <div className="carbon-container">
          <Carbon key={config.language} readOnly={true} config={config} loading={props.loading}>
            {props.code}
          </Carbon>
        </div>
        <div className="id">{props.name || props.title || props.id}</div>
        <div className="meta">
          Edited {formatDistanceToNow(correctTimestamp(props.updatedAt), { addSuffix: true })}
        </div>
      </div>
      <div className="overlay">
        <Link prefetch={false} href={`/${props.id}`}>
          <Button
            large
            border
            center
            flex="unset"
            margin="0 auto 1.5rem"
            padding="0.5rem 16px"
            color="#fff"
          >
            Open ↗
          </Button>
        </Link>
        <ConfirmButton
          large
          border
          center
          flex="unset"
          margin="0 auto"
          padding="0.5rem 20px"
          color="#fff"
          textColor={COLORS.RED}
          hoverColor={COLORS.RED}
          onClick={props.deleteSnippet}
        >
          Delete
        </ConfirmButton>
      </div>
      <style jsx>
        {`
          .snippet {
            position: relative;
            width: 266px;
            height: 266px;
            border: 1px solid ${COLORS.SECONDARY};
            border-radius: 3px;
            cursor: pointer !important;
            overflow: hidden;
          }
          .overlay {
            display: none;
            position: absolute;
            content: '↗';
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: ${COLORS.HOVER};
            opacity: 0.8;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            font-size: 48px;
            z-index: 999;
          }
          .snippet:hover .overlay {
            display: flex;
            background: ${COLORS.HOVER};
          }
          .column {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            overflow: hidden;
          }
          .id {
            position: absolute;
            top: 0.25rem;
            right: 0.25rem;
            border-radius: 3px;
            background: ${COLORS.SECONDARY};
            color: ${COLORS.BLACK};
            font-size: 10px;
            padding: 0.125rem;
            max-width: 80%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            z-index: 200;
          }
          .carbon-container {
            width: 100%;
            height: 100%;

            overflow: hidden;
            color: ${COLORS.SECONDARY};
            width: 266px;
          }
          .carbon-container :global(.CodeMirror__container .CodeMirror span) {
            font-size: 2px !important;
          }
          .meta {
            background: ${COLORS.SECONDARY};
            color: ${COLORS.DARK_GRAY};
            width: 100%;
            font-size: 10px;
            padding: 0.24rem;
            bottom: 0px;
          }
        `}
      </style>
    </div>
  )
}

function ActionButton(props) {
  return (
    <Button
      border
      center
      margin="0.5rem"
      flex="unset"
      color={COLORS.GRAY}
      style={{ width: 266, minHeight: 266 }}
      {...props}
    />
  )
}

function useOnMount() {
  const [mounted, mount] = React.useState(false)
  React.useEffect(() => {
    mount(true)
  }, [])

  return mounted
}

function SnippetsPage() {
  const user = useAuth()
  const api = useAPI()

  const [snippets, setSnippets] = React.useState([])
  const [page, setPage] = React.useState(0)

  const mounted = useOnMount()

  const [loadMore, { loading, data: previousRes }] = useAsyncCallback(api.snippet.list)

  React.useEffect(() => {
    if (user) {
      loadMore(page).then(newSnippets => setSnippets(curr => curr.concat(newSnippets)))
    }
  }, [loadMore, page, user])

  function deleteSnippet(id) {
    return api.snippet.delete(id).then(() => setSnippets(curr => curr.filter(s => s.id !== id)))
  }

  if (!user) {
    return <LoginButton />
  }

  return (
    <div className="container">
      {snippets.map(snippet => (
        <Snippet
          key={snippet.id}
          {...snippet}
          loading={!mounted}
          deleteSnippet={deleteSnippet.bind(null, snippet.id)}
        />
      ))}
      {snippets.length && previousRes && previousRes.length < 10 ? null : (
        <ActionButton
          disabled={loading}
          onClick={() => {
            if (snippets.length) return setPage(p => p + 1)

            Router.push('/')
          }}
        >
          <h4>{loading ? 'Loading…' : !snippets.length ? 'Create snippet +' : 'Load more +'}</h4>
        </ActionButton>
      )}
      <style jsx>
        {`
          .container {
            max-width: 872px;
            min-width: ${266 + 32 + 8}px;
            border: 3px solid ${COLORS.SECONDARY};
            border-radius: 8px;
            padding: 0.5rem;
            display: flex;
            flex-wrap: wrap;
          }
          .container :global(.snippet) {
            margin: 0.5rem;
          }
        `}
      </style>
    </div>
  )
}

export default function Snippets() {
  return (
    <Page enableHeroText={true} flex={true}>
      <MetaLinks />
      <SnippetsPage />
    </Page>
  )
}
