import React, { FC, useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { Space, LeftChevronButton, AnimatedSearchBar, IconButton, Container } from "../../../../../components";
import { StaticSelectorItem } from "./static-selector-item";
import { ModalsScreenProps } from "../../../../../navigation";
import { FlatList } from "react-native-gesture-handler";

export const StaticSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const {
    headerTitle,
    data,
    onSelect,
    closeOnSubmit = true,
    multiple = false,
    searchable,
    itemRightIconName,
    itemRightIconColor,
  } = route.params;

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isListSearchable, setIsListSearchable] = useState(searchable ?? false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <Container direction="row" alignItems="center">
          {searchable ? null : (
            <IconButton
              withMarginRight
              iconType={isListSearchable ? "search-close" : "search"}
              onPress={() => {
                setIsListSearchable(s => !s);
              }}
            />
          )}
        </Container>
      ),
    });
  }, [navigation, headerTitle, isListSearchable, searchable]);

  const handleOnSelect = item => {
    if (closeOnSubmit) {
      onSelect(item);
      navigation.goBack();
    } else {
      onSelect(item);
    }
  };

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    const filteredItems = data.filter(item => {
      // Adjust the filtering logic based on your data structure
      if (typeof item === "string") {
        return item.toLowerCase().includes(text.toLowerCase());
      } else {
        return (
          item?.title?.toLowerCase().includes(text.toLowerCase()) ||
          item?.subTitle?.toLowerCase().includes(text.toLowerCase())
        );
      }
    });
    setFilteredData(filteredItems);
  };

  return (
    <>
      <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} />
      <FlatList
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={filteredData}
        renderItem={({ item }) => {
          return (
            <StaticSelectorItem
              itemRightIconName={itemRightIconName}
              itemRightIconColor={itemRightIconColor}
              multiple={multiple}
              item={item}
              onSelectItem={() => {
                handleOnSelect(item);
              }}
            />
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingTop: 16,
    alignItems: "center",
  },
});
