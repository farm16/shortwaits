#!/bin/bash

# Get the root directory of the git repository
root_dir=$(git rev-parse --show-toplevel)
db_path="$root_dir/devops/db/sw_api.db"
ecosystem_file="$root_dir/devops/pm2/ecosystem.config.js"

KEY_DIR="apps/sw-api/assets/"
PUBLIC_KEY="${KEY_DIR}public.pem"
PRIVATE_KEY="${KEY_DIR}private.pem"

# Ensure the key directory exists
mkdir -p "$KEY_DIR"

# Check if the private and public keys exist
if [ -f "$PRIVATE_KEY" ] && [ -f "$PUBLIC_KEY" ]; then
  echo "Private and public keys already exist at $KEY_DIR"
else
  echo "Private and public keys do not exist at $KEY_DIR"
  read -sp "Enter the passphrase for encrypting the private key: " PASSPHRASE
  echo

  # Generate the RSA key pair
  openssl genpkey -algorithm RSA -out "$PRIVATE_KEY" -aes-256-cbc -pass pass:"$PASSPHRASE" -pkeyopt rsa_keygen_bits:4096
  openssl rsa -pubout -in "$PRIVATE_KEY" -out "$PUBLIC_KEY" -passin pass:"$PASSPHRASE"

  # Output the location of the generated keys
  echo "Public key written to: $PUBLIC_KEY"
  echo "Private key written to: $PRIVATE_KEY"
fi

# Check if sqlite3 is installed, if not install it
if ! command -v sqlite3 &> /dev/null; then
  echo "sqlite3 is not installed. Installing sqlite3..."
  sudo apt-get update
  sudo apt-get install sqlite3 -y
  echo "sqlite3 installed successfully"
else
  echo "sqlite3 is already installed"
fi

# Check if the database file exists
if [ ! -f "$db_path" ]; then
  echo "Database file not found at $db_path"
  echo "Creating a new database file..."
  # Create the database file using the schema but do not enter the sqlite3 shell
  sqlite3 "$db_path" < "$root_dir/devops/db/schema.sql"
  echo "Database file created successfully"
else
  echo "Database file found at $db_path"
fi

# Navigate to the root directory
cd "$root_dir"

# Clean up the project directory
rm -rf node_modules dist tmp

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
