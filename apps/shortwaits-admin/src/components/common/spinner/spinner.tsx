import React from "react";
import LoaderSpinner from "react-native-spinkit";
import { useTheme } from "@shortwaits/admin/theme";

export const Spinner = ({ color }: { color?: string }) => {
  const { Colors } = useTheme();
  return (
    <LoaderSpinner
      style={{
        marginBottom: 5,
      }}
      size={40}
      type={"ThreeBounce"}
      color={color ?? Colors.darkText}
    />
  );
};
