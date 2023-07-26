import React, { FC, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  Space,
  LeftChevronButton,
  AnimatedSearchBar,
  IconButton,
  Container,
} from "../../../../../components";
import { StaticSelectorItem } from "./static-selector-item";
import { ModalsScreenProps } from "../../../../../navigation";

export const StaticSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({
  navigation,
  route,
}) => {
  const {
    headerTitle,
    data,
    onSelect,
    closeOnSubmit = true,
    multiple = false,
  } = route.params;

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isListSearchable, setIsListSearchable] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <LeftChevronButton onPress={() => navigation.goBack()} />
      ),
      headerRight: () => (
        <Container direction="row" alignItems="center">
          <IconButton
            withMarginRight
            iconType={isListSearchable ? "search-close" : "search"}
            onPress={() => {
              setIsListSearchable(s => !s);
            }}
          />
        </Container>
      ),
    });
  }, [navigation, headerTitle, isListSearchable]);

  const handleOnSelect = (
    item: string | { title: string; subTitle: string }
  ) => {
    if (closeOnSubmit) {
      onSelect(item);
      navigation.goBack();
    } else {
      onSelect(item);
    }
  };

  return (
    <>
      <AnimatedSearchBar
        onChangeText={text => {
          setSearchText(text);
          const filteredItems = data.filter(
            (item: string | { title: string; subTitle: string }) => {
              // Adjust the filtering logic based on your data structure
              if (typeof item === "string") {
                return item.toLowerCase().includes(text.toLowerCase());
              } else {
                return (
                  item.title.toLowerCase().includes(text.toLowerCase()) ||
                  item.subTitle.toLowerCase().includes(text.toLowerCase())
                );
              }
            }
          );
          setFilteredData(filteredItems);
        }}
        isVisible={isListSearchable}
      />
      <FlatList
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={filteredData}
        ItemSeparatorComponent={() => <Space size="small" />}
        renderItem={({ item }) => {
          return (
            <StaticSelectorItem
              multiple={multiple}
              item={item}
              onSelectItem={handleOnSelect}
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
