import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ClientUsersDtoType } from "@shortwaits/shared-lib";
import { useDispatch } from "react-redux";

import { AnimatedSearchBar, Container, LeftChevronButton, IconButton, Text } from "../../../../../components";
import { ClientsSelectorItem } from "./clients-selector-item";
import { useGetBusinessClientsQuery } from "../../../../../services";
import { ModalsScreenProps } from "../../../../../navigation";
import { showPremiumMembershipModal, useUser } from "../../../../../store";
import { ActivityIndicator } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

function filterClientUsers(searchText: string, users: ClientUsersDtoType) {
  return users.filter(item =>
    ["username", "email", "displayName", "familyName", "givenName", "middleName"].some(
      prop => item[prop] ?? "".toLowerCase().includes(searchText.toLowerCase())
    )
  );
}

export const ClientsSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const {
    searchable = true,
    onSelect,
    closeOnSelect = true,
    headerTitle = "Clients",
    selectedData = [],
    multiple,
    onGoBack,
    onSubmit,
    minSelectedItems,
    maxSelectedItems,
  } = route.params;

  const dispatch = useDispatch();

  const handleAddClientPress = useCallback(() => {
    dispatch(showPremiumMembershipModal());
  }, [dispatch]);

  const user = useUser();
  const {
    data: payload,
    isError,
    isLoading,
    isSuccess,
  } = useGetBusinessClientsQuery(user ? user.businesses[0] : skipToken);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<ClientUsersDtoType>([]);
  const [isListSearchable, setIsListSearchable] = useState(false);
  const [selectedItems, setSelectedItems] = useState(selectedData);

  useEffect(() => {
    if (payload?.data && isSuccess) {
      const initialFilteredData = filterClientUsers(searchText, payload.data ?? []);
      setFilteredData(initialFilteredData);
    }
  }, [isSuccess, payload, searchText]);

  useLayoutEffect(() => {
    const handleOnGoBack = () => {
      if (multiple) {
        const items = payload?.data?.filter(item => selectedItems.includes(item._id));
        if (onSubmit) {
          onSubmit(items);
        }
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
      headerLeft: () => <LeftChevronButton onPress={() => handleOnGoBack()} />,
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
  }, [
    handleAddClientPress,
    headerTitle,
    isListSearchable,
    multiple,
    navigation,
    onGoBack,
    onSubmit,
    payload?.data,
    searchable,
    selectedItems,
  ]);

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    const filteredItems = filterClientUsers(text, payload.data);
    setFilteredData(filteredItems);
  };
  console.log(">>> selectedData", selectedItems.length);

  const handleOnSelect = useCallback(
    item => {
      if (multiple) {
        if (selectedItems?.includes(item._id)) {
          if (minSelectedItems) {
            if (selectedItems.length <= minSelectedItems) {
              Alert.alert("Warning", `You must select at least ${minSelectedItems} Clients member`);
            } else {
              setSelectedItems(selectedItems.filter(i => i !== item._id));
            }
          } else {
            setSelectedItems(selectedItems.filter(i => i !== item._id));
          }
        } else {
          if (maxSelectedItems) {
            if (selectedItems.length >= maxSelectedItems) {
              Alert.alert("Warning", `You can only select ${maxSelectedItems} Clients members`);
            } else {
              setSelectedItems(selectedItems => [...selectedItems, item._id]);
            }
          } else {
            setSelectedItems(selectedItems => [...selectedItems, item._id]);
          }
        }
      } else if (closeOnSelect) {
        onSelect(item);
        navigation.goBack();
      } else {
        onSelect(item);
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

  if (isError) {
    return <Text>Error</Text>;
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isSuccess && payload.data) {
    return (
      <>
        <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} />
        <FlatList
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {},
  searchBar: {},
  flatList: {},
});
