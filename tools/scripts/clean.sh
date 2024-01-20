#!/bin/bash

# Remove node_modules directories, yarn.lock, and package-lock.json files
find . -name "node_modules" -type d -prune -exec rm -rf '{}' + && 
find . -name "yarn.lock" -type f -prune -exec rm -rf '{}' + && 
find . -name "package-lock.json" -type f -prune -exec rm -rf '{}' + &&

# Clean up watchman and remove specific files/directories
watchman watch-del-all &&
rm -rf apps/sw-mobile-admin/ios/Pods && 
rm -rf apps/sw-mobile-admin/ios/Podfile.lock && 

# Install npm dependencies
npm install 

# The following commands are commented out:
# cd apps/sw-mobile-admin/android &&
# ./gradlew clean && 
# cd ../ios &&
# xcodebuild clean -project ShortwaitsAdmin.xcodeproj && 
# cd ../../
