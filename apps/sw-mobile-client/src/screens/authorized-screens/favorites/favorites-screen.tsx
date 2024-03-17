import { Container, Screen, Space, Text, useTheme } from "@shortwaits/shared-ui";
import React, { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Animated, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { SceneMap, TabBarProps, TabView } from "react-native-tab-view";
import { AuthorizedScreenProps } from "../../../navigation";
import { BusinessTab } from "./business-tab";
import { EventsTab } from "./events-tab";

type Route = {
  key: string;
  title: string;
};

export function FavoritesScreen({ navigation, route }: AuthorizedScreenProps<"favorites-screen">) {
  const layout = useWindowDimensions();
  const { Colors } = useTheme();
  const [index, setIndex] = useState(0);
  const intl = useIntl();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
  //   });
  // }, [intl, navigation]);

  const routes = useMemo(() => {
    return [
      { key: "events", title: "events" },
      { key: "business", title: "business" },
    ];
  }, [intl]);

  const renderEventsTab = useCallback(() => {
    return <EventsTab data={favoriteEventsMock} />;
  }, []);

  const renderBusinessTab = useCallback(() => {
    return <BusinessTab data={favoriteClientBusinessMock} />;
  }, []);

  const renderScene = SceneMap({
    events: renderEventsTab,
    business: renderBusinessTab,
  });

  const _renderTabBar = useCallback(
    (tabBarProps: TabBarProps<Route>) => {
      const inputRange = tabBarProps.navigationState.routes.map((x, i) => i);
      return (
        <View>
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
    [Colors.brandSecondary, Colors.brandSecondary1, Colors.brandSecondary8, index]
  );

  return (
    <Screen>
      <Space size="large" />
      <Container withHorizontalPadding>
        <Text preset="title" text="Favorites" />
        <Space size="tiny" />
        <Text preset="subTitle" text="Save your favorite business and events to easily find them later." />
        <Space />
      </Container>
      <TabView renderTabBar={_renderTabBar} navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={{ width: layout.width }} />
    </Screen>
  );
}

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

type FavoriteEvent = {
  id: string;
  name: string;
  rating: {
    average: number;
    count: number;
  };
  links: {
    web: string;
    app: string;
  };
  description: string;
  image: string;
};
const favoriteEventsMock: FavoriteEvent[] = [
  {
    id: "1",
    name: "Event 1",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The one that started it all",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-a-new-hope-1.jpg",
  },
  {
    id: "2",
    name: "Event 2",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The best one",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-the-empire-strikes-back-1.jpg",
  },
  {
    id: "3",
    name: "Event 3",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The one with the Ewoks",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-return-of-the-jedi-1.jpg",
  },
  {
    id: "4",
    name: "Event 4",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The one with Jar Jar",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-the-phantom-menace-1.jpg",
  },
];

const favoriteClientBusinessMock = [
  {
    id: "1",
    name: "Store 1",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The one that started it all",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-a-new-hope-1.jpg",
  },
  {
    id: "2",
    name: "store 2",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The best one",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-the-empire-strikes-back-1.jpg",
  },
  {
    id: "3",
    name: "store 3",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The one with the Ewoks",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-return-of-the-jedi-1.jpg",
  },
  {
    id: "4",
    name: "store 4",
    rating: {
      average: 4.5,
      count: 100,
    },
    links: {
      web: "https://www.starwars.com/asdw",
      app: "starwars://asdw",
    },
    description: "The one with Jar Jar",
    image: "https://starwarsblog.starwars.com/wp-content/uploads/2020/05/star-wars-the-phantom-menace-1.jpg",
  },
];
