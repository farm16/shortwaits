import { Portal } from "@gorhom/portal";
import React, { useState } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { FAB } from "react-native-paper";
import { useComponentVisibility } from "../../redux";
import { useTheme } from "../../theme";
import { actions as defaultActions } from "./fab-actions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FloatingActionButtonProps = {
  actions?: FloatingActions;
  hasPaddingBottom?: boolean;
  onPress?(): null;
  icon?: string;
  pressedIcon?: string;
  isVisible?: boolean;
};

export type FloatingActions = {
  icon: string;
  onPress(): void;
  label: string;
  color?: string;
  labelTextColor?: string;
  labelStyle: ViewStyle;
  style: ViewStyle;
}[];

export const FloatingActionButton = (props: FloatingActionButtonProps) => {
  const {
    actions = defaultActions,
    icon = "plus",
    pressedIcon = "plus",
    isVisible: isVisibleOverride,
    ...rest
  } = props;
  const { Colors } = useTheme();
  const { isVisible } = useComponentVisibility("floatingActionButton", true);
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const insets = useSafeAreaInsets();
  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        visible={isVisibleOverride ?? isVisible}
        open={open}
        style={{
          paddingBottom: insets.bottom + 70,
          paddingRight: insets.right + 8,
        }}
        fabStyle={{
          backgroundColor: Colors.brandSecondary,
        }}
        backdropColor={"rgba(0, 0, 0, 0.32)"}
        icon={open ? pressedIcon : icon}
        color={Colors.white}
        actions={actions}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        {...rest}
      />
    </Portal>
  );
};
