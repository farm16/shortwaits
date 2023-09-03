#!/bin/bash

if [ $# -eq 0 ]; then
  npm version patch
else
  npm version "$@"
fi

# Push the changes with tags
git push origin main --follow-tags
