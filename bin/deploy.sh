#!/usr/bin/env bash
set -e

now switch carbon-app

NOW_URL=$(now)

yarn cy:run --config baseUrl="$NOW_URL"

echo "$NOW_URL"| tee /dev/tty | pbcopy

read -p "Deploy to production (y/N)?" -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  now alias "$NOW_URL" carbon.now.sh
fi