import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BackButton, Button, Container, IconButton, NonIdealState, Screen, Space, getResponsiveFontSize, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import { cloneDeep } from "lodash";
import React, { FC, useCallback, useLayoutEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ClientsTabs } from "../../../../components";
import { ModalsScreenProps } from "../../../../navigation";
import { useGetAllBusinessClientsQuery } from "../../../../services";
import { useBusiness, useClients, useLocalClients } from "../../../../store";
import { ClientsSelectorItem } from "./clients-selector-item";

const MIN_SELECTED_ITEMS_DEFAULT = 0; // Define your minimum selected items here
const MAX_SELECTED_ITEMS_DEFAULT = 100; // Define your maximum selected items here

export const ClientsSelectorModal: FC<ModalsScreenProps<"business-clients-modal-screen">> = ({ navigation, route }) => {
  const {
    searchable = false,
    headerTitle = "Clients",
    selectedData: initialSelectedIds = {
      clients: [],
      localClients: [],
    },
    onGoBack,
    onSubmit,
    minSelectedItems = MIN_SELECTED_ITEMS_DEFAULT,
    maxSelectedItems = MAX_SELECTED_ITEMS_DEFAULT,
  } = route.params;

  const business = useBusiness();
  const localClients = useLocalClients();
  const clients = useClients();
  const { Colors } = useTheme();
  const [totalCount, setTotalCount] = useState(initialSelectedIds.clients.length + initialSelectedIds.localClients.length);
  const [isListSearchable, setIsListSearchable] = useState<boolean>(false);

  const initialSelectedLocalClientIds = useRef(initialSelectedIds.localClients);
  const initialSelectedClientIds = useRef(initialSelectedIds.clients);
  const selectedLocalClientIds = useRef(initialSelectedIds.localClients);
  const selectedClientIds = useRef(initialSelectedIds.clients);

  useGetAllBusinessClientsQuery(business._id ?? skipToken); // initial query

  // useEffect(() => {
  //   if (isEqual(originalData, selectedData)) {
  //     setDataHasChanged(true);
  //   }
  // }, [originalData, selectedData]);

  const handleAddClientPress = useCallback(() => {
    navigation.navigate("modals", { screen: "add-client-modal-screen" });
  }, [navigation]);

  // function filterSelectedData(data: Clients) {
  //   const clientIds = data.clients.map(client => client._id);
  //   const localClientIds = data.localClients.map(localClient => localClient._id);
  //   return {
  //     clients: clientIds,
  //     localClients: localClientIds,
  //   };
  // }
  // useEffect(() => {
  //   if (isAllClientsQuerySuccess) {
  //     const initialFilteredData = allClientsData?.data;
  //     setFilteredData(initialFilteredData);
  //   }
  // }, [allClientsData?.data, isAllClientsQuerySuccess, searchText]);

  useLayoutEffect(() => {
    const handleOnGoBack = () => {
      if (onGoBack) {
        onGoBack({
          clients: selectedClientIds.current,
          localClients: selectedLocalClientIds.current,
        });
      }
      navigation.goBack();
    };

    navigation.setOptions({
      headerTitle: totalCount > 0 ? `${headerTitle} (${totalCount})` : headerTitle,
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
  }, [handleAddClientPress, headerTitle, isListSearchable, navigation, onGoBack, searchable, totalCount]);

  // shortwaits clients
  const renderClient = useCallback(() => {
    const handleClientOnSelect = item => {
      if (selectedClientIds.current.includes(item._id)) {
        selectedClientIds.current = selectedClientIds.current.filter(id => id !== item._id);
      } else {
        selectedClientIds.current = [...selectedClientIds.current, item._id];
      }
      setTotalCount(selectedClientIds.current.length + selectedLocalClientIds.current.length);
    };
    const renderClientItem = ({ item }) => {
      return (
        <ClientsSelectorItem
          item={item}
          initialIsSelected={selectedClientIds?.current?.includes(item._id)}
          onSelect={() => {
            handleClientOnSelect(item);
          }}
        />
      );
    };
    return (
      <FlatList
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={clients}
        renderItem={renderClientItem}
        ListEmptyComponent={<NonIdealState type="noClients" />}
        ListFooterComponent={<Space size="large" />}
      />
    );
  }, [clients]);

  // local clients
  const renderLocalClient = useCallback(() => {
    const handleLocalClientOnSelect = item => {
      if (selectedLocalClientIds.current.includes(item._id)) {
        selectedLocalClientIds.current = selectedLocalClientIds.current.filter(id => id !== item._id);
      } else {
        selectedLocalClientIds.current = [...selectedLocalClientIds.current, item._id];
      }
      setTotalCount(selectedLocalClientIds.current.length + selectedClientIds.current.length);
    };
    const renderLocalClientItem = ({ item }) => {
      return (
        <ClientsSelectorItem
          item={item}
          initialIsSelected={selectedLocalClientIds?.current?.includes(item._id)}
          onSelect={() => {
            handleLocalClientOnSelect(item);
          }}
        />
      );
    };
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={localClients}
        renderItem={renderLocalClientItem}
        ListEmptyComponent={<NonIdealState type="noClients" />}
        ListFooterComponent={<Space size="large" />}
      />
    );
  }, [localClients]);

  const hasDataChanged = useCallback(() => {
    if (selectedClientIds.current.length !== initialSelectedClientIds.current.length) {
      return true;
    }
    if (selectedLocalClientIds.current.length !== initialSelectedLocalClientIds.current.length) {
      return true;
    }

    const clonedInitialSelectedClientIds = cloneDeep(initialSelectedClientIds.current);
    const clonedInitialSelectedLocalClientIds = cloneDeep(initialSelectedLocalClientIds.current);
    const clonedSelectedClientIds = cloneDeep(selectedClientIds.current);
    const clonedSelectedLocalClientIds = cloneDeep(selectedLocalClientIds.current);

    // initial selected data
    const sortedInitialSelectedClientIds = clonedInitialSelectedClientIds.sort();
    const sortedInitialSelectedLocalClientIds = clonedInitialSelectedLocalClientIds.sort();
    // selected data
    const sortedSelectedClientIds = clonedSelectedClientIds.sort();
    const sortedSelectedLocalClientIds = clonedSelectedLocalClientIds.sort();

    const initialSelectedData = {
      clients: sortedInitialSelectedClientIds,
      localClients: sortedInitialSelectedLocalClientIds,
    };
    const selectedData = {
      clients: sortedSelectedClientIds,
      localClients: sortedSelectedLocalClientIds,
    };

    return JSON.stringify(initialSelectedData) !== JSON.stringify(selectedData);
  }, []);

  const handleSubmit = useCallback(() => {
    if (onSubmit) {
      onSubmit({ clients: selectedClientIds.current, localClients: selectedLocalClientIds.current });
    }
    navigation.goBack();
  }, [navigation, onSubmit]);
  console.log("hasDataChanged >>>", hasDataChanged());

  const backgroundColor = Colors.background;
  return (
    <Screen preset="fixed" unsafe backgroundColor="background">
      <ClientsTabs renderLocalClientsTab={renderLocalClient} renderShortwaitsClientsTab={renderClient} />
      {onSubmit ? (
        <View style={[styles.submitButton, { backgroundColor }]}>
          <Button preset="secondary" disabled={totalCount < minSelectedItems || totalCount > maxSelectedItems || !hasDataChanged()} onPress={handleSubmit} text="Done" />
        </View>
      ) : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getResponsiveHeight(16),
  },
  submitButton: {
    paddingTop: getResponsiveHeight(16),
    paddingHorizontal: getResponsiveHeight(16),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E5E5",
    paddingBottom: getResponsiveHeight(16),
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
