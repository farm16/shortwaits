import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";

import { TextFieldPresets } from "../../../theme/presets";

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  iPlaceholder?: string;
  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string;
  /**
   * The label i18n key.
   */
  iLabel?: string;
  /**
   * The label text if no labelTx is provided.
   */
  label?: string;
  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>;
  /**
   * Various look & feels.
   */
  preset?: TextFieldPresets;

  errors?: string | undefined;
}
