import { StyleSheet } from "react-native";
import { getResponsiveFontSize } from "../../utils";
import { ThemeCommonParams } from "../theme.type";

export type TextPresets = keyof ReturnType<typeof textPresets>;

export const textPresets = ({ FontSize, Fonts, Gutters, Colors }: ThemeCommonParams) => {
  const BASE = StyleSheet.flatten([
    {
      fontSize: getResponsiveFontSize(13),
      letterSpacing: 0.65,
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
      fontSize: getResponsiveFontSize(17),
      fontWeight: "600",
      color: Colors.brandSecondary,
    },
    bold: {
      ...BASE,
      color: Colors.text,
      fontWeight: "700",
    },
    text: {
      ...BASE,
      color: Colors.text,
      fontWeight: "400",
    },
    subText: {
      ...BASE,
      fontSize: getResponsiveFontSize(13),
      color: Colors.subText,
      fontWeight: "400",
    },
    textTiny: {
      ...BASE,
      fontWeight: "400",
      fontSize: getResponsiveFontSize(13),
      color: Colors.text,
    },
    textSmall: {
      ...BASE,
      fontWeight: "400",
      fontSize: getResponsiveFontSize(13),
      color: Colors.text,
    },
    textMedium: {
      ...BASE,
      fontWeight: "400",
      color: Colors.text,
    },
    textLarge: {
      ...BASE,
      fontWeight: "400",
      fontSize: getResponsiveFontSize(15),
      color: Colors.text,
    },
    social: {
      ...BASE,
      color: Colors.subText,
      fontWeight: "500",
    },
    pending: {
      ...BASE,
      fontWeight: "400",
      color: Colors.pending,
    },
    success: {
      ...BASE,
      fontWeight: "400",
      color: Colors.success,
    },
    failed: {
      ...BASE,
      fontWeight: "400",
      color: Colors.failed,
    },
    error: {
      ...BASE,
      fontSize: getResponsiveFontSize(13),
      alignSelf: "flex-start",
      textAlign: "right",
      color: Colors.failed,
      fontWeight: "400",
    },
    warning: {
      ...BASE,
      fontSize: getResponsiveFontSize(13),
      color: Colors.warning,
      fontWeight: "400",
    },
    link: {
      ...BASE,
      color: Colors.brandSecondary,
      fontWeight: "700",
    },
    subLink: {
      ...BASE,
      color: Colors.brandSecondary4,
      fontWeight: "400",
    },
    headerLink: {
      ...BASE,
      color: Colors.brandSecondary,
      fontWeight: "400",
    },
    titleSmall: {
      ...BASE,
      fontSize: getResponsiveFontSize(16),
      fontWeight: "600",
      color: Colors.black,
    },
    title: {
      ...BASE,
      fontSize: getResponsiveFontSize(18),
      fontWeight: "600",
      color: Colors.black,
    },
    titleLarge: {
      ...BASE,
      fontSize: getResponsiveFontSize(19),
      fontWeight: "600",
      color: Colors.black,
    },
    subTitle: {
      ...BASE,
      fontSize: getResponsiveFontSize(13),
      fontWeight: "400",
      color: Colors.subText,
    },
    errorMessage: {
      ...BASE,
      fontWeight: "400",
      fontSize: getResponsiveFontSize(13),
      color: Colors.failed,
    },
    warningMessage: {
      ...BASE,
      fontWeight: "400",
      fontSize: getResponsiveFontSize(13),
      color: Colors.warning,
    },
    successMessage: {
      ...BASE,
      fontWeight: "400",
      fontSize: getResponsiveFontSize(13),
      color: Colors.success,
    },
    fieldLabel: {
      ...BASE,
      fontSize: FontSize.normal,
      fontWeight: "700",
    },
    cardTitle: {
      fontSize: getResponsiveFontSize(13),
      color: Colors.text,
      fontWeight: "400",
    },
    cardSubtitle: {
      fontSize: getResponsiveFontSize(13),
      fontWeight: "400",
      color: Colors.subText,
    },
  });
};
