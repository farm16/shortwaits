#!/bin/bash
git fetch
git reset --hard origin/main
npm install
npm run sw-api:build
pm2 reload ecosystem.config.js --env production

# EOF