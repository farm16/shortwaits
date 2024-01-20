import React from "react";
import { FlatListProps, StyleSheet } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";

const List = (props: FlatListProps<any>) => {
  const { showsVerticalScrollIndicator = false, ...rest } = props;
  return <FlatList showsVerticalScrollIndicator={showsVerticalScrollIndicator} style={styles.root} {...rest} />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export { List, RefreshControl };
