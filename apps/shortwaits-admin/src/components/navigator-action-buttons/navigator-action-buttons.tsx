import React, { FC } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Button, ButtonProps, Spinner } from "../common";
import { useTheme } from "../../theme";

const disabledStates = ["loading", "disabled", "enable"];

export const BackButton: FC<ButtonProps> = (props) => (
  <Button {...props} preset="icon">
    <Icon
      name="chevron-left"
      color={useTheme().Colors.brandSecondary6}
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
    <Icon name="close" color={useTheme().Colors.brandSecondary6} size={22} />
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
    Colors: { brandSecondary6, inputBackground },
  } = useTheme();
  const { state = "enable", ...rest } = props;
  return (
    <Button {...rest} preset="headerLink">
      <Icon
        name="arrow-right-bold"
        color={
          disabledStates.includes(state) ? inputBackground : brandSecondary6
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
    enable: { name: "chevron-right", color: "brandSecondary6" },
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
    enabled: { name: "chevron-right", color: "brandSecondary6", size: 35 },
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
    Colors: { brandSecondary6, backgroundOverlay },
  } = useTheme();
  const { state = "enabled", ...rest } = props;
  return (
    <Button {...rest} state={state} preset="icon">
      <Icon
        name="chevron-left"
        color={
          disabledStates.includes(state) ? backgroundOverlay : brandSecondary6
        }
        size={35}
      />
    </Button>
  );
};

const addIcons = {
  "add-categories": {
    name: "plus",
    size: 24,
  },
  "add-currency": {
    name: "plus",
    size: 24,
  },
  "add-staff": {
    name: "account-plus",
    size: 24,
  },
  "add-services": {
    name: "text-box-plus",
    size: 26,
  },
  "add-image": {
    name: "camera-plus",
    size: 24,
  },
  more: {
    name: "camera-plus",
    size: 24,
  },
  default: {
    name: "plus",
    size: 24,
  },
} as const;

export const CircleIconButton: FC<
  ButtonProps & {
    noMargin?: boolean;
    iconType?: keyof typeof addIcons;
    iconSize?: number;
  }
> = (props) => {
  const {
    Colors: { brandSecondary6, backgroundOverlay },
  } = useTheme();

  const {
    noMargin = false,
    state = "enabled",
    iconSize = 24,
    iconType = "default",
    style: styleOverride,
    ...rest
  } = props;

  return (
    <Button
      {...rest}
      preset="headerLink"
      style={[{ marginHorizontal: noMargin ? 0 : undefined }, styleOverride]}
      state={state}
    >
      <Icon
        name={
          addIcons[iconType] ? addIcons[iconType].name : addIcons.default.name
        }
        color={
          disabledStates.includes(state) ? backgroundOverlay : brandSecondary6
        }
        size={addIcons[iconType].size}
      />
    </Button>
  );
};
export const SubmitHeaderIconButton: FC<ButtonProps> = (props) => {
  const {
    Colors: { brandSecondary6, gray },
  } = useTheme();
  return (
    <Button preset="headerLink" {...props}>
      <Icon
        name="send"
        color={props.disabled ? gray : brandSecondary6}
        size={20}
      />
    </Button>
  );
};
export const CancelAndLogOutHeaderButton: FC<ButtonProps> = (props) => {
  const {
    Colors: { brandSecondary6, gray },
  } = useTheme();
  return (
    <Button {...props} preset="headerLink">
      <Icon
        name="account-cancel"
        color={props.disabled ? gray : brandSecondary6}
        size={22}
      />
    </Button>
  );
};

export const MultipleHeaderButtons: FC = ({ children }) => {
  return <View style={{ flexDirection: "row" }}>{children}</View>;
};
