import React, { useLayoutEffect, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";

import { useBusiness } from "../../../../../redux";
import {
  SearchBar,
  Space,
  LeftChevronButton,
  Text,
} from "../../../../../components";
import { selectorConfigs } from "../../selector-config";
import { CategoriesSelectorItem } from "./categories-selector-item";
import { SelectorComponentType } from "../../selector";
import { useGetCategoriesQuery } from "../../../../../services";

export const CategoriesSelector: SelectorComponentType = ({
  navigation,
  type,
}) => {
  const { headerTitle, searchPlaceholder, isReadOnly } = useMemo(
    () => selectorConfigs[type],
    [type]
  );

  const business = useBusiness();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <LeftChevronButton onPress={() => navigation.goBack()} />
      ),
      headerRight: undefined,
    });
  }, [navigation, headerTitle, isReadOnly]);

  const {
    data: categories,
    isError,
    isLoading,
    isSuccess,
  } = useGetCategoriesQuery(undefined);

  console.log(categories);

  // const insertIsSelected = (arr: CategoriesPayloadType[]) => {
  //   return arr.map((elem) => ({ ...elem, isSelected: false }));
  // };
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
          <>
            <SearchBar
              value={""}
              style={styles.searchBar}
              autoCapitalize="none"
              placeholder={searchPlaceholder}
              autoComplete={"off"}
              autoCorrect={false}
            />
            <Space size="small" />
          </>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer]}
        //data={insertIsSelected(categories.data)}
        data={categories.data}
        ItemSeparatorComponent={() => <Space size="small" />}
        renderItem={({ item }) => {
          return (
            <CategoriesSelectorItem
              business={business}
              type={"categories"}
              index={0}
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
