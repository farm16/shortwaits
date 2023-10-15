import { StyleSheet } from "react-native";

import { ThemeCommonParams } from "../theme.type";

export type TextPresets = keyof ReturnType<typeof textPresets>;

export const textPresets = ({ FontSize, Fonts, Gutters, Colors }: ThemeCommonParams) => {
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
    headerTitle: {
      ...BASE,
      ...Fonts.textRegular,
      color: Colors.text,
      fontWeight: "400",
    },
    bold: {
      ...BASE,
      ...Fonts.textRegular,
      color: Colors.text,
      fontWeight: "700",
    },
    text: {
      ...BASE,
      ...Fonts.textRegular,
      color: Colors.text,
      fontWeight: "400",
    },
    subText: {
      ...BASE,
      ...Fonts.textRegular,
      color: Colors.subText,
      fontWeight: "400",
    },
    social: {
      ...BASE,
      ...Fonts.textRegular,
      color: Colors.darkGray,
      fontWeight: "700",
    },
    pending: {
      ...Fonts.textRegular,
      fontWeight: "400",
      color: Colors.pending,
    },
    success: {
      ...Fonts.textRegular,
      fontWeight: "400",
      color: Colors.success,
    },
    failed: {
      ...Fonts.textRegular,
      fontWeight: "400",
      color: Colors.failed,
    },
    error: {
      ...Fonts.textSmall,
      alignSelf: "flex-start",
      textAlign: "right",
      color: Colors.red3,
      fontWeight: "400" as const,
      letterSpacing: 0.65,
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
      color: Colors.brandSecondary6,
      fontWeight: "400",
    },
    headerLink: {
      ...BASE,
      ...Fonts.textRegular,
      color: Colors.brandSecondary,
      fontWeight: "400" as const,
      // fontWeight: "",
    },
    title: {
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
      fontWeight: "400" as const,
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
      fontSize: FontSize.regular,
      fontWeight: "700",
    },
    cardTitle: {
      ...Fonts.textSmall,
      color: Colors.text,
      fontWeight: "400" as const,
      // letterSpacing: 0.65,
    },
    cardSubtitle: {
      ...Fonts.textSmall,
      fontWeight: "400" as const,
      // letterSpacing: 0.65,
      color: Colors.subText,
    },
  });
};
