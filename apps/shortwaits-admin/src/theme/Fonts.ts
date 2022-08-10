/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from "react-native";
import { ThemeVariables, ThemeFonts } from "./theme.type";

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
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
