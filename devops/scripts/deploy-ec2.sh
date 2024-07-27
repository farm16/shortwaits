#!/bin/bash

root_dir=$(git rev-parse --show-toplevel)
db_path="$root_dir/devops/db/sw_api.db"
ecosystem_file="$root_dir/devops/pm2/ecosystem.config.js"

# check if sqlite3 is installed else install it
if ! command -v sqlite3 &> /dev/null; then
  echo "sqlite3 is not installed. Installing sqlite3..."
  sudo apt-get update
  sudo apt-get install sqlite3
  echo "sqlite3 installed successfully"
else
  echo "sqlite3 is already installed"
fi

if [ ! -f $db_path ]; then
  echo "Database file not found at $db_path"
  echo "Creating a new database file..."
  sqlite3 $db_path
  echo "Database file created successfully"
else
  echo "Database file found at $db_path"
fi

cd $root_dir
rm -rf node_modules dist tmp
git fetch
git reset --hard origin/main
npm install
npm run api:build
pm2 reload ecosystem.config.js --env production

