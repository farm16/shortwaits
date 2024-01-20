#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
USER=$(whoami)
GROUP=$(id -gn)
FILE_PATTERN="$DIR"/*.sh

if [ -z "$(find "$DIR" -maxdepth 1 -type f -name "*.sh")" ]; then
  echo "No *.sh files found in $DIR."
  exit 1
fi

chmod 777 "$FILE_PATTERN" || { echo "Failed to chmod files."; exit 1; }
chown "$USER":"$GROUP" "$FILE_PATTERN" || { echo "Failed to chown files."; exit 1; }

echo "Permissions updated for *.sh files in $DIR."
