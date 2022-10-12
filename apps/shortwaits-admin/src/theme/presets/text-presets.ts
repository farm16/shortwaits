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
      // lineHeight: 27,
      textAlign: "left" as const,
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
    pending: {
      ...Fonts.textTiny,
      fontWeight: "400",
      // textTransform: "uppercase",
      color: Colors.pending,
    },
    success: {
      ...Fonts.textTiny,
      fontWeight: "400",
      // textTransform: "uppercase",
      color: Colors.success,
    },
    failed: {
      ...Fonts.textTiny,
      fontWeight: "400",
      // textTransform: "uppercase",
      color: Colors.failed,
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
      textAlign: "left",
      ...Fonts.titleSmall,
      color: Colors.text,
      fontWeight: "500" as const,
      letterSpacing: 0.65,
    },
    textTiny: {
      ...BASE,
      ...Fonts.textTiny,
    },
    textSmall: {
      ...BASE,
      ...Fonts.textSmall,
    },
    text: {
      ...BASE,
      ...Fonts.textRegular,
    },
    textLarge: {
      ...BASE,
      ...Fonts.textLarge,
    },
    errorMessage: {
      ...Fonts.textTiny,
      color: Colors.failed,
    },
    fieldLabel: {
      ...BASE,
      fontSize: FontSize.regular * 2,
      fontWeight: "bold",
    },
    cardTitle: {
      ...Fonts.textSmall,
      color: Colors.text,
      fontWeight: "500" as const,
      letterSpacing: 0.65,
    },
    cardSubtitle: {
      ...Fonts.textSmall,
      fontWeight: "400" as const,
      // paddingTop: 0,
      // marginTop: 0,
      letterSpacing: 0.65,
      color: Colors.subText,
    },
    headerTitle: {
      fontSize: 16,
      color: Colors.text,
      letterSpacing: 0.65,
      fontWeight: "500" as const,
    },
  });
};
