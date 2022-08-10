import { StyleSheet } from "react-native";

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
    },
  ]);

  const viewPresets = StyleSheet.create({
    none: {},
    primary: {
      ...VIEW_BASE,
      backgroundColor: Colors.brandSecondary1,
      //backgroundColor: "#C4EDDE",
      borderRadius: 25,
    },
    headerLink: {
      backgroundColor: Colors.backgroundOverlay,
      justifyContent: "center",
      alignItems: "center",
      height: 36,
      width: 36,
      borderRadius: 18,
      marginHorizontal: "10%",
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
      backgroundColor: Colors.white,
      // backgroundColor: Colors.brandAccent,
      flexDirection: "row",
      borderWidth: 2,
      borderColor: "#AEB2C2",
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
      paddingVertical: 10,
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
      color: Colors.brandSecondary6,
      fontWeight: "600",
    },
    headerLink: {
      // marginHorizontal: 5,
      // color: Colors.white,
      // fontWeight: "400"
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
      color: Colors.brandSecondary6,
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
      fontWeight: "bold",
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
