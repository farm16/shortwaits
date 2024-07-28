#!/bin/bash

# Get the root directory of the git repository
root_dir=$(git rev-parse --show-toplevel)
ecosystem_file="$root_dir/devops/pm2/ecosystem.config.js"

# Navigate to the root directory
cd "$root_dir"

# Clean up the project directory
rm -rf node_modules dist

# Fetch the latest changes from the remote repository
git fetch

# Reset the local branch to match the remote branch
git reset --hard origin/main

# Install npm dependencies
npm install

# Build the API
npm run api:build

# Reload the pm2 process using the ecosystem configuration
pm2 reload "$ecosystem_file" --env production
