import React, { FC } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Button, ButtonProps, Spinner, Text } from "../common";
import { useTheme } from "../../theme";
import { ThemeColorName, ThemeColors } from "../../theme/Colors";

const disabledStates = ["loading", "disabled", "enable"];

export const BackButton: FC<ButtonProps> = (props) => (
  <Button {...props} preset="icon">
    <Icon
      name="chevron-left"
      color={useTheme().Colors.brandSecondary}
      size={30}
    />
  </Button>
);

export const ForwardButton: FC<ButtonProps> = (props) => (
  <Button {...props} preset="icon">
    <Icon name="chevron-right" color={useTheme().Colors.text} size={30} />
  </Button>
);

export const CloseButton: FC<ButtonProps> = (props) => (
  <Button {...props} preset="headerLink">
    <Icon name="close" color={useTheme().Colors.brandSecondary} size={22} />
  </Button>
);

export const TextHeaderButton: FC<ButtonProps> = (props) => {
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
  return (
    <Button {...rest} text={text} textStyle={textStyleOverride} preset="link" />
  );
};

export const RightArrowButton: FC<ButtonProps> = (props) => {
  const {
    Colors: { brandSecondary, inputBackground },
  } = useTheme();
  const { state = "enable", ...rest } = props;
  return (
    <Button {...rest} preset="headerLink">
      <Icon
        name="arrow-right-bold"
        color={
          disabledStates.includes(state) ? inputBackground : brandSecondary
        }
        size={22}
      />
    </Button>
  );
};

export const LeftArrowButton: FC<ButtonProps> = (props) => {
  const { Colors } = useTheme();
  const { state = "enable", ...rest } = props;

  const stateIcons = {
    disabled: { name: "exclamation-thick", color: "darkGray" },
    enable: { name: "chevron-right", color: "brandSecondary" },
  };
  if (state === "loading") return <Spinner />;
  return (
    <Button {...rest} preset="headerLink">
      <Icon
        name={stateIcons[state].name}
        color={Colors[stateIcons[state].color]}
        size={22}
      />
    </Button>
  );
};

export const RightChevronButton: FC<ButtonProps> = (props) => {
  const { Colors } = useTheme();
  const { state = "enabled", ...rest } = props;
  const stateIcons = {
    disabled: { name: "chevron-right", color: "lightGray", size: 35 },
    enabled: { name: "chevron-right", color: "brandSecondary", size: 35 },
  };
  if (state === "loading") return <Spinner />;
  return (
    <Button {...rest} state={state} preset="icon">
      <Icon
        name={stateIcons[state].name}
        color={Colors[stateIcons[state].color]}
        size={stateIcons[state].size}
      />
    </Button>
  );
};
export const LeftChevronButton: FC<ButtonProps> = (props) => {
  const {
    Colors: { brandSecondary, backgroundOverlay },
  } = useTheme();
  const { state = "enabled", ...rest } = props;
  return (
    <Button {...rest} state={state} preset="icon">
      <Icon
        name="chevron-left"
        color={
          disabledStates.includes(state) ? backgroundOverlay : brandSecondary
        }
        size={35}
      />
    </Button>
  );
};

