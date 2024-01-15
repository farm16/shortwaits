import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { useSocialSignUpMutation } from "../services";

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socialSignUp] = useSocialSignUpMutation();

  const handleGoogleAuth = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { serverAuthCode } = await GoogleSignin.signIn();

      // Separate the social sign-up logic
      await signInWithGoogle(serverAuthCode);

      return serverAuthCode;
    } catch (error) {
      setError("An error occurred during Google sign-in.");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async serverAuthCode => {
    try {
      await socialSignUp({
        provider: "google",
        authCode: serverAuthCode,
      });
    } catch (error) {
      // Handle social sign-up errors if needed
      console.error("Social sign-up Shortwaits API error >>>", error);
    }
  };

  return { isLoading, error, handleGoogleAuth };
}
