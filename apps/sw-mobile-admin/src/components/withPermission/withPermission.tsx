import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { PERMISSIONS, PermissionStatus, check, request } from "react-native-permissions";

const permissions = {
  camera: Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  }),
} as const;

type WithPermissionProps = {
  children: React.ReactNode;
  show: boolean;
  permission: keyof typeof permissions;
};

export function WithPermission({ children, show, permission }: WithPermissionProps) {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    if (show) {
      console.log("checking for", permissions[permission]);
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
    }
  }, [show, permission]);

  if (!isPermissionGranted) {
    return null;
  }

  return <>{children}</>;
}
