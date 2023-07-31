import { Portal } from "@gorhom/portal";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { FAB } from "react-native-paper";
import { selectCurrentMobileAdminState } from "../../store";
import { useTheme } from "../../theme";
import { actions as defaultActions } from "./fab-actions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

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
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);
  const mobileAdmin = useSelector(selectCurrentMobileAdminState);

  const { isVisible } = useMemo(() => {
    return mobileAdmin ? mobileAdmin.components.floatingActionButton : null;
  }, [mobileAdmin]);

  // console.log("floatingActionButton visibility >>>", isVisible);

  const onStateChange = useCallback(({ open }) => setIsOpen(open), []);

  return (
    <Portal>
      <FAB.Group
        visible={isVisibleOverride ?? isVisible}
        open={isOpen}
        style={{
          paddingBottom: insets.bottom + 70,
          paddingRight: insets.right + 8,
        }}
        fabStyle={{
          backgroundColor: Colors.brandSecondary,
        }}
        backdropColor={"rgba(0, 0, 0, 0.32)"}
        icon={isOpen ? pressedIcon : icon}
        color={Colors.white}
        actions={actions}
        onStateChange={onStateChange}
        onPress={() => {
          if (isOpen) {
            // do something if the speed dial is open
          }
        }}
        {...rest}
      />
    </Portal>
  );
};
