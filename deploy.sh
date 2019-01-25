#!/bin/bash
set -e
URL=$(now)
yarn cy:run --config baseUrl="$URL"

# now alias "$URL" carbon
# git checkout master
# release patch