import React from "react";
import { StyleSheet, View } from "react-native";

export const FormHeader = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
});
