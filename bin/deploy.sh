#!/usr/bin/env bash
# Don't deploy if commit contains WIP
set -e
if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  if [[ -z ${NOW_TOKEN+x} ]]; then
    if [[ $(git log -1 --pretty=%B --no-merges) != *"WIP"* ]]; then
      NOW_URL=$(now -e NODE_ENV=production --public --no-clipboard --team=dawn --token="$NOW_TOKEN") || exit 0

      curl -X POST \
        -H 'Content-type: application/json' \
        --data "{\"text\": \":small_red_triangle: New Carbon PR Deployment for <https://github.com/dawnlabs/carbon/pulls/$TRAVIS_PULL_REQUEST|PR #$TRAVIS_PULL_REQUEST>\\n:rocket: $NOW_URL\"}" \
        "$DAWN_SLACK_WEBHOOK"
    fi
  fi
fi
