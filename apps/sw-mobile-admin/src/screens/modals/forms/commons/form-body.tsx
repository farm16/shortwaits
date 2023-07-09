import React from "react";
import { StyleSheet, View } from "react-native";
import { Portal } from "react-native-paper";
import { Screen, Space } from "../../../../components";

export const FormBody = ({ children }) => {
  return (
    <Screen preset="scroll" unsafe unsafeBottom style={styles.container}>
      <Space />
      {children}
      <Space size="large" />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
