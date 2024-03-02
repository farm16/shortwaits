import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { PERMISSIONS, PermissionStatus, check, request } from "react-native-permissions";

const permissions = {
  camera: Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
    default: null,
  }),
} as const;

type WithPermissionProps = {
  children: React.ReactNode;
  permission: keyof typeof permissions;
  onDenied?: () => void;
};

export function WithPermission({ children, permission, onDenied }: WithPermissionProps) {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    const _permission = permissions[permission];
    console.log("now looking for permission >>>", permissions[permission]);

    if (_permission) {
      check(_permission).then((result: PermissionStatus) => {
        console.log("permission result", result);
        if (result === "granted") {
          setIsPermissionGranted(true);
        }

        if (result === "blocked") {
          onDenied && onDenied();
          setIsPermissionGranted(false);
        }
        if (result === "denied") {
          request(_permission).then((result: PermissionStatus) => {
            if (result === "granted") {
              setIsPermissionGranted(true);
            }

            if (result === "blocked") {
              onDenied && onDenied();
              setIsPermissionGranted(false);
            }
          });
        }
      });
    }
  }, [onDenied, permission]);

  if (!isPermissionGranted) {
    return null;
  }

  return <View>{children}</View>;
}
