import { IconProps as RNVectorIconProps } from "react-native-vector-icons/Icon";
import RNVectorIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomIconTypes } from "./icons";

export interface IconProps extends RNVectorIconProps {
  customName?: CustomIconTypes;
}

export function Icon(props: IconProps) {
  const { ...rest } = props;

  return <RNVectorIcon {...rest} />;
}
