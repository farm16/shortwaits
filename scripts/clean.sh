find . -name "node_modules" -type d -prune -exec rm -rf '{}' + && 
find . -name "yarn.lock" -type f -prune -exec rm -rf '{}' + && 
watchman watch-del-all &&
rm -rf apps/shortwaits-admin/ios/Pods && 
rm -rf apps/shortwaits-admin/ios/Podfile.lock && 
yarn 
# &&
# cd apps/shortwaits-admin/android &&
# ./gradlew clean && 
# cd ../ios &&
# xcodebuild clean -project ShortwaitsAdmin.xcodeproj && 
# cd ../../