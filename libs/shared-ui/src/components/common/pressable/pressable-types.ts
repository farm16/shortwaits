import { StyleProp, TextStyle, PressableProps as PressablePropsRN, ViewStyle } from "react-native";

import { ButtonViewType } from "../../../theme/presets";
// import { TxKeyPath } from "../../i18n";

export interface PressableProps extends PressablePropsRN {
  isLoading?: boolean;

  withShadow?: boolean;
  /**
   * Text which is looked up via i18n.
   */
  iText?: string;
  //iText?: TxKeyPath;

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * One of the different types of text presets.
   */
  preset?: keyof ButtonViewType;

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode;

  rightIconName?: string;
  rightIconSize?: number | string;
  rightIconColor?: string;
  leftIconName?: string;
  leftIconSize?: number;
  leftIconColor?: string;
  iconSize?: number;

  state?: "loading" | "disabled" | "enabled";
}
