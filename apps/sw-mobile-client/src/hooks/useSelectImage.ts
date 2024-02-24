import { noop } from "lodash";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { PERMISSIONS, request } from "react-native-permissions";
import { useUploadImageFileMutation } from "../services";

export function useSelectImage() {
  const [uploadImageFile, { data: uploadImageFileData, isError: isUploadImageFileError, isLoading: isUploadImageFileLoading }] = useUploadImageFileMutation();
  const [imageBase64, setImageBase64] = useState<string>(null);
  const [imageUrl, setImageUrl] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const options: ImageLibraryOptions = {
    mediaType: "photo",
    maxWidth: 250,
    maxHeight: 250,
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

  useEffect(() => {
    if (uploadImageFileData) {
      setImageUrl(uploadImageFileData.data.url);
      setIsLoading(false);
    }
    if (isUploadImageFileError) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [isUploadImageFileError, uploadImageFileData]);

  useEffect(() => {
    if (imageBase64) {
      uploadImageFile({ body: { base64Data: imageBase64 } });
    }
  }, [imageBase64, uploadImageFile]);

  const init = async () => {
    setIsError(false);
    setIsLoading(true);
    const permission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (permission === "granted") {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          setIsError(true);
          setIsLoading(false);
          console.log("IMAGE PICKER ERROR >>>", response.errorMessage);
        } else {
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
    imageUrl,
  };
}
