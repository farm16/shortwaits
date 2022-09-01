import { Portal } from "@gorhom/portal";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useTheme } from "../../theme";

type FloatingActionButtonProps = any;

export const FloatingActionButton = (props: FloatingActionButtonProps) => {
  const { ...rest } = props;

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
          backgroundColor: Colors.brandSecondary6,
        }}
        icon={open ? "calendar-today" : "plus"}
        actions={[
          { icon: "plus", onPress: () => console.log("Pressed add") },
          {
            icon: "star",
            label: "Star",
            onPress: () => console.log("Pressed star"),
          },
          {
            icon: "email",
            label: "Email",
            onPress: () => console.log("Pressed email"),
          },
          {
            icon: "bell",
            label: "Remind",
            onPress: () => console.log("Pressed notifications"),
          },
        ]}
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