const _circleIcons = {
  check: {
    name: "check",
    color: "brandSecondary",
    backgroundColor: "lightGray",
    size: 26,
  },
  cancel: {
    name: "close",
    color: "red3",
    backgroundColor: "lightGray",
    size: 26,
  },
  business: {
    name: "store",
    color: "brandSecondary",
    backgroundColor: "lightGray",
    size: 20,
  },
  "business-settings": {
    name: "store-cog",
    color: "brandSecondary",
    backgroundColor: "lightGray",
    size: 20,
  },
  save: {
    name: "content-save-outline",
    color: "brandSecondary",
    backgroundColor: "lightGray",
    size: 26,
  },
  "open-business": {
    name: "door-open",
    color: "brandSecondary",
    backgroundColor: "lightGray",
    size: 22,
  },
  "closed-business": {
    name: "door-closed-lock",
    backgroundColor: "red1",
    color: "brandPrimary",
    size: 20,
  },
  "account-cancel": {
    name: "account-cancel",
    color: "brandSecondary",
    backgroundColor: "lightGray",
    size: 24,
  },
  "add-categories": {
    name: "plus",
    backgroundColor: "lightGray",
    color: "brandSecondary",
    size: 24,
  },
  "add-currency": {
    name: "plus",
    backgroundColor: "lightGray",
    color: "brandSecondary",
    size: 24,
  },
  "add-staff": {
    name: "account-tie",
    backgroundColor: "lightGray",
    color: "brandSecondary",
    size: 21,
  },
  "add-services": {
    name: "text-box-plus",
    backgroundColor: "lightGray",
    color: "brandSecondary",
    size: 26,
  },
  "add-image": {
    name: "camera-plus",
    backgroundColor: "lightGray",
    color: "brandSecondary",
    size: 24,
  },
  more: {
    name: "camera-plus",
    backgroundColor: "lightGray",
    color: "brandSecondary",
    size: 24,
  },
  add: {
    name: "plus",
    backgroundColor: "lightGray",
    color: "brandSecondary",
    size: 24,
  },
  default: {
    name: "plus",
    backgroundColor: "lightGray",
    color: "brandSecondary",
    size: 24,
  },
} as const;
type CircleIconsKeys = keyof typeof _circleIcons;
type CircleIconsValues = {
  name: string;
  color: ThemeColorName;
  backgroundColor: ThemeColorName;
  size: number;
};
const circleIcons = _circleIcons as unknown as Record<
  CircleIconsKeys,
  CircleIconsValues
>;

export const CircleIconButton: FC<
  ButtonProps & {
    noMargin?: boolean;
    iconType: CircleIconsKeys;
    iconSize?: number;
    marginLeft?: boolean;
    marginRight?: boolean;
  }
> = (props) => {
  const { Colors } = useTheme();

  const {
    state = "enabled",
    iconSize = 22,
    iconType = "default",
    style: styleOverride,
    text,
    textStyle,
    marginRight,
    marginLeft,
    ...rest
  } = props;

  const style: StyleProp<ViewStyle> = {
    backgroundColor: Colors[circleIcons[iconType].backgroundColor ?? "text"],
    width: circleIcons[iconType].size + 10,
    height: circleIcons[iconType].size + 10,
    borderRadius: (circleIcons[iconType].size + 10) / 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: marginLeft ? 15 : undefined,
    marginRight: marginRight ? 15 : undefined,
  };

  return (
    <Button
      preset="none"
      {...rest}
      style={[style, styleOverride]}
      state={state}
    >
      {text ? (
        <Text
          preset="none"
          style={[
            { color: Colors.brandSecondary7, fontWeight: "600" },
            textStyle,
          ]}
          text={text}
        />
      ) : (
        <Icon
          name={
            circleIcons[iconType]
              ? circleIcons[iconType].name
              : circleIcons.default.name
          }
          color={
            disabledStates.includes(state)
              ? Colors.gray
              : Colors[circleIcons[iconType]["color"]]
          }
          size={circleIcons[iconType].size || iconSize}
        />
      )}
    </Button>
  );
};
export const SubmitHeaderIconButton: FC<ButtonProps> = (props) => {
  const {
    Colors: { brandSecondary, gray },
  } = useTheme();
  return (
    <Button preset="headerLink" {...props}>
      <Icon
        name="send"
        color={props.disabled ? gray : brandSecondary}
        size={20}
      />
    </Button>
  );
};
export const CancelAndLogOutHeaderButton: FC<ButtonProps> = (props) => {
  const {
    Colors: { brandSecondary, gray },
  } = useTheme();
  return (
    <Button {...props} preset="headerLink">
      <Icon
        name="account-cancel"
        color={props.disabled ? gray : brandSecondary}
        size={22}
      />
    </Button>
  );
};

export const MultipleHeaderButtons: FC = ({ children }) => {
  return <View style={{ flexDirection: "row" }}>{children}</View>;
};
