import React, { useCallback, useLayoutEffect, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { showPremiumMembershipModal, useUser } from "../../../../../redux";
import {
  SearchBar,
  Space,
  CircleIconButton,
  LeftChevronButton,
  Text,
} from "../../../../../components";
import { selectorConfigs } from "../../selector-config";
import { StaffSelectorItem } from "./staff-selector-item";
import { SelectorComponentType } from "../../selector";
import { useGetBusinessStaffQuery } from "../../../../../services";
import { useDispatch } from "react-redux";

export const StaffSelector: SelectorComponentType = ({ navigation, type }) => {
  const { headerTitle, searchPlaceholder, isReadOnly } = useMemo(
    () => selectorConfigs[type],
    [type]
  );
  const dispatch = useDispatch();

  const handleAddStaffPress = useCallback(() => {
    dispatch(showPremiumMembershipModal());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <LeftChevronButton onPress={() => navigation.goBack()} />
      ),
      headerRight: () =>
        !isReadOnly && (
          <CircleIconButton
            onPress={() => handleAddStaffPress()}
            withMarginRight
            iconType="add-staff"
          />
        ),
    });
  }, [navigation, headerTitle, isReadOnly, handleAddStaffPress]);

  const user = useUser();

  const {
    data: businessStaff,
    isError,
    isLoading,
    isSuccess,
  } = useGetBusinessStaffQuery(user ? user.businesses[0] : skipToken);

  if (isError) {
    return <Text>Error</Text>;
  }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isSuccess) {
    return (
      <FlatList
        ListHeaderComponent={
          <SearchBar
            value={""}
            style={styles.searchBar}
            autoCapitalize="none"
            placeholder={searchPlaceholder}
            autoComplete={"off"}
            autoCorrect={false}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer]}
        data={businessStaff.data}
        ItemSeparatorComponent={() => <Space size="small" />}
        renderItem={({ item }) => {
          return (
            <StaffSelectorItem
              type={"staff"}
              index={0}
              isSelected={false}
              disabled={false}
              item={item}
            />
          );
        }}
        // keyExtractor={(item, index) => `${item.name || ""}${index}`}
      />
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  searchBar: {},
  listContainer: {
    alignItems: "center",
  },
});
