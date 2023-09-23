import React, { FC, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { useBusiness } from "../../../../../store";
import {
  // SearchBar,
  Space,
  LeftChevronButton,
  Text,
  Button,
} from "../../../../../components";
import { selectorConfigs } from "../../selector-config";
import { CategoriesSelectorItem } from "./categories-selector-item";
import { useGetCategoriesQuery } from "../../../../../services";
import { ModalsScreenProps } from "../../../../../navigation";
import { useTheme } from "../../../../../theme";

export const CategoriesSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const { type, onSelect, searchable, closeOnSelect, multiple = false } = route.params;

  const business = useBusiness();
  const [selectedItems, setSelectedItems] = useState(business.categories ?? []);

  const { headerTitle, searchPlaceholder, isReadOnly } = useMemo(() => selectorConfigs[type], [type]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} />,
      headerRight: () =>
        multiple ? (
          <Button
            text="Done"
            preset="headerLink"
            onPress={() => {
              if (closeOnSelect) {
                onSelect(selectedItems);
                navigation.goBack();
              } else {
                onSelect(selectedItems);
              }
            }}
          />
        ) : null,
    });
  }, [navigation, headerTitle, multiple, closeOnSelect, onSelect, selectedItems]);

  const { Colors } = useTheme();

  const handleOnSelect = item => {
    if (multiple) {
      if (selectedItems.includes(item._id)) {
        setSelectedItems(selectedItems.filter(id => id !== item._id));
      } else {
        setSelectedItems([...selectedItems, item._id]);
      }
    } else {
      if (closeOnSelect) {
        onSelect(item);
        navigation.goBack();
      } else {
        onSelect(item);
      }
    }
  };

  const { data: categories, isError, isLoading, isSuccess } = useGetCategoriesQuery(undefined);

  // console.log(categories);

  /**
   * TODO: handle error to non ideal state
   */

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isSuccess) {
    // return null;
    return (
      <FlatList
        style={{
          backgroundColor: Colors.backgroundOverlay,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer]}
        //data={insertIsSelected(categories.data)}
        data={categories.data}
        ItemSeparatorComponent={() => <Space size="small" />}
        renderItem={({ item }) => {
          return (
            <CategoriesSelectorItem
              item={item}
              onSelectItem={handleOnSelect}
              isSelected={selectedItems.includes(item._id)}
              multiple={multiple}
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
