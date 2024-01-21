import { skipToken } from "@reduxjs/toolkit/dist/query";
import { AnimatedSearchBar, BackButton, Container, IconButton, NonIdealState, Screen, Space, Text, useTheme } from "@shortwaits/shared-ui";
import { ClientUsersDtoType } from "@shortwaits/shared-utils";
import { isEmpty } from "lodash";
import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Alert, SectionList, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { ModalsScreenProps } from "../../../../../navigation";
import { useGetAllBusinessClientsQuery } from "../../../../../services";
import { showPremiumMembershipModal, useBusiness } from "../../../../../store";
import { ClientsSelectorItem } from "./clients-selector-item";

const MIN_SELECTED_ITEMS_DEFAULT = 0; // Define your minimum selected items here
const MAX_SELECTED_ITEMS_DEFAULT = 10000; // Define your maximum selected items here

export const ClientsSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const {
    searchable = true,
    onSelect,
    closeOnSelect = true,
    headerTitle = "Clients",
    selectedData = [],
    multiple,
    onGoBack,
    minSelectedItems = MIN_SELECTED_ITEMS_DEFAULT,
    maxSelectedItems = MAX_SELECTED_ITEMS_DEFAULT,
  } = route.params;

  const business = useBusiness();

  const {
    isLoading: isAllClientsQueryLoading,
    isSuccess: isAllClientsQuerySuccess,
    refetch: refetchAllClientsQuery,
    error: isAllClientsQueryError,
    data: allClientsData,
  } = useGetAllBusinessClientsQuery(business?._id ?? skipToken);

  const dispatch = useDispatch();
  const { Colors } = useTheme();
  const handleAddClientPress = useCallback(() => {
    dispatch(showPremiumMembershipModal());
  }, [dispatch]);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<ClientUsersDtoType>([]);
  const [isListSearchable, setIsListSearchable] = useState(false);
  const [selectedItems, setSelectedItems] = useState(selectedData);

  function filterClientUsers(searchText: string, users: ClientUsersDtoType) {
    return users.filter(item =>
      ["username", "email", "displayName", "familyName", "givenName", "middleName"].some(prop => item[prop] ?? "".toLowerCase().includes(searchText.toLowerCase()))
    );
  }

  useEffect(() => {
    if (isAllClientsQuerySuccess) {
      const initialFilteredData = filterClientUsers(searchText, allClientsData?.data?.allClients ?? []);
      setFilteredData(initialFilteredData);
    }
  }, [allClientsData?.data?.allClients, isAllClientsQuerySuccess, searchText]);

  useLayoutEffect(() => {
    const handleOnGoBack = () => {
      if (multiple) {
        const items = allClientsData?.data?.allClients?.filter(item => selectedItems.includes(item._id)) || null;
        if (onGoBack) {
          onGoBack(items);
        }
        navigation.goBack();
      } else {
        navigation.goBack();
      }
    };

    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <Container direction="row" alignItems="center">
          <BackButton onPress={() => handleOnGoBack()} counter={multiple && selectedItems?.length > 0 ? `(${selectedItems.length})` : ""} />
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
  }, [allClientsData?.data?.allClients, handleAddClientPress, headerTitle, isListSearchable, multiple, navigation, onGoBack, searchable, selectedItems]);

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    const filteredItems = filterClientUsers(text, allClientsData?.data?.allClients);
    setFilteredData(filteredItems);
  };

  const handleOnSelect = useCallback(
    item => {
      if (multiple) {
        if (selectedItems?.includes(item._id)) {
          if (minSelectedItems && selectedItems.length <= minSelectedItems) {
            Alert.alert("Warning", `You must select at least ${minSelectedItems}`);
          } else {
            setSelectedItems(selectedItems.filter(i => i !== item._id));
          }
        } else {
          if (maxSelectedItems && selectedItems.length >= maxSelectedItems) {
            Alert.alert("Warning", `You can only select ${maxSelectedItems}`);
          } else {
            setSelectedItems(selectedItems => [...selectedItems, item._id]);
          }
        }
      } else if (closeOnSelect && onSelect) {
        onSelect(item);
        navigation.goBack();
      } else if (onSelect) {
        onSelect(item);
      } else {
        navigation.navigate("authorized-stack", {
          screen: "business-client-screen",
          params: {
            client: item,
          },
        });
      }
    },
    [closeOnSelect, maxSelectedItems, minSelectedItems, multiple, navigation, onSelect, selectedItems]
  );

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <ClientsSelectorItem
          rightIconName={multiple && selectedItems?.includes(item._id) ? "check" : "none"}
          item={item}
          onSelect={() => {
            handleOnSelect(item);
          }}
        />
      );
    },
    [handleOnSelect, multiple, selectedItems]
  );

  const keyExtractor = useCallback(item => item._id, []);

  if (isAllClientsQueryError) {
    return <Text>Error</Text>;
  }
  if (isAllClientsQueryLoading) {
    return <ActivityIndicator />;
  }

  const data = [
    {
      title: "Shortwaits",
      data: allClientsData?.data?.clients ?? [],
    },
    {
      title: "Local Contacts",
      data: allClientsData?.data?.localClients ?? [],
    },
  ];

  if (isAllClientsQuerySuccess && allClientsData?.data?.allClients) {
    return (
      <Screen preset="fixed" withHorizontalPadding unsafe>
        <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} />
        <SectionList
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          sections={data}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title, data } }) => {
            return !isEmpty(data) ? (
              <Text
                preset="none"
                style={{
                  paddingTop: 24,
                  paddingBottom: 16,
                  fontSize: 14,
                  fontWeight: "500",
                  textTransform: "uppercase",
                  color: Colors.text,
                }}
              >
                {title}
              </Text>
            ) : null;
          }}
          ListEmptyComponent={<NonIdealState type="noClients" />}
          ListFooterComponent={<Space size="large" />}
        />
      </Screen>
    );
  }
};

const styles = StyleSheet.create({
  container: {},
  searchBar: {},
  flatList: {},
});
