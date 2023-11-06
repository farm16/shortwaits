import React from "react";
import { FlatListProps, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export const List = (props: FlatListProps<any>) => {
  const { showsVerticalScrollIndicator = false, ...rest } = props;
  return <FlatList showsVerticalScrollIndicator={showsVerticalScrollIndicator} style={styles.root} {...rest} />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
