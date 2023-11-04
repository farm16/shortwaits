import React, { FC, Fragment, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Animated, Dimensions, Pressable, StyleSheet, View } from "react-native";
import { SceneMap, TabBarProps, TabView } from "react-native-tab-view";
import { Container, IconButton, Screen, Text } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useCreateBusinessClientsMutation, useGetBusinessClientsQuery } from "../../../services";
import { useBusiness, useShowGhostComponent } from "../../../store";
import { useTheme } from "../../../theme";
import { getFontSize, getResponsiveHeight } from "../../../utils";
import { LocalClientsTab } from "./local-clients-tab";
import { ShortwaitsClientsTab } from "./shortwaits-clients-tab";

type Route = {
  key: string;
  title: string;
};

export const ClientsScreen: FC<AuthorizedScreenProps<"clients-screen">> = ({ navigation }) => {
  useShowGhostComponent("floatingActionButton");

  const intl = useIntl();
  const { Colors } = useTheme();
  const [tabIndex, setTabIndex] = useState(0);

  const handleAddClient = useCallback(() => {
    navigation.navigate("modals", {
      screen: "add-client-modal-screen",
    });
  }, [navigation]);
  const [isListSearchable, setIsListSearchable] = useState(false);

  const business = useBusiness();
  const [createClients, createClientsResult] = useCreateBusinessClientsMutation();
  const { isLoading: isBusinessClientsQueryLoading, isSuccess: isBusinessClientsQuerySuccess, refetch: refetchBusinessClientsQuery } = useGetBusinessClientsQuery(business._id, {});
  const isClientsDataLoading = isBusinessClientsQueryLoading && !isBusinessClientsQuerySuccess;
  const isCreateClientsLoading = createClientsResult.isLoading && !createClientsResult.isSuccess;
  const isLoading = isClientsDataLoading || isCreateClientsLoading;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text preset="headerTitle" text={"Clients"} />
          </Container>
        );
      },
      headerLeft: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              disabled={isLoading}
              iconType={isListSearchable ? "search-close" : "search"}
              withMarginLeft
              onPress={() => {
                setIsListSearchable(s => !s);
              }}
            />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            {tabIndex === 0 ? (
              <IconButton iconType="scan-qr" withMarginRight />
            ) : (
              <Fragment>
                <IconButton iconType="sync" withMarginRight />
                <IconButton iconType="add" withMarginRight onPress={() => handleAddClient()} />
              </Fragment>
            )}
          </Container>
        );
      },
    });
  }, [handleAddClient, intl, isLoading, isListSearchable, navigation, tabIndex]);

  const routes = useMemo(() => {
    return [
      { key: "shortwaits", title: intl.formatMessage({ id: "Clients_screen.tab.shortwaits" }) },
      { key: "local", title: intl.formatMessage({ id: "Clients_screen.tab.devices" }) },
    ];
  }, [intl]);

  const renderShortwaitsClientsTab = useCallback(() => {
    return <ShortwaitsClientsTab isListSearchable={isListSearchable} />;
  }, [isListSearchable]);

  const renderLocalClientsTab = useCallback(() => {
    return <LocalClientsTab isListSearchable={isListSearchable} />;
  }, [isListSearchable]);

  const renderScene = SceneMap({
    shortwaits: renderShortwaitsClientsTab,
    local: renderLocalClientsTab,
  });

  const _renderTabBar = useCallback(
    (tabBarProps: TabBarProps<Route>) => {
      return (
        <View style={styles.tabBar}>
          {tabBarProps.navigationState.routes.map((route, i) => {
            const isSelected = tabIndex === i;
            return (
              <Pressable key={route.key} style={styles.tabContainer} onPress={() => setTabIndex(i)}>
                <Animated.View
                  style={[
                    styles.tabView,
                    {
                      backgroundColor: isSelected ? "#dddff7" : Colors.disabledBackground,
                      //backgroundColor: isSelected ? Colors.brandPrimary : Colors.disabledBackground,
                      borderBottomColor: isSelected ? Colors.brandAccent : "transparent",
                    },
                  ]}
                >
                  <Animated.Text
                    style={[
                      styles.tabText,
                      {
                        color: isSelected ? Colors.brandSecondary8 : Colors.subText,
                        fontWeight: isSelected ? "700" : "400",
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
      );
    },
    [Colors.brandAccent, Colors.brandSecondary8, Colors.disabledBackground, Colors.subText, tabIndex]
  );

  return (
    <Screen preset="fixed" unsafe backgroundColor="backgroundOverlay">
      <TabView
        lazy
        renderTabBar={_renderTabBar}
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        onIndexChange={setTabIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    </Screen>
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
    borderBottomWidth: getResponsiveHeight(3),
  },
  tabText: {
    fontSize: getFontSize(16),
  },
});
