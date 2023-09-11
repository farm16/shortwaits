import React, { FC } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Button, ButtonProps, Spinner, Text } from "../common";
import { useTheme } from "../../theme";
import { ThemeColorName } from "../../theme/Colors";

const disabledStates = ["loading", "disabled", "enable"];

export const BackButton: FC<ButtonProps> = props => (
  <Button {...props} preset="icon">
    <Icon name="chevron-left" color={useTheme().Colors.brandSecondary} size={30} />
  </Button>
);

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
      <Icon
        name="arrow-right-bold"
        color={disabledStates.includes(state) ? inputBackground : brandSecondary}
        size={22}
      />
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
export const LeftChevronButton: FC<
  ButtonProps & {
    counter?: string;
  }
> = props => {
  const {
    Colors: { brandSecondary, backgroundOverlay },
  } = useTheme();
  const { state = "enabled", ...rest } = props;
  return (
    <Button
      {...rest}
      state={state}
      preset="none"
      style={{
        marginLeft: 16,
        flexDirection: "row",
        alignItems: "center", 
      }}
    >
      <Icon name="chevron-left" color={disabledStates.includes(state) ? backgroundOverlay : brandSecondary} size={35} />
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

const _circleIcons = {
  edit: {
    name: "pencil",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: 21,
  },
  search: {
    name: "magnify",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: 23,
  },
  cancel: {
    name: "cancel",
    color: "red4",
    backgroundColor: undefined,
    size: 24,
  },
  delete: {
    name: "delete-forever",
    color: "red4",
    backgroundColor: undefined,
    size: 26,
  },
  "search-close": {
    name: "magnify-close",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: 23,
  },
  check: {
    name: "check",
    color: "white",
    backgroundColor: "brandSecondary",
    size: 26,
  },
  close: {
    name: "close",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: 30,
  },
  "business-header": {
    name: "store",
    color: "brandAccent",
    backgroundColor: "white",
    size: 30,
  },
  business: {
    name: "store",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: 20,
  },
  "business-settings": {
    name: "store-cog",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: 20,
  },
  save: {
    name: "content-save-outline",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: 26,
  },
  "open-business": {
    name: "door-open",
    color: "green",
    backgroundColor: undefined,
    size: 25,
  },
  "closed-business": {
    name: "door-closed-lock",
    backgroundColor: undefined,
    color: "red",
    size: 25,
  },
  "account-cancel": {
    name: "account-cancel",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: 24,
  },
  "add-categories": {
    name: "plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 24,
  },
  "add-currency": {
    name: "plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 24,
  },
  "add-staff": {
    name: "account-plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 21,
  },
  "add-client": {
    name: "account-plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 21,
  },
  "add-services": {
    name: "text-box-plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 26,
  },
  "add-image": {
    name: "camera-plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 24,
  },
  more: {
    name: "camera-plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 24,
  },
  add: {
    name: "plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 26,
  },
  contactSync: {
    name: "account-sync-outline",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 24,
  },
  share: {
    name: "share-variant",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 21,
  },
  calendar: {
    name: "calendar-range-outline",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 21,
  },
  magnify: {
    name: "magnify",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 21,
  },
  qr: {
    name: "qrcode",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 21,
  },
  default: {
    name: "plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: 26,
  },
} as const;
type CircleIconsKeys = keyof typeof _circleIcons;
type CircleIconsValues = {
  name: string;
  color: ThemeColorName;
  backgroundColor: ThemeColorName;
  size: number;
};
const circleIcons = _circleIcons as unknown as Record<CircleIconsKeys, CircleIconsValues>;

export const IconButton: FC<
  ButtonProps & {
    iconType: CircleIconsKeys;
    iconSize?: number;
    withMarginLeft?: boolean;
    withMarginRight?: boolean;
  }
> = props => {
  const { Colors } = useTheme();

  const {
    state = "enabled",
    iconSize = 22,
    iconType = "default",
    style: styleOverride,
    text,
    textStyle,
    withMarginRight,
    withMarginLeft,
    ...rest
  } = props;

  const style: StyleProp<ViewStyle> = {
    backgroundColor: Colors[circleIcons[iconType].backgroundColor ?? undefined],
    width: circleIcons[iconType].size,
    height: circleIcons[iconType].size,
    borderRadius: circleIcons[iconType].size / 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: withMarginLeft ? 16 : undefined,
    marginRight: withMarginRight ? 16 : undefined,
  };

  return (
    <Button preset="none" {...rest} style={[style, styleOverride]} state={state}>
      {text ? (
        <Text preset="none" style={[{ color: Colors.brandSecondary7, fontWeight: "600" }, textStyle]} text={text} />
      ) : (
        <Icon
          name={circleIcons[iconType] ? circleIcons[iconType].name : circleIcons.default.name}
          color={disabledStates.includes(state) ? Colors.gray : Colors[circleIcons[iconType]["color"]]}
          size={circleIcons[iconType].size || iconSize}
        />
      )}
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
