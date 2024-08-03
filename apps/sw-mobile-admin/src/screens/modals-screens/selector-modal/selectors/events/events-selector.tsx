import { EventDtoType } from "@shortwaits/shared-lib";
import { BackButton, Container, IconButton, NonIdealState, NonIdealStateTypes, Screen, Space } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ModalsScreenProps } from "../../../../../navigation";
import { EventsSelectorItem } from "./events-selector-item";

export const EventsSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const { headerTitle, data, searchable, nonIdealStateType = "noData" } = route.params;

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<EventDtoType[]>((data as EventDtoType[]) ?? []);
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

  const renderItem = useCallback(({ item }: ListRenderItemInfo<EventDtoType>) => {
    return <EventsSelectorItem item={item} />;
  }, []);

  return (
    <Screen preset="fixed" withHorizontalPadding unsafe>
      {/* <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} /> */}
      <Space />
      <FlatList
        style={styles.container}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={styles.listContainer}
        data={filteredData}
        ListEmptyComponent={() => <NonIdealState type={nonIdealStateType as NonIdealStateTypes} />}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Space size="tiny" />}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
