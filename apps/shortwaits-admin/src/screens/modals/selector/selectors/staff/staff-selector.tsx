import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { hidePremiumMembershipModal, useUser } from "../../../../../redux";
import {
  SearchBar,
  Space,
  CircleIconButton,
  LeftChevronButton,
  Text,
  BottomSheet,
  BottomSheetType,
  useBottomSheet,
} from "../../../../../components";
import { selectorConfigs } from "../../selector-config";
import { StaffSelectorItem } from "./staff-selector-item";
import { SelectorComponentType } from "../../selector";
import { useGetBusinessStaffQuery } from "../../../../../services/shortwaits-api";
import { useDispatch } from "react-redux";

export const StaffSelector: SelectorComponentType = ({ navigation, type }) => {
  const { headerTitle, searchPlaceholder, isReadOnly } = useMemo(
    () => selectorConfigs[type],
    [type]
  );
  const bottomSheetRef = useRef<BottomSheetType>(null);
  // const handleBottomSheet = useBottomSheet(bottomSheetRef);
  const dispatch = useDispatch();
  const handleCardOnPress = useCallback(() => {
    dispatch(hidePremiumMembershipModal());
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
            onPress={() => handleCardOnPress()}
            iconType="add-staff"
          />
        ),
    });
  }, [navigation, headerTitle, isReadOnly, handleCardOnPress]);

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
      <>
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
        <BottomSheet snapPoints={["77%"]} ref={bottomSheetRef}>
          {/* <SimpleServiceForm
            mode="update"
            initialValues={}
            onSubmit={(formData) => {}}
          /> */}
        </BottomSheet>
      </>
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
