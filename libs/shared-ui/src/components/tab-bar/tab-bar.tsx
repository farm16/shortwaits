import { noop } from "lodash";
import React, { useCallback } from "react";
import { Dimensions, Platform, StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getResponsiveHeight } from "../../utils";
import { Button } from "../common/button/button";

type TabBarProps = {
  navigation: any;
  route: any;
  onLayout?: ViewProps["onLayout"];
};

export function TabBar({ navigation, route, onLayout = noop }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const width = Dimensions.get("window").width;
  console.log(route);

  const handlePress = useCallback(
    screen => {
      navigation.navigate(screen);
    },
    [navigation]
  );

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.root,
        {
          width: width,
          paddingBottom: Platform.OS === "android" && insets.bottom === 0 ? getResponsiveHeight(16) : insets.bottom,
        },
      ]}
    >
      <Button text="Home" preset={`client-tab${route.name === "home-screen" ? "" : "-disabled"}`} onPress={() => handlePress("home-screen")} />
      <Button text="Explore" preset={`client-tab${route.name === "history-screen" ? "" : "-disabled"}`} onPress={() => handlePress("history-screen")} />
      <Button text="Settings" preset={`client-tab${route.name === "settings-screen" ? "" : "-disabled"}`} onPress={() => handlePress("settings-screen")} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
});
