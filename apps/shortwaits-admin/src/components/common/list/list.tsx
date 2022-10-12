import React from "react";
import { FlatList, StyleSheet, FlatListProps } from "react-native";

export const List = (props: FlatListProps<any>) => {
  const { showsVerticalScrollIndicator = false, ...rest } = props;
  return (
    <FlatList
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      style={styles.root}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
