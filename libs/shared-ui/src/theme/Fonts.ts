/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from "react-native";
import { ThemeFonts, ThemeVariables } from "./theme.type";

export default function ({ FontSize, Colors }: ThemeVariables): ThemeFonts {
  return StyleSheet.create({
    textTiny: {
      fontSize: FontSize.tiny,
      color: Colors.text,
    },
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.text,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.text,
    },
    titleSmall: {
      fontSize: FontSize.small * 1.5,
      fontWeight: "600",
      color: Colors.text,
    },
    titleRegular: {
      fontSize: FontSize.regular * 1.5,
      fontWeight: "600",
      color: Colors.text,
    },
    titleLarge: {
      fontSize: FontSize.large * 1.5,
      fontWeight: "600",
      color: Colors.text,
    },
    // textCenter: {
    //   textAlign: "center"
    // },
    // textJustify: {
    //   textAlign: "justify"
    // },
    // textLeft: {
    //   textAlign: "left"
    // },
    // textRight: {
    //   textAlign: "right"
    // }
  });
}
