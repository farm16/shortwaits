import { Portal } from "@gorhom/portal";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { FAB, FABGroupProps } from "react-native-paper";
import { ThemeColorName, useTheme } from "../../theme";

type FloatingActionButtonProps = {
  actions: FABGroupProps["actions"];
  hasPaddingBottom?: boolean;
  onPress?(): null;
  icon?: string;
  pressedIcon?: string;
  backgroundColor?: ThemeColorName;
  isVisible?: boolean;
};

export const FabGroupButton = (props: FloatingActionButtonProps) => {
  const { backgroundColor, icon = "plus", pressedIcon = "plus", isVisible = true, onPress, actions, ...rest } = props;

  const { Colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const onStateChange = useCallback(({ open }: { open: boolean }) => setIsOpen(open), []);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <Portal hostName="Fab">
      <FAB.Group
        visible={isVisible}
        open={isOpen}
        fabStyle={[
          {
            marginBottom: tabBarHeight + 32,
            backgroundColor: backgroundColor ? Colors[backgroundColor] : Colors.brandAccent,
          },
        ]}
        icon={isOpen ? pressedIcon : icon}
        color={Colors.brandSecondary}
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

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
  },
});
