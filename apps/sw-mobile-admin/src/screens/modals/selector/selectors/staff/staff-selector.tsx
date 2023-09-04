import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BusinessUsersDtoType } from "@shortwaits/shared-lib";
import { useDispatch } from "react-redux";

import { AnimatedSearchBar, Container, LeftChevronButton, IconButton, Text } from "../../../../../components";
import { selectorConfigs } from "../../selector-config";
import { StaffSelectorItem } from "./staff-selector-item";
import { useGetBusinessStaffQuery } from "../../../../../services";
import { ModalsScreenProps } from "../../../../../navigation";
import { showPremiumMembershipModal, useUser } from "../../../../../store";

// Utility function to filter users based on search text
function filterBusinessUsers(searchText: string, users: BusinessUsersDtoType) {
  return users.filter(item =>
    ["username", "email", "displayName", "familyName", "givenName", "middleName"].some(prop =>
      item[prop].toLowerCase().includes(searchText.toLowerCase())
    )
  );
}

export const StaffSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const { type, searchable = true, onSelect, closeOnSelect = true } = route.params;

  const { headerTitle, searchPlaceholder } = useMemo(() => selectorConfigs[type], [type]);

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

  useEffect(() => {
    if (payload.data) {
      const initialFilteredData = filterBusinessUsers(searchText, payload.data);
      setFilteredData(initialFilteredData);
    }
  }, [payload, searchText]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} />,
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
  }, [handleAddStaffPress, headerTitle, isListSearchable, navigation, searchable]);

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    const filteredItems = filterBusinessUsers(text, payload.data);
    setFilteredData(filteredItems);
  };

  const handleOnSelect = useCallback(
    item => {
      if (closeOnSelect) {
        onSelect(item);
        navigation.goBack();
      } else {
        onSelect(item);
      }
    },
    [closeOnSelect, navigation, onSelect]
  );

  if (isError) {
    return <Text>Error</Text>;
  }
  if (isLoading) {
    return <Text>Loading...</Text>;
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
