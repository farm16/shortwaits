import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { useBusiness, useMobileAdmin } from "../../../../../store";
import {
  // SearchBar,
  Space,
  LeftChevronButton,
  Text,
  Button,
} from "../../../../../components";
import { CategoriesSelectorItem } from "./categories-selector-item";
import { useGetCategoriesQuery } from "../../../../../services";
import { ModalsScreenProps } from "../../../../../navigation";
import { useTheme } from "../../../../../theme";
import { useIntl } from "react-intl";
import { noop } from "lodash";
import { ActivityIndicator } from "react-native-paper";

export const CategoriesSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const { onSelect = noop, onGoBack = noop, selectedData = [], searchable = false, multiple = false } = route.params;

  const business = useBusiness();
  const intl = useIntl();
  const [selectedItems, setSelectedItems] = useState(business.categories ?? []);

  const handleOnGoBack = useCallback(
    payload => {
      onGoBack(payload);
      onSelect(payload);
      navigation.goBack();
    },
    [navigation, onGoBack, onSelect]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: intl.formatMessage({ id: "Common.categories" }),
      headerLeft: () => (
        <LeftChevronButton
          onPress={() => handleOnGoBack(selectedItems)}
          counter={selectedItems?.length > 0 ? `(${selectedItems.length})` : ""}
        />
      ),
    });
  }, [handleOnGoBack, intl, navigation, selectedItems]);

  const { Colors } = useTheme();

  const { data: categories, isError, isLoading, isSuccess } = useGetCategoriesQuery(undefined);
  const { preferredLanguage, suggestedLanguage } = useMobileAdmin();
  const language = preferredLanguage || suggestedLanguage;
  /**
   * TODO: handle error to non ideal state
   */

  const renderItem = useCallback(
    ({ item }) => {
      const handleOnSelect = item => {
        if (multiple) {
          if (selectedItems.includes(item._id)) {
            setSelectedItems(selectedItems.filter(id => id !== item._id));
          } else {
            setSelectedItems([...selectedItems, item._id]);
          }
        } else {
          handleOnGoBack(item);
        }
      };
      return (
        <CategoriesSelectorItem
          language={language}
          item={item}
          onSelectItem={handleOnSelect}
          isSelected={selectedItems.includes(item._id)}
          multiple={multiple}
        />
      );
    },
    [handleOnGoBack, language, multiple, selectedItems]
  );

  const keyExtractor = useCallback(item => item._id, []);

  if (isError) {
    return <Text>Error</Text>;
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isSuccess) {
    return (
      <FlatList
        style={{
          backgroundColor: Colors.backgroundOverlay,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={categories.data}
        ItemSeparatorComponent={() => <Space size="small" />}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {},
  searchBar: {},
  flatList: {},
});
