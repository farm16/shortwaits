import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BusinessUsersDtoType } from "@shortwaits/shared-utils";
import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch } from "react-redux";

import { AnimatedSearchBar, BackButton, Container, IconButton, NonIdealState, Screen, Text } from "../../../../../components";
import { ModalsScreenProps } from "../../../../../navigation";
import { useGetBusinessStaffQuery } from "../../../../../services";
import { showPremiumMembershipModal, useBusiness } from "../../../../../store";
import { StaffSelectorItem } from "./staff-selector-item";

const MIN_SELECTED_ITEMS_DEFAULT = 0; // Define your minimum selected items here
const MAX_SELECTED_ITEMS_DEFAULT = 10000; // Define your maximum selected items here

export const StaffSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const {
    searchable = true,
    onSelect,
    closeOnSelect = true,
    headerTitle = "Staff",
    selectedData = [],
    multiple,
    onGoBack,
    minSelectedItems = MIN_SELECTED_ITEMS_DEFAULT,
    maxSelectedItems = MAX_SELECTED_ITEMS_DEFAULT,
  } = route.params;

  const dispatch = useDispatch();
  const handleAddStaffPress = useCallback(() => {
    dispatch(showPremiumMembershipModal());
  }, [dispatch]);

  const business = useBusiness();

  const {
    data: payload,
    isError,
    isLoading,
    isSuccess,
  } = useGetBusinessStaffQuery(business ? business._id : skipToken, {
    refetchOnMountOrArgChange: true,
  });
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<BusinessUsersDtoType>([]);
  const [isListSearchable, setIsListSearchable] = useState(false);
  const [selectedItems, setSelectedItems] = useState(selectedData);

  function filterBusinessUsers(searchText: string, users: BusinessUsersDtoType) {
    return users.filter(item =>
      ["username", "email", "displayName", "familyName", "givenName", "middleName"].some(prop => item[prop] ?? "".toLowerCase().includes(searchText.toLowerCase()))
    );
  }

  useEffect(() => {
    if (payload?.data && isSuccess) {
      const initialFilteredData = filterBusinessUsers(searchText, payload.data ?? []);
      setFilteredData(initialFilteredData);
    }
  }, [isSuccess, payload, searchText]);

  useLayoutEffect(() => {
    const handleOnGoBack = () => {
      if (multiple) {
        const items = payload?.data?.filter(item => selectedItems.includes(item._id)) || null;
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
          <IconButton onPress={() => handleAddStaffPress()} withMarginRight iconType="add-staff" />
        </Container>
      ),
    });
  }, [handleAddStaffPress, headerTitle, isListSearchable, multiple, navigation, onGoBack, payload?.data, searchable, selectedItems]);

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    const filteredItems = filterBusinessUsers(text, payload.data);
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
          screen: "business-staff-screen",
          params: {
            staff: item,
          },
        });
      }
    },
    [closeOnSelect, maxSelectedItems, minSelectedItems, multiple, navigation, onSelect, selectedItems]
  );

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <StaffSelectorItem
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
      <Screen preset="fixed" withHorizontalPadding unsafe>
        <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} />
        <FlatList
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={<NonIdealState type="noStaff" />}
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
