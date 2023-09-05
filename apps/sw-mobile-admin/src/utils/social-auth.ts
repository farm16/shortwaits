import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";

export async function onGoogleButtonPress() {
  try {
    // Check if your device supports Google Play Services and show an update dialog if needed
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Sign in with Google
    const { idToken } = await GoogleSignin.signIn();

    console.log("Successfully signed in with Google. ID Token:", idToken);
  } catch (error) {
    console.log("Google sign-in error:", error);
    Alert.alert("Oops", "An error occurred during Google sign-in.");
  }
}
