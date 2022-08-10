import React, { FC, useLayoutEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Spinner from "react-native-spinkit";

import { useMobileAdmin } from "../../../hooks/useMobileAdmin";
import {
  SearchBar,
  Space,
  CircleIconButton,
  LeftChevronButton,
} from "../../../components";
import { ModalsScreenProps } from "../../../navigation/navigation-types";
import { useBusiness } from "../../../hooks/useBusiness";
import { selectorConfigs } from "./selector-config";
import { SelectorItem } from "./selector-Item";
import { useTheme } from "../../../theme";
import { useUser } from "../../../hooks/useUser";

export const SelectorScreenModal: FC<
  ModalsScreenProps<"selector-modal-screen">
> = ({ navigation, route }) => {
  const { type } = route.params;

  const { Colors } = useTheme();
  const businessState = useBusiness();
  const userState = useUser();

  const {
    mode,
    itemsQueryHook,
    searchOptions,
    getIsSelected,
    filterId,
    filterItemsQuery,
    keys: { businessKey },
  } = selectorConfigs[type];

  const isSelectionDisabled = mode === "NONE";
  const { isSearchable, searchPlaceholder } = searchOptions;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectorConfigs[type].headerTitle,
      headerLeft: () => (
        <LeftChevronButton onPress={() => navigation.goBack()} />
      ),
      headerRight: () =>
        isSelectionDisabled && <CircleIconButton iconType="default" />,
    });
  }, [navigation, isSelectionDisabled, type]);

  const {
    data: queryData,
    isLoading,
    isSuccess,
  } = itemsQueryHook(businessState, userState);

  console.log("queryData>>>", queryData);

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      {isSearchable && (
        <SearchBar
          value={""}
          style={styles.searchBar}
          autoCapitalize="none"
          placeholder={searchPlaceholder}
          autoComplete={"off"}
          autoCorrect={false}
        />
      )}
      <Space size="small" />
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContainer,
            { backgroundColor: Colors.background },
          ]}
          data={filterItemsQuery(queryData)}
          ItemSeparatorComponent={() => <Space size="small" />}
          renderItem={({ item, index }) => (
            <SelectorItem
              type={type}
              itemId={filterId(item)}
              index={index}
              disabled={isSelectionDisabled}
              isSelected={getIsSelected(item, businessState[businessKey])}
            />
          )}
          // keyExtractor={(item, index) => `${item.name || ""}${index}`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  searchBar: {
    marginTop: 15,
  },
  listContainer: {
    alignItems: "center",
  },
});
