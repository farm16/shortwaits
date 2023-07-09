import { StyleSheet } from "react-native";
/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { buttonPresets, textFieldPresets, textPresets } from "./presets";
import { ThemeCommonParams } from "./theme.type";

export default function ({ Colors, ...args }: ThemeCommonParams) {
  return {
    buttonTextPresets: buttonPresets({ Colors, ...args }).textPresets,
    buttonViewPresets: buttonPresets({ Colors, ...args }).viewPresets,
    textPresets: textPresets({ Colors, ...args }),
    textFieldPresets: textFieldPresets({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.brandPrimary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        borderWidth: 1,
        borderColor: Colors.text,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        minHeight: 50,
        textAlign: "center",
        // marginTop: 10,
        // marginBottom: 10
      },
    }),
  };
}
