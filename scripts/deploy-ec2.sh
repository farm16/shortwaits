#!/bin/bash
git pull
npm install
npm run sw-api:build
pm2 reload ecosystem.config.js --env production

# EOF