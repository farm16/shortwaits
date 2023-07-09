import { StyleSheet } from "react-native";

import { ThemeCommonParams } from "../theme.type";
import { getDimensions } from "../utils";

export type TextFieldPresets = keyof ReturnType<typeof textFieldPresets>;

export const textFieldPresets = ({
  FontSize,
  Fonts,
  Gutters,
  Colors,
}: ThemeCommonParams) => {
  const { width } = getDimensions();

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
    cardSubtitle: {
      ...Fonts.textSmall,
      fontWeight: "400" as const,
      paddingTop: 0,
      marginTop: 0,
      letterSpacing: 0.65,
      color: Colors.text,
    },
    none: {},
  });
};
