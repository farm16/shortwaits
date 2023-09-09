import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, ActivityIndicator } from "react-native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ClientUsersDtoType } from "@shortwaits/shared-lib";
import { useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { AnimatedSearchBar, Container, LeftChevronButton, IconButton, Text } from "../../../../../components";
import { ClientsSelectorItem } from "./clients-selector-item";
import { useGetBusinessClientsQuery } from "../../../../../services";
import { ModalsScreenProps } from "../../../../../navigation";
import { showPremiumMembershipModal, useUser } from "../../../../../store";
import { useTheme } from "../../../../../theme";

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
    onSubmit,
    minSelectedItems = MIN_SELECTED_ITEMS_DEFAULT,
    maxSelectedItems = MAX_SELECTED_ITEMS_DEFAULT,
  } = route.params;

  const dispatch = useDispatch();
  const { Colors } = useTheme();
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

  function filterClientUsers(searchText: string, users: ClientUsersDtoType) {
    return users.filter(item =>
      ["username", "email", "displayName", "familyName", "givenName", "middleName"].some(
        prop => item[prop] ?? "".toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }

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
      headerLeft: () => (
        <Container direction="row" alignItems="center">
          <LeftChevronButton onPress={() => handleOnGoBack()} />
          <Text
            preset="none"
            style={{
              color: Colors.brandSecondary,
              fontWeight: "600",
              padding: 0,
              marginTop: -2,
              marginLeft: -4,
              fontSize: 18,
            }}
            text={multiple && selectedItems.length > 0 ? `(${selectedItems.length})` : ""}
          />
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
  }, [
    Colors.brandSecondary,
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

  const keyExtractor = useCallback(item => item._id, []);

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
          keyExtractor={keyExtractor}
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
