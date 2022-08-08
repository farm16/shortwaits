import { ButtonViewType } from "@shortwaits/admin/theme/presets";
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { SvgProps } from "react-native-svg";
// import { TxKeyPath } from "../../i18n";

export interface ButtonProps extends TouchableOpacityProps {
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

  icon?: React.ComponentType<SvgProps>;

  iconSize?: number;

  state?: "loading" | "disabled" | "enabled";
}
