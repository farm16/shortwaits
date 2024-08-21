import { useState } from "react";
import { useSocialSignUpMutation } from "../services";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

const fbPermissions = ["public_profile", "email"];

export function useFacebookAuth(permissionList = fbPermissions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socialSignUp] = useSocialSignUpMutation();

  const handleFacebookAuth = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await LoginManager.logInWithPermissions(permissionList);
      if (result.isCancelled) {
        setError("Login cancelled");
      } else {
        const accessToken = await AccessToken.getCurrentAccessToken();
        if (!accessToken) {
          setError("An error occurred during Facebook sign-in.");
          return;
        }
        console.log("Facebook sign-in accessToken >>>", accessToken);
        await swLocalSocialSignUp(accessToken.accessToken, accessToken.userID);
        return accessToken.accessToken;
      }
    } catch (error) {
      console.error("Facebook sign-in error >>>", error);
      setError("An error occurred during Facebook sign-in.");
    } finally {
      setIsLoading(false);
    }
  };

  const swLocalSocialSignUp = async (serverAuthCode, uid) => {
    try {
      await socialSignUp({
        kind: "facebook",
        authCode: serverAuthCode,
        uid: uid,
      });
    } catch (error) {
      // Handle social sign-up errors if needed
      console.error("Social sign-up Shortwaits API error >>>", error);
    }
  };

  return { isLoading, error, handleFacebookAuth };
}
