import { Portal } from "@gorhom/portal";
import React, { useState } from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { FAB } from "react-native-paper";
import { useTheme } from "../../theme";

type FloatingActionButtonProps = {
  actions: FloatingActions;
  /**
   *
   */
  onPress?(): null;
  icon: string;
  pressedIcon: string;
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
  const { actions = [], icon = "plus", pressedIcon = "plus" } = props;

  const { Colors } = useTheme();

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        visible={true}
        open={open}
        style={{
          paddingBottom: 100,
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
