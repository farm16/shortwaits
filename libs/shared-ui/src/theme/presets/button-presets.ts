import { StyleSheet, ViewStyle } from "react-native";
import { getResponsiveFontSize, getResponsiveHeight, getResponsiveWidth } from "../../utils";
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
      height: getResponsiveHeight(47),
      backgroundColor: Colors.brandPrimary,
      flexDirection: "row",
      borderRadius: getResponsiveHeight(25),
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
      borderRightColor: Colors.gray,
      borderBottomColor: Colors.gray,
      borderBottomWidth: 3,
      borderRightWidth: 3,
      paddingHorizontal: getResponsiveWidth(20),
      justifyContent: "center",
    },
    primary2: {
      ...VIEW_BASE,
      backgroundColor: Colors.brandSecondary,
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
      backgroundColor: Colors.brandSecondary,
      borderRightColor: Colors.brandAccent,
      borderBottomColor: Colors.brandAccent,
      borderBottomWidth: 3,
      borderRightWidth: 3,
      paddingHorizontal: getResponsiveWidth(20),
      justifyContent: "center",
    },
    "secondary-disabled": {
      ...VIEW_BASE,
      backgroundColor: Colors.disabledBackground,
      borderRightColor: Colors.gray,
      borderBottomColor: Colors.gray,
      borderBottomWidth: 3,
      borderRightWidth: 3,
      paddingHorizontal: getResponsiveWidth(20),
      justifyContent: "center",
    },
    secondary2: {
      ...VIEW_BASE,
      justifyContent: "center",
      alignSelf: "center",
      backgroundColor: Colors.brandSecondary,
    },
    "secondary2-disabled": {
      ...VIEW_BASE,
      backgroundColor: Colors.gray,
      width: undefined,
      flex: 1,
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
    textLinkLarge: {
      borderBottomColor: Colors.black,
      borderBottomWidth: 1,
      alignSelf: "flex-start",
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
      borderRadius: 8,
      backgroundColor: Colors.lightBackground,
      justifyContent: "center",
      alignItems: "center",
    },
    "icon2-disabled": {
      height: 45,
      width: 45,
      borderRadius: 8,
      backgroundColor: Colors.lightBackground,
      justifyContent: "center",
      alignItems: "center",
    },
    "icon-wrapper": {
      justifyContent: "center",
      alignItems: "center",
    },
    outline: {
      ...VIEW_BASE,
      borderRadius: 25,
      backgroundColor: Colors.transparent,
      borderWidth: 2.5,
      justifyContent: "center",
      alignItems: "center",
      borderColor: Colors.brandPrimary,
    },
    "outline-secondary": {
      ...VIEW_BASE,
      borderRadius: 25,
      backgroundColor: Colors.transparent,
      borderWidth: 2.5,
      justifyContent: "center",
      alignItems: "center",
      borderColor: Colors.brandSecondary,
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
      height: 50,
      width: 50,
      padding: 8,
      borderRadius: 25,
      backgroundColor: Colors.lightBackground,
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
    "client-tab-disabled": {
      ...VIEW_BASE,
      backgroundColor: undefined,
      paddingHorizontal: getResponsiveWidth(20),
      justifyContent: "center",
    },
    "client-tab": {
      ...VIEW_BASE,
      backgroundColor: undefined,
      paddingHorizontal: getResponsiveWidth(20),
      justifyContent: "center",
    },
  });
  const TEXT_BASE = StyleSheet.flatten([
    {
      fontSize: getResponsiveHeight(16),
      fontWeight: "400",
    },
  ]);
  const textPresets = StyleSheet.create({
    none: {},
    primary: {
      ...TEXT_BASE,
      fontSize: getResponsiveHeight(16),
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
    secondary2: {
      ...TEXT_BASE,
      color: Colors.white,
      fontWeight: "700",
    },
    "secondary2-disabled": {
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
      fontSize: getResponsiveHeight(16),
      fontWeight: "700",
      color: Colors.brandPrimary,
    },
    "outline-secondary": {
      fontSize: getResponsiveHeight(16),
      fontWeight: "700",
      color: Colors.brandSecondary,
    },
    flat: {
      ...TEXT_BASE,
      color: Colors.darkGray,
      fontWeight: "700",
    },
    link: {
      ...Fonts.textRegular,
      color: Colors.brandAccent,
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
    "client-tab-disabled": {
      ...TEXT_BASE,
      fontSize: getResponsiveHeight(20),
      color: Colors.black4,
      fontWeight: "700",
    },
    "client-tab": {
      ...TEXT_BASE,
      fontSize: getResponsiveHeight(20),
      color: Colors.black,
      fontWeight: "700",
    },
    textLinkLarge: {
      letterSpacing: 0.65,
      fontWeight: "700",
      fontSize: getResponsiveFontSize(15),
      color: Colors.black,
    },
  });
  return {
    viewPresets,
    textPresets,
  };
};
