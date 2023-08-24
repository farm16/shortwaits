import React, { FC, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { showPremiumMembershipModal, useUser } from "../../../../../store";
import { SearchBar, Space, IconButton, LeftChevronButton, Text, BackButton } from "../../../../../components";
import { selectorConfigs } from "../../selector-config";
import { LabelSelectorItem } from "./labels-selector-item";
import { useGetBusinessQuery } from "../../../../../services";
import { useDispatch } from "react-redux";
import { ModalsScreenProps } from "../../../../../navigation";

export const LabelsSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const {
    type,
    onSelect,
    // searchable,
    closeOnSubmit,
    multiple = false,
  } = route.params;

  const { headerTitle, searchPlaceholder, isReadOnly } = useMemo(() => selectorConfigs[type], [type]);

  const handleAddLabels = useCallback(() => {
    dispatch(showPremiumMembershipModal());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => !isReadOnly && <IconButton onPress={() => handleAddLabels()} withMarginRight iconType="add" />,
    });
  }, [navigation, headerTitle, isReadOnly, handleAddLabels]);

  const user = useUser();
  const { data: payload, isError, isLoading, isSuccess } = useGetBusinessQuery(user ? user.businesses[0] : skipToken);

  const [selectedItems, setSelectedItems] = useState(payload?.data?.labels ?? []);

  const handleOnSelect = item => {
    if (multiple) {
      if (selectedItems.includes(item._id)) {
        setSelectedItems(selectedItems.filter(id => id !== item._id));
      } else {
        setSelectedItems([...selectedItems, item._id]);
      }
    } else {
      if (closeOnSubmit) {
        onSelect(item);
        navigation.goBack();
      } else {
        onSelect(item);
      }
    }
  };

  if (isError) {
    return <Text>Error</Text>;
  }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isSuccess) {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer]}
        data={payload.data.labels}
        ItemSeparatorComponent={() => <Space size="small" />}
        renderItem={({ item }) => {
          return <LabelSelectorItem isSelected={false} disabled={false} item={item} onSelectItem={handleOnSelect} />;
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
