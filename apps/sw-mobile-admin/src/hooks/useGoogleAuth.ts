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
      const result = await GoogleSignin.signIn();
      console.log("Google sign-in serverAuthCode >>>", result);
      await swLocalSocialSignUp(result.serverAuthCode, result.user.id);
      return result.serverAuthCode;
    } catch (error) {
      console.log("useGoogleAuth error >>>", error);
      setError("An error occurred during Google sign-in.");
    } finally {
      setIsLoading(false);
    }
  };

  const swLocalSocialSignUp = async (serverAuthCode, uid) => {
    try {
      await socialSignUp({
        kind: "google",
        authCode: serverAuthCode,
        uid: uid,
      });
    } catch (error) {
      // Handle social sign-up errors if needed
      console.log("useGoogleAuth error >>>", error);
    }
  };

  return { isLoading, error, handleGoogleAuth };
}
