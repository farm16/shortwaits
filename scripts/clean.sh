find . -name "node_modules" -type d -prune -exec rm -rf '{}' + && 
find . -name "yarn.lock" -type f -prune -exec rm -rf '{}' + && 
watchman watch-del-all &&
rm -rf apps/sw-mobile-admin/ios/Pods && 
rm -rf apps/sw-mobile-admin/ios/Podfile.lock && 
yarn 
# &&
# cd apps/sw-mobile-admin/android &&
# ./gradlew clean && 
# cd ../ios &&
# xcodebuild clean -project ShortwaitsAdmin.xcodeproj && 
# cd ../../