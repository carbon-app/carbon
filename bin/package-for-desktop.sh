#!/usr/bin/env bash
set -e

npx nativefier --name "Carbon" --icon static/brand/desktop.png "https://carbon.now.sh" packaged

npx create-dmg packaged/Carbon-darwin-x64/Carbon.app packaged