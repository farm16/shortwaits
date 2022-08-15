import React, { FC, useLayoutEffect, useMemo } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Spinner from "react-native-spinkit";

import { useMobileAdmin, useBusiness, useUser } from "../../../../../redux";
import {
  SearchBar,
  Space,
  CircleIconButton,
  LeftChevronButton,
  Text,
} from "../../../../../components";
import { ModalsScreenProps } from "../../../../../navigation";
import { selectorConfigs } from "../../selector-config";
import {
  OnboardingCategoriesSelectorItem,
  SelectorItem,
} from "./staff-selector-item";
import { useTheme } from "../../../../../theme";
import { SelectorComponentType } from "../../selector";
import { useGetBusinessStaffQuery } from "apps/shortwaits-admin/src/services/shortwaits-api";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const OnboardingCategoriesSelector: SelectorComponentType = ({
  navigation,
  type,
}) => {
  const { headerTitle, searchPlaceholder, isReadOnly } = useMemo(
    () => selectorConfigs[type],
    [type]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <LeftChevronButton onPress={() => navigation.goBack()} />
      ),
      headerRight: () =>
        !isReadOnly && <CircleIconButton iconType="add-staff" />,
    });
  }, [navigation, headerTitle, isReadOnly]);

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
            <OnboardingCategoriesSelectorItem
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
