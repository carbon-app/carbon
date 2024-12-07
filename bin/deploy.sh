#!/usr/bin/env bash
set -e

vercel switch carbon-app

VERCEL_URL=$(vercel)

yarn cy:run --config baseUrl="$VERCEL_URL"

echo "$VERCEL_URL"| tee /dev/tty | pbcopy

read -p "Deploy to production (y/N)?" -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  vercel alias "$VERCEL_URL" carbon.now.sh
fi