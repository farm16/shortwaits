import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
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
import { OnboardingCategoriesSelectorItem } from "./categories-selector-item";
import { useTheme } from "../../../../../theme";
import { SelectorComponentType } from "../../selector";
import {
  useGetAdminMobileQuery,
  useGetCategoriesQuery,
} from "apps/shortwaits-admin/src/services/shortwaits-api";
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
        !isReadOnly && <CircleIconButton iconType="add-categories" />,
    });
  }, [navigation, headerTitle, isReadOnly]);

  const {
    data: categories,
    isError,
    isLoading,
    isSuccess,
  } = useGetCategoriesQuery(undefined);

  console.log(categories);

  // if (isError) {
  //   return <Text>Error</Text>;
  // }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isSuccess) {
    // return null;
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
        data={categories.data}
        ItemSeparatorComponent={() => <Space size="small" />}
        renderItem={({ item }) => {
          return (
            <OnboardingCategoriesSelectorItem
              type={"categories"}
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
