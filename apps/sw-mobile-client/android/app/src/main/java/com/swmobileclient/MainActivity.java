package com.swmobileclient;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SwMobileClient";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled()){
          @Nullable
          @Override
          protected Bundle getLaunchOptions() {
            Bundle initialProps = new Bundle();
            Bundle brandColors = new Bundle();

            brandColors.putString("primary", "#FF0000");
            brandColors.putString("secondary", "#00FF00");
            brandColors.putString("tertiary", "#0000FF");

            initialProps.putBundle("brandColors", brandColors);
            
            return initialProps;
          }
        }
  }
}
