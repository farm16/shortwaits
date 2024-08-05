import { StyleSheet } from "react-native";

import { getResponsiveFontSize } from "../../utils";
import { ThemeCommonParams } from "../theme.type";

export type TextFieldPresets = keyof ReturnType<typeof textFieldPresets>;

export const textFieldPresets = ({ FontSize, Fonts, Gutters, Colors }: ThemeCommonParams) => {
  const BASE = StyleSheet.flatten([
    {
      ...Fonts.textRegular,
      letterSpacing: 0.6,
      lineHeight: 27,
      // textAlign: "center" as const,
      color: Colors.text,
    },
  ]);

  return StyleSheet.create({
    default: {
      ...BASE,
    },
    cardSubtitle: {
      fontSize: getResponsiveFontSize(13),
      color: Colors.subText,
      fontWeight: "400",
      letterSpacing: 0.65,
      paddingTop: 0,
      paddingLeft: 0,
      paddingBottom: 0,
      paddingRight: 0,
    },
    none: {},
  });
};
