import React from "react";
import { FlatList, StyleSheet } from "react-native";

export const List = (props) => {
  const { ...rest } = props;
  return <FlatList style={styles.root} {...rest} />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
