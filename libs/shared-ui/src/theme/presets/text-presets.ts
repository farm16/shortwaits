import { StyleSheet } from "react-native";

import { getResponsiveFontSize } from "../../utils";
import { ThemeCommonParams } from "../theme.type";

export type TextPresets = keyof ReturnType<typeof textPresets>;

export const textPresets = ({ FontSize, Fonts, Gutters, Colors }: ThemeCommonParams) => {
  const BASE = StyleSheet.flatten([
    {
      ...Fonts.textRegular,
      letterSpacing: 0.6,
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
      fontWeight: "600",
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
      color: Colors.subText,
      fontWeight: "500",
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
      fontSize: getResponsiveFontSize(14),
      alignSelf: "flex-start",
      textAlign: "right",
      color: Colors.failed,
      fontWeight: "400" as const,
      letterSpacing: 0.65,
    },
    warning: {
      fontSize: getResponsiveFontSize(14),
      // alignSelf: "flex-start",
      // textAlign: "right",
      color: Colors.warning,
      fontWeight: "400" as const,
      letterSpacing: 0.65,
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
    headerLink: {
      ...BASE,
      ...Fonts.textRegular,
      color: Colors.brandSecondary,
      fontWeight: "400" as const,
      // fontWeight: "",
    },
    title: {
      fontSize: getResponsiveFontSize(17),
      fontWeight: "600",
      color: Colors.text,
      letterSpacing: 0.65,
    },
    title2: {
      fontSize: getResponsiveFontSize(17),
      fontWeight: "600",
      color: Colors.text,
      letterSpacing: 0.65,
    },
    title3: {
      fontSize: getResponsiveFontSize(17),
      fontWeight: "600",
      color: Colors.text,
      letterSpacing: 0.65,
    },
    titleSmall: {
      fontSize: getResponsiveFontSize(17),
      fontWeight: "600",
      color: Colors.text,
      letterSpacing: 0.65,
    },
    titleMedium: {
      fontSize: getResponsiveFontSize(18),
      fontWeight: "600",
      color: Colors.text,
      letterSpacing: 0.65,
    },
    titleLarge: {
      fontSize: getResponsiveFontSize(19),
      fontWeight: "600",
      color: Colors.text,
      letterSpacing: 0.65,
    },
    textTiny: {
      fontWeight: "400",
      fontSize: getResponsiveFontSize(13),
      color: Colors.text,
      letterSpacing: 0.65,
    },
    textSmall: {
      fontWeight: "400",
      fontSize: getResponsiveFontSize(14),
      color: Colors.text,
      letterSpacing: 0.65,
    },
    textMedium: {
      fontWeight: "400",
      fontSize: getResponsiveFontSize(16),
      color: Colors.text,
      letterSpacing: 0.65,
    },
    textLarge: {
      fontWeight: "400",
      fontSize: getResponsiveFontSize(15),
      color: Colors.text,
      letterSpacing: 0.65,
    },
    errorMessage: {
      fontWeight: "400",
      fontSize: getResponsiveFontSize(14),
      color: Colors.failed,
      letterSpacing: 0.65,
    },
    warningMessage: {
      fontWeight: "400",
      fontSize: getResponsiveFontSize(14),
      color: Colors.warning,
      letterSpacing: 0.65,
    },
    successMessage: {
      fontWeight: "400",
      fontSize: getResponsiveFontSize(14),
      color: Colors.success,
      letterSpacing: 0.65,
    },
    fieldLabel: {
      ...BASE,
      fontSize: FontSize.regular,
      fontWeight: "700",
    },
    cardTitle: {
      fontSize: getResponsiveFontSize(14),
      color: Colors.text,
      fontWeight: "400" as const,
      // letterSpacing: 0.65,
    },
    cardSubtitle: {
      fontSize: getResponsiveFontSize(14),
      fontWeight: "400" as const,
      // letterSpacing: 0.65,
      color: Colors.subText,
    },
  });
};
