import { FC } from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeColorName, useTheme } from "../../theme";
import { getResponsiveHeight } from "../../utils";
import { Button, ButtonProps, Text } from "../common";
import { IconProps, iconProps } from "./icon-presets";

export const ForwardButton: FC<ButtonProps> = props => (
  <Button {...props} preset="icon">
    <Icon name="chevron-right" color={useTheme().Colors.text} size={30} />
  </Button>
);

export const CloseButton: FC<ButtonProps> = props => (
  <Button {...props} preset="headerLink">
    <Icon name="close" color={useTheme().Colors.brandSecondary} size={22} />
  </Button>
);

export const TextHeaderButton: FC<ButtonProps> = props => {
  const { disabled, text, textStyle, ...rest } = props;
  const {
    Colors: { brandPrimary6 },
  } = useTheme();

  const textStyleOverride = [
    {
      marginRight: 15,
      fontWeight: "600" as const,
      color: brandPrimary6,
    },
    textStyle,
  ];
  return <Button {...rest} text={text} textStyle={textStyleOverride} preset="link" />;
};

export const RightArrowButton: FC<ButtonProps> = props => {
  const {
    Colors: { brandSecondary },
  } = useTheme();
  return (
    <Button {...props} preset="headerLink">
      <Icon name="arrow-right-bold" color={brandSecondary} size={22} />
    </Button>
  );
};

export const LeftArrowButton: FC<ButtonProps> = props => {
  const { Colors } = useTheme();
  return (
    <Button {...props} preset="headerLink">
      <Icon name={"chevron-right"} color={Colors["brandSecondary"]} size={22} />
    </Button>
  );
};

export const RightChevronButton: FC<ButtonProps> = props => {
  const { Colors } = useTheme();
  return (
    <Button {...props} preset="icon">
      <Icon name={"chevron-right"} color={Colors["brandSecondary"]} size={35} />
    </Button>
  );
};

export const BackButton: FC<
  ButtonProps & {
    counter?: string;
    iconColor?: string;
  }
> = props => {
  const { iconColor, style: styleOverride, ...rest } = props;
  const {
    Colors: { brandSecondary },
  } = useTheme();

  const color = iconColor ? iconColor : brandSecondary;
  const style = { marginLeft: 16 };
  const size = Platform.OS === "ios" ? 37 : 24;

  return (
    <Button {...rest} preset="icon-wrapper" style={[style, styleOverride]}>
      <Icon name={Platform.OS === "ios" ? "chevron-left" : "arrow-left"} color={color} size={size} />
      {props.counter ? (
        <Text
          preset="none"
          style={{
            color: brandSecondary,
            fontWeight: "600",
            padding: 0,
            marginTop: -2,
            marginLeft: -4,
            fontSize: 18,
          }}
          text={props.counter}
        />
      ) : null}
    </Button>
  );
};

interface IconButtonProps extends ButtonProps {
  iconType: IconProps;
  backgroundColor?: ThemeColorName;
  iconColor?: ThemeColorName;
  iconSize?: number;
  disabledAlertMessage?: string;
  withMarginLeft?: boolean;
  withMarginRight?: boolean;
  onPress?(): void;
}

export const IconButton: FC<IconButtonProps> = props => {
  const {
    iconSize: iconSizeOverride,
    iconType = "default",
    style: styleOverride,
    iconColor: iconColorOverride,
    text,
    textStyle,
    withMarginRight,
    withMarginLeft,
    disabled: disabledOverride,
    onPress,
    ...rest
  } = props;

  const { Colors } = useTheme();
  const backgroundColor = props.backgroundColor ?? (Colors.white as ThemeColorName);

  const style: StyleProp<ViewStyle> = {
    backgroundColor: Colors[(iconProps[iconType]?.backgroundColor as ThemeColorName) ?? backgroundColor],
    marginLeft: withMarginLeft ? getResponsiveHeight(16) : undefined,
    marginRight: withMarginRight ? getResponsiveHeight(16) : undefined,
  };

  const disabled = disabledOverride;
  const iconColorWithDisabled = disabled ? "disabledText" : iconProps[iconType]?.color;
  const iconColor = iconColorOverride || iconColorWithDisabled || "brandSecondary";
  const iconSize = iconSizeOverride || iconProps[iconType]?.size || 22;
  const iconName = iconProps[iconType]?.name || "plus";

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Button preset="icon-wrapper" {...rest} onPress={handlePress} disabled={disabled} style={[style, styleOverride]}>
      <Icon name={iconName} color={Colors[iconColor]} size={getResponsiveHeight(iconSize)} />
    </Button>
  );
};

export const SubmitHeaderIconButton: FC<ButtonProps> = props => {
  const {
    Colors: { brandSecondary, gray },
  } = useTheme();
  return (
    <Button preset="headerLink" {...props}>
      <Icon name="send" color={props.disabled ? gray : brandSecondary} size={20} />
    </Button>
  );
};
export const CancelAndLogOutHeaderButton: FC<ButtonProps> = props => {
  const {
    Colors: { brandSecondary, gray },
  } = useTheme();
  return (
    <Button {...props} preset="headerLink">
      <Icon name="account-cancel" color={props.disabled ? gray : brandSecondary} size={22} />
    </Button>
  );
};

export const MultipleHeaderButtons = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <View style={{ flexDirection: "row" }}>{children}</View>;
};
