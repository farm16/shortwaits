import { StyleSheet, ViewStyle } from "react-native";

import { getResponsiveWidth } from "../../utils";
import { ThemeCommonParams } from "../theme.type";
import { getDimensions } from "../utils";

type PresetType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type ButtonPresets = ReturnType<typeof buttonPresets>;

export type ButtonViewType = PresetType<ButtonPresets, "viewPresets">;
export const CARD_HEIGHT = 70;

export const buttonPresets = ({
  Colors,
  Fonts,
  Gutters, //Should not use margins
  Layout,
}: ThemeCommonParams) => {
  const { width } = getDimensions();

  const VIEW_BASE = StyleSheet.flatten([
    {
      // ...Layout.center,
      height: 50,
      backgroundColor: Colors.brandPrimary,
      flexDirection: "row",
      borderRadius: 25,
      alignItems: "center",
    },
  ]) as ViewStyle;

  const viewPresets = StyleSheet.create({
    none: {},
    primary: {
      ...VIEW_BASE,
      backgroundColor: Colors.brandPrimary,
      borderRightColor: Colors.brandAccent,
      borderBottomColor: Colors.brandAccent,
      borderBottomWidth: 3,
      borderRightWidth: 3,
      paddingHorizontal: getResponsiveWidth(20),
      justifyContent: "center",
    },
    "primary-disabled": {
      ...VIEW_BASE,
      backgroundColor: Colors.disabledBackground,
      borderRightColor: undefined,
      borderBottomColor: undefined,
      borderBottomWidth: undefined,
      borderRightWidth: undefined,
      paddingHorizontal: getResponsiveWidth(20),
      justifyContent: "center",
    },
    primary2: {
      ...VIEW_BASE,
      backgroundColor: Colors.brandSecondary1,
      width: undefined,
      flex: 1,
    },
    "primary2-disabled": {
      ...VIEW_BASE,
      backgroundColor: Colors.brandSecondary1,
      width: undefined,
      flex: 1,
    },
    secondary: {
      ...VIEW_BASE,
      backgroundColor: Colors.brandSecondary4,
      justifyContent: "center",
    },
    "secondary-disabled": {
      ...VIEW_BASE,
      backgroundColor: Colors.gray,
      justifyContent: "center",
    },
    accent: {
      ...VIEW_BASE,
      backgroundColor: Colors.brandAccent1,
      width: undefined,
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
    icon2: {
      height: 45,
      width: 45,
      borderRadius: 22.5,
      backgroundColor: Colors.lightGray,
      justifyContent: "center",
      alignItems: "center",
    },
    "icon2-disabled": {
      height: 45,
      width: 45,
      borderRadius: 22.5,
      backgroundColor: Colors.lightGray,
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
      backgroundColor: Colors.lightBackground,
      borderRadius: 25,
    },
    link: {
      alignSelf: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    subLink: {
      ...VIEW_BASE,
      width: undefined,
      alignItems: "flex-end",
      height: undefined,
      backgroundColor: Colors.transparent,
    },
    social: {
      ...VIEW_BASE,
      borderRadius: 25,
      backgroundColor: Colors.white,
      flexDirection: "row",
      // backgroundColor: Colors.brandAccent,
      // borderWidth: 2,
      // borderColor: Colors.brandAccent4,
    },
    socialIcon: {
      position: "absolute",
      left: 0,
      marginLeft: width * 0.03,
      height: 27,
      width: 27,
    },
    card: {
      marginBottom: 10,
      height: CARD_HEIGHT,
      paddingHorizontal: 8,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray,
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
      color: Colors.white,
      fontWeight: "700",
    },
    "primary-disabled": {
      ...TEXT_BASE,
      color: Colors.disabledText,
      fontWeight: "700",
    },
    primary2: {
      ...TEXT_BASE,
      color: Colors.brandSecondary7,
      fontWeight: "700",
    },
    "primary2-disabled": {
      ...TEXT_BASE,
      color: Colors.disabledText,
      fontWeight: "700",
    },
    secondary: {
      ...TEXT_BASE,
      color: Colors.white,
      fontWeight: "700",
    },
    "secondary-disabled": {
      ...TEXT_BASE,
      color: Colors.white,
      fontWeight: "700",
    },
    accent: {
      ...TEXT_BASE,
      color: Colors.brandAccent,
      fontWeight: "700",
      paddingHorizontal: 21,
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
      fontWeight: "700",
    },
    link: {
      ...Fonts.textRegular,
      color: Colors.brandSecondary,
      fontWeight: "700",
    },
    subLink: {
      ...Fonts.textRegular,
      color: Colors.brandSecondary4,
      fontWeight: "400",
    },
    social: {
      ...TEXT_BASE,
      ...Fonts.textRegular,
      color: Colors.subText,
      fontWeight: "500",
    },
    icon: {},
    icon2: {
      position: "absolute",
    },
    "icon2-disabled": {
      position: "absolute",
    },
    socialIcon: {},
    card: {},
    listItem: {},
  });
  return {
    viewPresets,
    textPresets,
  };
};
