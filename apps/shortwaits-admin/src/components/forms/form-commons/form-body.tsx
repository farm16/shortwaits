import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen, Space } from "../../common";

export const FormBody = ({ children }) => {
  return (
    <Screen preset="scroll" unsafe unsafeBottom style={styles.container}>
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
