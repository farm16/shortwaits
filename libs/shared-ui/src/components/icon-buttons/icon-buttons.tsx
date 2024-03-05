import React, { FC } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeColorName, useTheme } from "../../theme";
import { Button, ButtonProps, Spinner, Text } from "../common";
import { IconProps, iconProps } from "./icon-presets";

const disabledStates = ["loading", "disabled"];

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
    Colors: { brandSecondary, inputBackground },
  } = useTheme();
  const { state = "enable", ...rest } = props;
  return (
    <Button {...rest} preset="headerLink">
      <Icon name="arrow-right-bold" color={disabledStates.includes(state) ? inputBackground : brandSecondary} size={22} />
    </Button>
  );
};

export const LeftArrowButton: FC<ButtonProps> = props => {
  const { Colors } = useTheme();
  const { state = "enable", ...rest } = props;

  const stateIcons = {
    disabled: { name: "exclamation-thick", color: "darkGray" },
    enable: { name: "chevron-right", color: "brandSecondary" },
  };
  if (state === "loading") return <Spinner />;
  return (
    <Button {...rest} preset="headerLink">
      <Icon name={stateIcons[state].name} color={Colors[stateIcons[state].color]} size={22} />
    </Button>
  );
};

export const RightChevronButton: FC<ButtonProps> = props => {
  const { Colors } = useTheme();
  const { state = "enabled", ...rest } = props;
  const stateIcons = {
    disabled: { name: "chevron-right", color: "lightGray", size: 35 },
    enabled: { name: "chevron-right", color: "brandSecondary", size: 35 },
  };
  if (state === "loading") return <Spinner />;
  return (
    <Button {...rest} state={state} preset="icon">
      <Icon name={stateIcons[state].name} color={Colors[stateIcons[state].color]} size={stateIcons[state].size} />
    </Button>
  );
};
export const BackButton: FC<
  ButtonProps & {
    counter?: string;
  }
> = props => {
  const {
    Colors: { brandAccent, brandSecondary, lightBackground },
  } = useTheme();
  const { state = "enabled", ...rest } = props;
  return (
    <Button
      state={state}
      preset="none"
      style={{
        marginLeft: 16,
        flexDirection: "row",
        alignItems: "center",
      }}
      {...rest}
    >
      <Icon name="chevron-left" color={disabledStates.includes(state) ? lightBackground : brandSecondary} size={35} />
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

export const IconButton: FC<
  ButtonProps & {
    iconType: IconProps;
    backgroundColor?: ThemeColorName;
    iconColor?: ThemeColorName;
    iconSize?: number;
    withDisabledAlertMessage?: string;
    withMarginLeft?: boolean;
    withMarginRight?: boolean;
  }
> = props => {
  const {
    state = "enabled",
    iconSize: iconSizeOverride,
    iconType = "default",
    style: styleOverride,
    iconColor: iconColorOverride,
    text,
    textStyle,
    withMarginRight,
    withMarginLeft,
    disabled: disabledOverride,
    ...rest
  } = props;

  const { Colors } = useTheme();

  const backgroundColor = props.backgroundColor ?? (Colors.white as ThemeColorName);
  const style: StyleProp<ViewStyle> = {
    backgroundColor: Colors[(iconProps[iconType]?.backgroundColor as ThemeColorName) ?? backgroundColor],
    width: iconProps[iconType]?.size,
    height: iconProps[iconType]?.size,
    borderRadius: iconProps[iconType]?.size / 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: withMarginLeft ? 16 : undefined,
    marginRight: withMarginRight ? 16 : undefined,
  };

  const handleDisabledAlert = () => {
    alert(props.withDisabledAlertMessage ?? "button is disabled");
  };

  const hasOnPress = !props.onPress;
  const disabled = disabledOverride || hasOnPress || state === "disabled";
  const isDisabled = props.withDisabledAlertMessage ? false : disabled;
  const onPress = props.withDisabledAlertMessage ? handleDisabledAlert : props.onPress;

  const iconColor = iconColorOverride || iconProps[iconType]?.color || "brandSecondary";
  const iconSize = iconSizeOverride || iconProps[iconType]?.size || 22;
  const iconName = iconProps[iconType]?.name || "plus";

  return (
    <Button preset="none" {...rest} onPress={onPress} disabled={isDisabled} style={[style, styleOverride]} state={state}>
      <Icon name={iconName} color={Colors[iconColor]} size={iconSize} />
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

export const MultipleHeaderButtons = ({ children }) => {
  return <View style={{ flexDirection: "row" }}>{children}</View>;
};
