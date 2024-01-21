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

export const FloatingActionButton = (props: FloatingActionButtonProps) => {
  const { icon = "plus", pressedIcon = "plus", isVisible = true, actions, ...rest } = props;

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
        // backdropColor={"rgba(0, 0, 0, 0.65)"}
        icon={isOpen ? pressedIcon : icon}
        color={Colors.white}
        actions={ac}
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
