import { AnimatedSearchBar, BackButton, Container, IconButton, NonIdealState, NonIdealStateTypes, Screen } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { GenericModalData, ModalsScreenProps } from "../../../../../navigation";
import { StaticSelectorItem } from "./static-selector-item";

export const StaticSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const { headerTitle, onGoBack, onSubmit, data, onSelect, searchable, nonIdealStateType = "noData" } = route.params;

  const _data = data as GenericModalData[];
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(_data);
  const [isListSearchable, setIsListSearchable] = useState(searchable ?? false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
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

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    const filteredItems = _data.filter(item => {
      // Adjust the filtering logic based on your data structure
      return item?.title?.toLowerCase().includes(text.toLowerCase()) || item?.subTitle?.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData(filteredItems);
  };

  const renderItem = useCallback(
    ({ item }: { item: GenericModalData }) => {
      const handleOnSelect = _item => {
        onSelect && onSelect([_item]);
        navigation.goBack();
      };
      return (
        <StaticSelectorItem
          // itemRightIconName={itemRightIconName}
          // itemRightIconColor={itemRightIconColor}
          // multiple={multiple}
          item={item}
          onSelectItem={() => {
            handleOnSelect(item);
          }}
        />
      );
    },
    [onSelect, navigation]
  );

  return (
    <Screen preset="fixed" withHorizontalPadding unsafe>
      <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} />
      <FlatList
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={filteredData}
        ListEmptyComponent={() => <NonIdealState type={nonIdealStateType as NonIdealStateTypes} />}
        renderItem={renderItem}
      />
    </Screen>
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
