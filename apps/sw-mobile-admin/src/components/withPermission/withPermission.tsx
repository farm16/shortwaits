import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { PERMISSIONS, PermissionStatus, check, request } from "react-native-permissions";

const permissions = {
  camera: Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  }),
} as const;

type WithPermissionProps = {
  children: React.ReactNode;
  permission: keyof typeof permissions;
};

export function WithPermission({ children, permission }: WithPermissionProps) {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    console.log("checking for >>>", permissions[permission]);
    check(permissions[permission]!).then((result: PermissionStatus) => {
      console.log("result", result);
      if (result === "granted") {
        setIsPermissionGranted(true);
      }

      if (result === "blocked") {
        setIsPermissionGranted(false);
      }
      if (result === "denied") {
        request(permissions[permission]!).then((result: PermissionStatus) => {
          if (result === "granted") {
            setIsPermissionGranted(true);
          }

          if (result === "blocked") {
            setIsPermissionGranted(false);
          }
        });
      }
    });
  }, [permission]);

  if (!isPermissionGranted) {
    return null;
  }

  return <View>{children}</View>;
}
