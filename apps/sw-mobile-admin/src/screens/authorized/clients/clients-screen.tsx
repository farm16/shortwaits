import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { FC, Fragment, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, Animated, Dimensions, Pressable, StyleSheet, View } from "react-native";
import { SceneMap, TabBarProps, TabView } from "react-native-tab-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Logo3 } from "../../../assets/images/svg-components/logo-3";
import { Container, IconButton, Screen, Text } from "../../../components";
import { useOsContacts } from "../../../hooks";
import { AuthorizedScreenProps } from "../../../navigation";
import { useCreateLocalClientsMutation, useGetAllBusinessClientsQuery } from "../../../services";
import { useBusiness, useLocalClients, useShowGhostComponent } from "../../../store";
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
  const business = useBusiness();
  const currentClients = useLocalClients();
  const [tabIndex, setTabIndex] = useState(0);
  const [isListSearchable, setIsListSearchable] = useState(false);

  const handleAddClient = useCallback(() => {
    if (tabIndex === 1) {
      navigation.navigate("modals", {
        screen: "add-client-modal-screen",
        params: {
          clientType: "local",
        },
      });
    } else {
      navigation.navigate("modals", {
        screen: "add-client-to-business-modal-screen",
      });
    }
  }, [navigation, tabIndex]);

  const { error: osContactsError, isLoading: isOsContactsLoading, getContacts: getOsContacts } = useOsContacts();
  const [createLocalClients, createLocalClientsResult] = useCreateLocalClientsMutation();
  const {
    isLoading: isAllClientsQueryLoading,
    isSuccess: isAllClientsQuerySuccess,
    refetch: refetchAllClientsQuery,
  } = useGetAllBusinessClientsQuery(business?._id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const isCreateClientsLoading = createLocalClientsResult.isLoading && !createLocalClientsResult.isSuccess;
  const isLoading = isCreateClientsLoading;

  const renderShortwaitsClientsTab = useCallback(() => {
    return <ShortwaitsClientsTab isLoading={isAllClientsQueryLoading} refresh={refetchAllClientsQuery} />;
  }, [isAllClientsQueryLoading, refetchAllClientsQuery]);

  const renderLocalClientsTab = useCallback(() => {
    return <LocalClientsTab isLoading={isAllClientsQueryLoading} refresh={refetchAllClientsQuery} />;
  }, [isAllClientsQueryLoading, refetchAllClientsQuery]);

  const handleSyncContacts = useCallback(
    async function () {
      const run = async () => {
        if (osContactsError) {
          Alert.alert("Error", osContactsError.message);
        }
        const contacts = await getOsContacts();
        const clientKeySet = new Set(currentClients.map(client => client.phoneNumbers?.[0]?.number));
        const filteredContacts = contacts.data.filter(contact => !clientKeySet.has(contact.phoneNumbers?.[0]?.number));

        console.log("filteredContacts >>>", JSON.stringify(filteredContacts, null, 2));

        createLocalClients({
          businessId: business._id,
          body: filteredContacts,
        });
      };
      Alert.alert("Do you want to sync your contacts?", "Contacts will be synced by phone numbers only.", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: run,
          style: "default",
        },
      ]);
    },
    [business._id, createLocalClients, currentClients, getOsContacts, osContactsError]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerTitle: "",
      headerLeft: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text
              preset="headerTitle"
              style={{
                fontWeight: "700",
                paddingLeft: 16,
              }}
              text={"Clients"}
            />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              disabled={isLoading}
              iconType={isListSearchable ? "search-close" : "search"}
              withMarginRight
              onPress={() => {
                setIsListSearchable(s => !s);
              }}
            />
            {tabIndex === 0 ? (
              <IconButton iconType="scan-qr" withMarginRight onPress={() => handleAddClient()} />
            ) : (
              <Fragment>
                <IconButton iconType="contactSync" withMarginRight onPress={() => handleSyncContacts()} />
                <IconButton iconType="add" withMarginRight onPress={() => handleAddClient()} />
              </Fragment>
            )}
          </Container>
        );
      },
    });
  }, [handleAddClient, handleSyncContacts, isListSearchable, isLoading, navigation, tabIndex]);

  const routes = useMemo(() => {
    return [
      {
        key: "shortwaits",
        title: intl.formatMessage({ id: "Clients_screen.tab.shortwaits" }),
      },
      {
        key: "local",
        title: intl.formatMessage({ id: "Clients_screen.tab.devices" }),
      },
    ];
  }, [intl]);

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
                      borderBottomColor: isSelected ? Colors.brandSecondary : Colors.disabledBackground,
                    },
                  ]}
                >
                  {i === 0 ? (
                    <Logo3 height={getResponsiveHeight(40)} color3={isSelected ? Colors.brandPrimary : "#8e8e93"} />
                  ) : (
                    <Icon name={"cellphone"} size={getResponsiveHeight(20)} color={isSelected ? Colors.brandPrimary : "#8e8e93"} />
                  )}
                </Animated.View>
              </Pressable>
            );
          })}
        </View>
      );
    },
    [Colors.brandPrimary, Colors.brandSecondary, Colors.disabledBackground, tabIndex]
  );

  return (
    <Screen preset="fixed" unsafe backgroundColor="lightBackground">
      <TabView
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
    height: getResponsiveHeight(50),
    borderBottomWidth: getResponsiveHeight(4),
  },
  tabText: {
    fontSize: getFontSize(16),
  },
});
