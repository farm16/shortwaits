import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { FC, Fragment, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, Animated, Dimensions, Pressable, StyleSheet, View } from "react-native";
import { SceneMap, TabBarProps, TabView } from "react-native-tab-view";
import { Camera, Container, IconButton, Screen, Text, WithPermission } from "../../../components";
import { useOsContacts } from "../../../hooks";
import { AuthorizedScreenProps } from "../../../navigation";
import { useCreateLocalClientsMutation, useGetClientsQuery, useGetLocalClientsQuery } from "../../../services";
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
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleAddClient = useCallback(() => {
    navigation.navigate("modals", {
      screen: "add-client-modal-screen",
    });
  }, [navigation]);

  const handleOpenCamera = useCallback(() => {
    setIsCameraOpen(true);
  }, []);

  const { error: osContactsError, isLoading: isOsContactsLoading, getContacts: getOsContacts } = useOsContacts();
  const [createLocalClients, createLocalClientsResult] = useCreateLocalClientsMutation();
  const {
    isLoading: isClientsQueryLoading,
    isSuccess: isClientsQuerySuccess,
    refetch: refetchClientsQuery,
  } = useGetClientsQuery(business?._id ?? skipToken, {
    refetchOnFocus: true,
  });
  const { isLoading: isLocalClientsQueryLoading, isSuccess: isLocalClientsQuerySuccess, refetch: refetchLocalClientsQuery } = useGetLocalClientsQuery(business?._id ?? skipToken);

  const isCreateClientsLoading = createLocalClientsResult.isLoading && !createLocalClientsResult.isSuccess;

  const isLoading = isClientsQueryLoading || isLocalClientsQueryLoading || isCreateClientsLoading;

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
              <IconButton iconType="scan-qr" withMarginRight onPress={() => handleOpenCamera()} />
            ) : (
              <Fragment>
                <IconButton iconType="sync" withMarginRight onPress={() => handleSyncContacts()} />
                <IconButton iconType="add" withMarginRight onPress={() => handleAddClient()} />
              </Fragment>
            )}
          </Container>
        );
      },
    });
  }, [handleAddClient, handleOpenCamera, handleSyncContacts, isListSearchable, isLoading, navigation, tabIndex]);

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

  const renderShortwaitsClientsTab = useCallback(() => {
    return <ShortwaitsClientsTab isListSearchable={isListSearchable} isLoading={isClientsQueryLoading} refetch={refetchClientsQuery} />;
  }, [isClientsQueryLoading, isListSearchable, refetchClientsQuery]);

  const renderLocalClientsTab = useCallback(() => {
    return <LocalClientsTab isListSearchable={isListSearchable} isLoading={isLocalClientsQueryLoading} refetch={refetchLocalClientsQuery} />;
  }, [isListSearchable, isLocalClientsQueryLoading, refetchLocalClientsQuery]);

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
      <WithPermission show={isCameraOpen} permission="camera">
        <Camera isVisible={isCameraOpen} setIsVisible={setIsCameraOpen} />
      </WithPermission>
      <TabView
        //lazy
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
