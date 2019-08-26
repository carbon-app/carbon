// Theirs
import React from 'react'
import Link from 'next/link'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAsyncCallback } from '@dawnlabs/tacklebox'

import Button from '../components/Button'
import LoginButton from '../components/LoginButton'
import { useAuth } from '../components/AuthContext'
import { useAPI } from '../components/ApiContext'

import { COLORS } from '../lib/constants'

// Ours
import Page from '../components/Page'

function correctTimestamp(n) {
  if (n < 9e12) {
    return n * 1000
  }
  return n
}

function Snippet(props) {
  return (
    <div className="snippet">
      <Link prefetch={false}>
        <a href={`/${props.id}`}>
          <div className="id">{props.title || props.id}</div>
          <div className="column">
            <div> </div>
            <div className="meta">
              Edited {formatDistanceToNow(correctTimestamp(props.updatedAt), { addSuffix: true })}
            </div>
          </div>
        </a>
      </Link>
      <style jsx>
        {`
          .snippet {
            position: relative;
            width: 160px;
            height: 160px;
            border: 1px solid ${COLORS.SECONDARY};
            border-radius: 3px;
          }
          .column {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
          }
          .id {
            position: absolute;
            top: 0.25rem;
            right: 0.25rem;
            border-radius: 3px;
            background: ${COLORS.SECONDARY};
            color: ${COLORS.BLACK};
            font-size: 8px;
            padding: 0.125rem;
            max-width: 80%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
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

function SnippetsPage() {
  const user = useAuth()
  const api = useAPI()

  const [snippets, setSnippets] = React.useState([])
  const [page, setPage] = React.useState(0)

  const [loadMore, { loading, data: previousRes }] = useAsyncCallback(api.snippet.list)

  React.useEffect(() => {
    if (user) {
      const authorization = user.ra
      loadMore(page, { authorization }).then(newSnippets =>
        setSnippets(curr => curr.concat(newSnippets))
      )
    }
  }, [loadMore, page, user])

  if (!user) {
    return <LoginButton />
  }

  return (
    <div className="container">
      {snippets.map(snippet => (
        <Snippet key={snippet.id} {...snippet} />
      ))}
      {previousRes && previousRes.length < 10 ? null : (
        <Button
          border
          center
          margin="0.25rem"
          flex="0 0 160px"
          disabled={loading}
          color={COLORS.GRAY}
          style={{ minHeight: 160 }}
          onClick={() => setPage(p => p + 1)}
        >
          <h4>{loading ? 'Loading...' : 'Load more +'}</h4>
        </Button>
      )}
      <style jsx>
        {`
          .container {
            max-width: 862px;
            min-width: 192px;
            border: 3px solid ${COLORS.SECONDARY};
            border-radius: 8px;
            padding: 0.5rem;
            display: flex;
            flex-wrap: wrap;
          }
          .container :global(.snippet) {
            margin: 0.25rem;
          }
        `}
      </style>
    </div>
  )
}

export default () => (
  <Page enableHeroText={true}>
    <SnippetsPage />
  </Page>
)
