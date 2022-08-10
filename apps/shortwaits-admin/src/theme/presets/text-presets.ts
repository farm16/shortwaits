import { StyleSheet } from "react-native";

import { ThemeCommonParams } from "../theme.type";

export type TextPresets = keyof ReturnType<typeof textPresets>;

export const textPresets = ({
  FontSize,
  Fonts,
  Gutters,
  Colors,
}: ThemeCommonParams) => {
  const BASE = StyleSheet.flatten([
    {
      ...Fonts.textRegular,
      letterSpacing: 0.6,
      lineHeight: 27,
      textAlign: "center" as const,
      color: Colors.text,
    },
  ]);

  return StyleSheet.create({
    default: {
      ...BASE,
    },
    none: {},
    bold: {
      ...BASE,
      fontWeight: "bold",
    },
    link: {
      ...BASE,
      ...Fonts.textSmall,
      ...Gutters.smallVPadding,
      color: Colors.brandSecondary,
    },
    subLink: {
      ...BASE,
      ...Fonts.textSmall,
      color: Colors.brandAccent,
      fontWeight: "400",
    },
    headerLink: {
      ...BASE,
      ...Fonts.textRegular,
      fontWeight: "bold",
    },
    title1: {
      ...BASE,
      ...Fonts.titleLarge,
      // ...Gutters.largeVPadding
    },
    title2: {
      ...BASE,
      ...Fonts.titleRegular,
      // ...Gutters.largeVPadding
    },
    title3: {
      ...BASE,
      ...Fonts.titleSmall,
      // ...Gutters.largeVPadding
    },
    text1: {
      ...BASE,
      ...Fonts.textLarge,
    },
    text2: {
      ...BASE,
      ...Fonts.textRegular,
    },
    text3: {
      ...BASE,
      ...Fonts.textSmall,
    },
    errorMessage: {
      ...Fonts.textTiny,
      color: Colors.red3,
    },
    fieldLabel: {
      ...BASE,
      fontSize: FontSize.regular * 2,
      fontWeight: "bold",
    },
    cardTitle: {
      ...Fonts.textSmall,
      color: Colors.darkText,
      fontWeight: "500" as const,
      marginBottom: 10,
      letterSpacing: 0.65,
    },
    cardSubtitle: {
      ...Fonts.textSmall,
      fontWeight: "400" as const,
      paddingTop: 0,
      marginTop: 0,
      letterSpacing: 0.65,
      color: Colors.lightGray,
    },
    headerTitle: {
      fontSize: 18,
      color: Colors.white,
      letterSpacing: 0.65,
      fontWeight: "bold",
    },
  });
};
