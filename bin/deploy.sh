#!/usr/bin/env bash
set -e

now switch dawn

NOW_URL=now

yarn cy:run --config baseUrl="$NOW_URL"

read -p "Deploy to production (y/N)?" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  now alias $NOW_URL carbon
fi