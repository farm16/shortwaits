import { noop } from "lodash";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { request, PERMISSIONS } from "react-native-permissions";

export function useSelectImage() {
  const [imageBase64, setImageBase64] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const options: ImageLibraryOptions = {
    mediaType: "photo",
    maxWidth: 500,
    maxHeight: 500,
    selectionLimit: 1,
    includeBase64: true,
  };

  const handlePermissionRequiredAlert = retry => {
    Alert.alert("Permission required", "Please allow access to your gallery to upload images", [
      {
        text: "OK",
        onPress: () => retry(),
      },
      {
        text: "Cancel",
        onPress: noop,
        style: "cancel",
      },
    ]);
  };

  const init = async () => {
    setIsLoading(true);
    const permission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (permission === "granted") {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          setIsError(true);
          setIsLoading(false);
          console.log("IMAGE PICKER ERROR >>>", response.errorMessage);
        } else {
          setIsError(false);
          setIsLoading(false);
          setImageBase64(response.assets[0].base64);
        }
      });
    } else {
      handlePermissionRequiredAlert(init);
    }
  };

  return {
    isLoading,
    isError,
    init,
    imageBase64,
  };
}
