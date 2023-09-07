import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BusinessUsersDtoType } from "@shortwaits/shared-lib";
import { useDispatch } from "react-redux";

import { AnimatedSearchBar, Container, LeftChevronButton, IconButton, Text } from "../../../../../components";
import { StaffSelectorItem } from "./staff-selector-item";
import { useGetBusinessStaffQuery } from "../../../../../services";
import { ModalsScreenProps } from "../../../../../navigation";
import { showPremiumMembershipModal, useUser } from "../../../../../store";
import { ActivityIndicator } from "react-native-paper";

// Utility function to filter users based on search text
function filterBusinessUsers(searchText: string, users: BusinessUsersDtoType) {
  return users.filter(item =>
    ["username", "email", "displayName", "familyName", "givenName", "middleName"].some(prop =>
      item[prop].toLowerCase().includes(searchText.toLowerCase())
    )
  );
}

export const StaffSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const {
    searchable = true,
    onSelect,
    closeOnSelect = true,
    headerTitle = "Staff",
    selectedData,
    multiple,
    onGoBack,
    onSubmit,
    minSelectedItems,
    maxSelectedItems,
  } = route.params;

  const dispatch = useDispatch();

  const handleAddStaffPress = useCallback(() => {
    dispatch(showPremiumMembershipModal());
  }, [dispatch]);

  const user = useUser();
  const {
    data: payload,
    isError,
    isLoading,
    isSuccess,
  } = useGetBusinessStaffQuery(user ? user.businesses[0] : skipToken);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<BusinessUsersDtoType>([]);
  const [isListSearchable, setIsListSearchable] = useState(false);
  const [selectedItems, setSelectedItems] = useState(selectedData);

  useEffect(() => {
    if (payload?.data && isSuccess) {
      const initialFilteredData = filterBusinessUsers(searchText, payload.data ?? []);
      setFilteredData(initialFilteredData);
    }
  }, [isSuccess, payload, searchText]);

  useLayoutEffect(() => {
    const handleOnGoBack = () => {
      if (multiple) {
        if (onSubmit) {
          onSubmit(selectedItems);
        }
        if (onGoBack) {
          onGoBack(selectedItems);
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
          <IconButton onPress={() => handleAddStaffPress()} withMarginRight iconType="add-staff" />
        </Container>
      ),
    });
  }, [
    handleAddStaffPress,
    headerTitle,
    isListSearchable,
    multiple,
    navigation,
    onGoBack,
    onSubmit,
    searchable,
    selectedItems,
  ]);

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    const filteredItems = filterBusinessUsers(text, payload.data);
    setFilteredData(filteredItems);
  };

  const handleOnSelect = useCallback(
    item => {
      if (multiple) {
        if (selectedItems?.includes(item._id)) {
          if (minSelectedItems) {
            if (selectedItems.length <= minSelectedItems) {
              Alert.alert("Warning", `You must select at least ${minSelectedItems} staff member`);
            } else {
              setSelectedItems(selectedItems.filter(i => i !== item._id));
            }
          }
        } else {
          if (maxSelectedItems) {
            if (selectedItems.length >= maxSelectedItems) {
              Alert.alert("Warning", `You can only select ${maxSelectedItems} staff members`);
            } else {
              setSelectedItems([...selectedItems, item._id]);
            }
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

  const getItemIconName = item => {
    if (multiple) {
      return selectedItems?.includes(item._id) ? "check" : "none";
    }
    return undefined;
  };

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
          renderItem={({ item }) => (
            <StaffSelectorItem
              iconName={getItemIconName(item)}
              item={item}
              onSelectItem={() => {
                handleOnSelect(item);
              }}
            />
          )}
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
