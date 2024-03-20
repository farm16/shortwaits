import { Portal } from "@gorhom/portal";
import React, { useCallback, useState } from "react";
import { FAB, FABGroupProps } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../theme";

type FloatingActionButtonProps = {
  actions: FABGroupProps["actions"];
  hasPaddingBottom?: boolean;
  onPress?(): null;
  icon?: string;
  pressedIcon?: string;
  isVisible?: boolean;
};

export const FabGroupButton = (props: FloatingActionButtonProps) => {
  const { icon = "plus", pressedIcon = "plus", isVisible = true, onPress, actions, ...rest } = props;

  const { Colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);
  const onStateChange = useCallback(({ open }: { open: boolean }) => setIsOpen(open), []);

  return (
    <Portal>
      <FAB.Group
        visible={isVisible}
        open={isOpen}
        style={{
          paddingBottom: insets.bottom + 70,
          paddingRight: insets.right + 8,
        }}
        fabStyle={{
          backgroundColor: Colors.brandSecondary,
        }}
        icon={isOpen ? pressedIcon : icon}
        color={Colors.white}
        actions={actions}
        onStateChange={onStateChange}
        onPress={() => {
          if (isOpen && onPress) {
            onPress();
          }
        }}
        {...rest}
      />
    </Portal>
  );
};
