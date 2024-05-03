import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BackButton, Container, IconButton, Logo3, NonIdealState, Screen, Space, Text, getResponsiveFontSize, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import { isEqual } from "lodash";
import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Animated, Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SceneMap, TabBarProps, TabView } from "react-native-tab-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { ModalsScreenProps } from "../../../navigation";
import { useGetAllBusinessClientsQuery } from "../../../services";
import { showPremiumMembershipModal, useBusiness } from "../../../store";
import { ClientsSelectorItem } from "./clients-selector-item";
import { Clients, Route } from "./clients-selector-modal-types";

const MIN_SELECTED_ITEMS_DEFAULT = 0; // Define your minimum selected items here
const MAX_SELECTED_ITEMS_DEFAULT = 1000; // Define your maximum selected items here

export const ClientsSelectorModal: FC<ModalsScreenProps<"clients-selector-modal-screen">> = ({ navigation, route }) => {
  const {
    searchable = false,
    headerTitle = "Clients",
    selectedData: data = {
      clients: [],
      localClients: [],
    },
    onGoBack,
    onSubmit,
    minSelectedItems = MIN_SELECTED_ITEMS_DEFAULT,
    maxSelectedItems = MAX_SELECTED_ITEMS_DEFAULT,
  } = route.params;

  const business = useBusiness();
  const intl = useIntl();
  const dispatch = useDispatch();
  const { Colors } = useTheme();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Clients>(null);
  const [isListSearchable, setIsListSearchable] = useState<boolean>(false);
  const [originalData] = useState(data);
  const [selectedData, setSelectedItems] = useState(data);

  const [clients, setClients] = useState<Clients>({});
  const [dataHasChanged, setDataHasChanged] = useState(false);

  const {
    isLoading: isAllClientsQueryLoading,
    isSuccess: isAllClientsQuerySuccess,
    refetch: refetchAllClientsQuery,
    error: isAllClientsQueryError,
    data: allClientsData,
  } = useGetAllBusinessClientsQuery(business?._id ?? skipToken);

  useEffect(() => {
    if (isEqual(originalData, selectedData)) {
      setDataHasChanged(true);
    }
  }, [originalData, selectedData]);

  console.log("\n >>>> rendering clients selector modal");

  const handleAddClientPress = useCallback(() => {
    dispatch(showPremiumMembershipModal());
  }, [dispatch]);

  function filterSelectedData(data: Clients) {
    const clientIds = data.clients.map(client => client._id);
    const localClientIds = data.localClients.map(localClient => localClient._id);
    return {
      clients: clientIds,
      localClients: localClientIds,
    };
  }

  // useEffect(() => {
  //   if (isAllClientsQuerySuccess) {
  //     const initialFilteredData = allClientsData?.data;
  //     setFilteredData(initialFilteredData);
  //   }
  // }, [allClientsData?.data, isAllClientsQuerySuccess, searchText]);

  useLayoutEffect(() => {
    const handleOnGoBack = () => {
      if (onGoBack) {
        onGoBack(selectedData);
      }
      navigation.goBack();
    };

    const totalClientsSelected = selectedData?.clients.length + selectedData?.localClients.length;

    navigation.setOptions({
      headerTitle: totalClientsSelected > 0 ? `${headerTitle} (${totalClientsSelected})` : headerTitle,
      headerLeft: () => (
        <Container direction="row" alignItems="center">
          <BackButton onPress={() => handleOnGoBack()} />
        </Container>
      ),
      headerRight: () => (
        <Container direction="row" alignItems="center">
          {searchable ? (
            <IconButton
              withMarginRight
              iconType={isListSearchable ? "search-close" : "search"}
              onPress={() => {
                setIsListSearchable(s => !s);
              }}
            />
          ) : null}
          <IconButton onPress={() => handleAddClientPress()} withMarginRight iconType="add-client" />
        </Container>
      ),
    });
  }, [handleAddClientPress, headerTitle, isListSearchable, navigation, onGoBack, searchable, selectedData]);

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    setFilteredData(allClientsData?.data);
  };

  const handleClientOnSelect = useCallback(client => {
    setSelectedItems(selectedData => {
      return {
        clients: selectedData.clients.includes(client._id) ? selectedData.clients.filter(id => id !== client._id) : [...selectedData.clients, client._id],
        localClients: selectedData.localClients,
      };
    });
  }, []);

  const handleLocalClientOnSelect = useCallback(localClient => {
    setSelectedItems(selectedData => {
      return {
        clients: selectedData.clients,
        localClients: selectedData.localClients.includes(localClient._id)
          ? selectedData.localClients.filter(id => id !== localClient._id)
          : [...selectedData.localClients, localClient._id],
      };
    });
  }, []);

  const renderClientItem = useCallback(
    ({ item }) => {
      const rightIconName = selectedData.clients.includes(item._id) ? "checkbox-outline" : "checkbox-blank-outline";
      return (
        <ClientsSelectorItem
          rightIconName={rightIconName}
          item={item}
          onSelect={() => {
            handleClientOnSelect(item);
          }}
        />
      );
    },
    [handleClientOnSelect, selectedData.clients]
  );

  const renderLocalClientItem = useCallback(
    ({ item }) => {
      const rightIconName = selectedData.localClients.includes(item._id) ? "checkbox-outline" : "checkbox-blank-outline";
      return (
        <ClientsSelectorItem
          rightIconName={rightIconName}
          item={item}
          onSelect={() => {
            handleLocalClientOnSelect(item);
          }}
        />
      );
    },
    [handleLocalClientOnSelect]
  );

  const _renderTabBar = useCallback(
    (tabBarProps: TabBarProps<Route>) => {
      const backgroundColor = Colors.brandPrimary1;
      const indicatorColor = Colors.brandAccent2;
      const iconColor = Colors.brandPrimary;
      const iconDisabledColor = Colors.disabledText;
      const disabledBackgroundColor = Colors.disabledBackground;
      const disabledIndicatorColor = Colors.disabledBackground;

      return (
        <View style={styles.tabBar}>
          {tabBarProps.navigationState.routes.map((route, i) => {
            const isSelected = tabIndex === i;
            return (
              <TouchableOpacity key={route.key} style={styles.tabContainer} onPress={() => setTabIndex(i)}>
                <Animated.View
                  style={[
                    styles.tabView,
                    {
                      backgroundColor: isSelected ? backgroundColor : disabledBackgroundColor,
                      borderBottomColor: isSelected ? indicatorColor : disabledIndicatorColor,
                    },
                  ]}
                >
                  {i === 0 ? (
                    <Logo3 height={getResponsiveHeight(40)} color3={isSelected ? iconColor : iconDisabledColor} />
                  ) : (
                    <Icon name={"card-account-details"} size={getResponsiveHeight(23)} color={isSelected ? iconColor : iconDisabledColor} />
                  )}
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    },
    [Colors.brandAccent2, Colors.brandPrimary, Colors.brandPrimary1, Colors.disabledBackground, Colors.disabledText, tabIndex]
  );

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

  const renderClient = useCallback(() => {
    return (
      <FlatList
        style={styles.container}
        // refreshing={isAllClientsQueryLoading}
        // refreshControl={<RefreshControl refreshing={isAllClientsQueryLoading} onRefresh={refetchAllClientsQuery} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={allClientsData?.data?.clients}
        renderItem={renderClientItem}
        ListEmptyComponent={<NonIdealState type="noClients" />}
        ListFooterComponent={<Space size="large" />}
      />
    );
  }, [allClientsData?.data?.clients, renderClientItem]);

  const renderLocalClient = () => {
    return (
      <FlatList
        style={styles.container}
        // refreshing={isAllClientsQueryLoading}
        // refreshControl={<RefreshControl refreshing={isAllClientsQueryLoading} onRefresh={refetchAllClientsQuery} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={allClientsData?.data?.localClients}
        renderItem={renderLocalClientItem}
        ListEmptyComponent={<NonIdealState type="noClients" />}
        ListFooterComponent={<Space size="large" />}
      />
    );
  };

  const _renderScene = SceneMap({
    shortwaits: renderClient,
    local: renderLocalClient,
  });

  if (isAllClientsQueryError) {
    return <Text>Error</Text>;
  }

  return (
    <Screen preset="fixed" unsafe unsafeBottom>
      <TabView
        renderTabBar={_renderTabBar}
        navigationState={{ index: tabIndex, routes }}
        renderScene={_renderScene}
        onIndexChange={setTabIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
      {/* {onSubmit ? <Button onPress={() => onSubmit(selectedData)} disabled={!dataHasChanged} style={{ margin: 20 }} text={"Submit"} /> : null} */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getResponsiveHeight(16),
  },
  searchBar: {},
  flatList: {},
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
    fontSize: getResponsiveFontSize(16),
  },
});
