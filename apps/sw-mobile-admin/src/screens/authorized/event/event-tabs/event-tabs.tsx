import React, { useCallback, useMemo, useState } from "react";
import { View, useWindowDimensions, StyleSheet, StatusBar, Animated, Pressable } from "react-native";
import { TabView, SceneMap, TabBarProps } from "react-native-tab-view";
import { EventMoreTab } from "./event-more-tab";
import { EventUsersTab } from "./event-users-tab";
import { EventScreenHeader } from "../event-screen-header";
import { useTheme } from "../../../../theme";
import { useIntl } from "react-intl";

type Route = {
  key: string;
  title: string;
};

export const EventScreenTabs = props => {
  const { event } = props;
  const layout = useWindowDimensions();
  const { Colors } = useTheme();
  const [index, setIndex] = useState(0);
  const intl = useIntl();

  const routes = useMemo(() => {
    return [
      { key: "people", title: intl.formatMessage({ id: "Event_Screen.routes.title.people" }) },
      { key: "more", title: intl.formatMessage({ id: "Event_Screen.routes.title.more" }) },
    ];
  }, [intl]);

  const renderPeopleTab = useCallback(() => {
    return <EventUsersTab event={event} />;
  }, [event]);

  const renderMoreTab = useCallback(() => {
    return <EventMoreTab event={event} />;
  }, [event]);

  const renderScene = SceneMap({
    people: renderPeopleTab,
    more: renderMoreTab,
  });

  const _renderTabBar = useCallback(
    (tabBarProps: TabBarProps<Route>) => {
      const inputRange = tabBarProps.navigationState.routes.map((x, i) => i);
      return (
        <View>
          <EventScreenHeader event={event} />
          <View style={styles.tabBar}>
            {tabBarProps.navigationState.routes.map((route, i) => {
              const opacity = tabBarProps.position.interpolate({
                inputRange,
                outputRange: inputRange.map(inputIndex => (inputIndex === i ? 1 : 0.65)),
              });
              const isSelected = index === i;
              return (
                <Pressable key={route.key} style={styles.tabContainer} onPress={() => setIndex(i)}>
                  <Animated.View
                    style={[
                      styles.tabView,
                      {
                        backgroundColor: Colors.brandSecondary1,
                        borderBottomColor: isSelected ? Colors.brandSecondary : "transparent",
                        opacity,
                      },
                    ]}
                  >
                    <Animated.Text
                      style={[
                        styles.tabText,
                        {
                          color: Colors.brandSecondary8,
                          fontWeight: isSelected ? "600" : "500",
                        },
                      ]}
                    >
                      {route.title}
                    </Animated.Text>
                  </Animated.View>
                </Pressable>
              );
            })}
          </View>
        </View>
      );
    },
    [Colors.brandSecondary, Colors.brandSecondary1, Colors.brandSecondary8, event, index]
  );

  return (
    <TabView
      renderTabBar={_renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
  },
  tabContainer: {
    flex: 1,
  },
  tabView: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 4,
  },
  tabText: {
    fontSize: 15,
    textTransform: "uppercase",
  },
});
