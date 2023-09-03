#!/bin/bash

if [ $# -eq 0 ]; then
  npm version patch
else
  npm version "$@"
fi
git stash          # Stash the changes
# # Push the changes with tags
# git push origin main --follow-tags
# git stash pop      # Apply the stashed changes back
