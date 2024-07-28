#!/bin/bash

# Get the root directory of the git repository
root_dir=$(git rev-parse --show-toplevel)
db_path="$root_dir/devops/db/sw_api.db"

SW_API_ASSETS="apps/sw-api/assets/"
PUBLIC_KEY="${SW_API_ASSETS}public.pem"
PRIVATE_KEY="${SW_API_ASSETS}private.pem"

# Check if the private and public keys exist
if [ -f "$PRIVATE_KEY" ] && [ -f "$PUBLIC_KEY" ]; then
  echo "Private and public keys already exist at $SW_API_ASSETS"
else
  echo "Private and public keys do not exist at $SW_API_ASSETS"
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

# # Check if the database file exists
# if [ ! -f "$db_path" ]; then
#   echo "Database file not found at $db_path"
#   echo "Creating a new database file..."
#   # Create the database file using the schema but do not enter the sqlite3 shell
#   sqlite3 "$db_path" < "$root_dir/devops/db/schema.sql"
#   echo "Database file created successfully"
# else
#   echo "Database file found at $db_path"
# fi

