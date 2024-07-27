#!/bin/bash

# go to git root directory of the project
cd $(git rev-parse --show-toplevel)
rm -rf node_modules dist tmp
git fetch
git reset --hard origin/main
npm install
npm run api:build
pm2 reload ecosystem.config.js --env production

# EOF