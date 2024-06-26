import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BusinessUsersDtoType } from "@shortwaits/shared-lib";
import { ActivityIndicator, BackButton, Container, IconButton, NonIdealState, Screen, Text } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { ModalsScreenProps } from "../../../../../navigation";
import { useGetBusinessStaffQuery } from "../../../../../services";
import { useBusiness, useStaff } from "../../../../../store";
import { StaffSelectorItem } from "./staff-selector-item";

const MIN_SELECTED_ITEMS_DEFAULT = 0; // Define your minimum selected items here
const MAX_SELECTED_ITEMS_DEFAULT = 10000; // Define your maximum selected items here

export const StaffSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const {
    searchable = true,
    onSelect,
    headerTitle = "Staff",
    selectedData = [],
    onGoBack,
    minSelectedItems = MIN_SELECTED_ITEMS_DEFAULT,
    maxSelectedItems = MAX_SELECTED_ITEMS_DEFAULT,
  } = route.params;

  const business = useBusiness();
  const staff = useStaff();
  const [selectedItems, setSelectedItems] = useState(selectedData);
  const { isError, isLoading } = useGetBusinessStaffQuery(business ? business._id : skipToken, {
    refetchOnMountOrArgChange: true,
  });
  // const [filteredData, setFilteredData] = useState<BusinessUsersDtoType>(staff ? staff : []);
  // const [isListSearchable, setIsListSearchable] = useState(false);

  const handleAddStaffPress = useCallback(() => {
    navigation.navigate("modals", {
      screen: "add-staff-modal-screen",
    });
  }, [navigation]);

  function filterBusinessUsers(searchText: string, users: BusinessUsersDtoType) {
    return users.filter(item =>
      ["username", "email", "displayName", "familyName", "givenName", "middleName"].some(prop => item[prop] ?? "".toLowerCase().includes(searchText.toLowerCase()))
    );
  }

  useLayoutEffect(() => {
    const handleOnGoBack = () => {
      const items = staff.filter(item => selectedItems.includes(item._id)) || null;
      if (onGoBack) {
        onGoBack(items);
      }
      navigation.goBack();
    };

    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <Container direction="row" alignItems="center">
          <BackButton onPress={() => handleOnGoBack()} />
        </Container>
      ),
      headerRight: () => (
        <Container direction="row" alignItems="center">
          {/* {searchable ? (
            <IconButton
              withMarginRight
              iconType={isListSearchable ? "search-close" : "search"}
              onPress={() => {
                setIsListSearchable(s => !s);
              }}
            />
          ) : null} */}
          <IconButton onPress={() => handleAddStaffPress()} withMarginRight iconType="add-staff" />
        </Container>
      ),
    });
  }, [handleAddStaffPress, headerTitle, navigation, onGoBack, searchable, selectedItems, staff]);

  // const handleOnChangeText = (text: string) => {
  //   const filteredItems = filterBusinessUsers(text, staff);
  //   setFilteredData(filteredItems);
  // };

  const handleOnSelect = useCallback(
    item => {
      if (maxSelectedItems && selectedItems.length >= maxSelectedItems) {
        Alert.alert("Warning", `You can only select ${maxSelectedItems}`);
      } else {
        setSelectedItems(selectedItems => [...selectedItems, item._id]);
      }
      if (onSelect) {
        onSelect(item);
        navigation.goBack();
      } else {
        navigation.navigate("authorized-stack", {
          screen: "business-staff-screen",
          params: {
            staff: item,
          },
        });
      }
    },
    [maxSelectedItems, navigation, onSelect, selectedItems]
  );

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <StaffSelectorItem
          item={item}
          onSelect={() => {
            handleOnSelect(item);
          }}
        />
      );
    },
    [handleOnSelect]
  );

  const keyExtractor = useCallback(item => item._id, []);

  if (isError) {
    return <Text>Error</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Screen preset="fixed" withHorizontalPadding unsafe>
      {/* <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} /> */}
      <FlatList
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={staff}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={<NonIdealState type="noStaff" />}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchBar: {},
  flatList: {},
});
