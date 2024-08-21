#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"  // here
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Initialize Facebook SDK
  [[FBSDKApplicationDelegate sharedInstance] application:application
                      didFinishLaunchingWithOptions:launchOptions];
            
  self.moduleName = @"SwMobileAdmin";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{
      @"brandColors": @{
      @"primary": @"#595FD9",
      @"secondary": @"#0f0f0f",
      @"tertiary": @"#EB9B04"
    }
  };
  
  bool didLaunchFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];

  [RNSplashScreen show];
  
  return didLaunchFinish;
//  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [[FBSDKApplicationDelegate sharedInstance]application:app
                                                      openURL:url
                                                      options:options];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"src/main"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
