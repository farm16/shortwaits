import { Portal } from "@gorhom/portal";
import React, { useState } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { FAB } from "react-native-paper";
import { useComponentVisibility } from "../../redux";
import { useTheme } from "../../theme";
import { actions as defaultActions } from "./fab-actions";

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
    hasPaddingBottom = true,
    isVisible: isVisibleOverride,
    ...rest
  } = props;

  const { Colors } = useTheme();

  const { isVisible } = useComponentVisibility("floatingActionButton", true);

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        visible={isVisibleOverride ?? isVisible}
        open={open}
        style={{
          paddingBottom: hasPaddingBottom ? 100 : 0,
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

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    marginRight: 25,
    marginBottom: 40,
    right: 0,
    bottom: 0,
  },
});
