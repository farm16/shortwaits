package com.swmobileadmin;

import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SwMobileAdmin";
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
      DefaultNewArchitectureEntryPoint.getFabricEnabled()) {
      @Nullable
      @Override
      protected Bundle getLaunchOptions() {
       Bundle initialProps = new Bundle();
       Bundle brandColors = new Bundle();

       brandColors.putString("primary", "#595FD9");
       brandColors.putString("secondary", "#0f0f0f");
       brandColors.putString("tertiary", "#EB9B04");

       initialProps.putBundle("brandColors", brandColors);

       return initialProps;
     }
   };
  }
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.style.SplashScreenTheme, true);
    super.onCreate(savedInstanceState); // super.onCreate(null) with react-native-screens
  }
}
