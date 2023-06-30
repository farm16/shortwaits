import { StyleSheet, ViewStyle } from "react-native";

import { ThemeCommonParams } from "../theme.type";
import { getDimensions } from "../utils";

type PresetType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type ButtonPresets = ReturnType<typeof buttonPresets>;

export type ButtonViewType = PresetType<ButtonPresets, "viewPresets">;

export const buttonPresets = ({
  Colors,
  Fonts,
  Gutters, //Should not use margins
  Layout,
}: ThemeCommonParams) => {
  const { width } = getDimensions();

  const VIEW_BASE = StyleSheet.flatten([
    {
      ...Layout.center,
      height: 55,
      width: width * 0.85,
      backgroundColor: Colors.brandPrimary,
      flexDirection: "row",
    },
  ]) as ViewStyle;

  const viewPresets = StyleSheet.create({
    none: {},
    primary: {
      ...VIEW_BASE,
      backgroundColor: Colors.brandSecondary1,
      //backgroundColor: "#C4EDDE",
      borderRadius: 25,
    },
    secondary: {
      ...VIEW_BASE,
      backgroundColor: Colors.brandSecondary4,
      borderRadius: 25,
    },
    "secondary-disabled": {
      ...VIEW_BASE,
      backgroundColor: Colors.gray,
      borderRadius: 25,
    },
    headerLink: {
      margin: 15,
      backgroundColor: Colors.transparent,
    },
    icon: {
      height: 55,
      width: 52,
      justifyContent: "center",
      alignItems: "center",
    },
    outline: {
      ...VIEW_BASE,
      borderRadius: 25,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.brandPrimary,
    },
    flat: {
      ...VIEW_BASE,
      backgroundColor: Colors.backgroundOverlay,
      borderRadius: 25,
    },
    subLink: {
      ...VIEW_BASE,
      width: undefined,
      alignItems: "flex-end",
      height: undefined,
      backgroundColor: Colors.transparent,
    },
    link: {
      ...VIEW_BASE,
      width: undefined,
      backgroundColor: Colors.transparent,
    },
    social: {
      ...VIEW_BASE,
      height: 55 - 2,
      width: width * 0.85 - 2,
      borderRadius: 25,
      backgroundColor: Colors.transparent,
      flexDirection: "row",
      // backgroundColor: Colors.brandAccent,
      borderWidth: 2,
      borderColor: Colors.brandSecondary3,
    },
    socialIcon: {
      position: "absolute",
      left: 0,
      marginLeft: width * 0.03,
      height: 27,
      width: 27,
    },
    card: {
      paddingLeft: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: width * 0.87,
      borderBottomWidth: 1.5,
      borderBottomColor: Colors.inputBackground,
    },
    listItem: {
      minHeight: 55,
      paddingVertical: 10,
      width,
      backgroundColor: Colors.white,
      alignItems: "flex-start",
      justifyContent: "space-evenly",
    },
  });
  const TEXT_BASE = StyleSheet.flatten([
    {
      ...Fonts.textRegular,
    },
  ]);
  const textPresets = StyleSheet.create({
    none: {},
    primary: {
      ...TEXT_BASE,
      color: Colors.brandSecondary7,
      fontWeight: "600",
    },
    secondary: {
      ...TEXT_BASE,
      color: Colors.white,
      fontWeight: "600",
    },
    "secondary-disabled": {
      ...TEXT_BASE,
      color: Colors.white,
      fontWeight: "600",
    },
    headerLink: {
      ...TEXT_BASE,
      ...Fonts.textRegular,
      color: Colors.brandSecondary,
      fontWeight: "500",
    },
    outline: {
      ...TEXT_BASE,
      color: Colors.brandPrimary6,
    },
    flat: {
      ...TEXT_BASE,
      color: Colors.darkGray,
      fontWeight: "600",
    },
    subLink: {
      ...TEXT_BASE,
      ...Fonts.textSmall,
      color: Colors.brandSecondary,
      fontWeight: "600",
    },
    link: {
      ...TEXT_BASE,
      ...Fonts.textRegular,
      color: Colors.brandPrimary5,
      fontWeight: "400",
    },
    social: {
      ...TEXT_BASE,
      ...Fonts.textSmall,
      color: Colors.text,
      fontWeight: "700",
    },
    icon: {},
    socialIcon: {},
    card: {},
    listItem: {},
  });
  return {
    viewPresets,
    textPresets,
  };
};
