import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { FC, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { BusinessLabelType } from "@shortwaits/shared-lib";
import { BackButton, IconButton, Space, Text } from "@shortwaits/shared-ui";
import { useDispatch } from "react-redux";
import { ModalsScreenProps } from "../../../../../navigation";
import { useGetBusinessQuery } from "../../../../../services";
import { showPremiumMembershipModal, useUser } from "../../../../../store";
import { selectorConfigs } from "../../selector-config";
import { LabelSelectorItem } from "./labels-selector-item";

export const EventLabelsSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const { type, onGoBack, data, multiple = false } = route.params;

  const { headerTitle } = useMemo(() => selectorConfigs[type], [type]);

  const dispatch = useDispatch();
  const handleAddLabels = useCallback(() => {
    dispatch(showPremiumMembershipModal());
  }, [dispatch]);

  const user = useUser();
  const { data: payload, isError, isLoading, isSuccess } = useGetBusinessQuery(user ? user.businesses[0] : skipToken);
  const [selectedItems, setSelectedItems] = useState<BusinessLabelType[]>((data as BusinessLabelType[]) ?? []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <BackButton
          onPress={() => {
            onGoBack(selectedItems);
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <IconButton onPress={() => handleAddLabels()} withMarginRight iconType="edit" />,
    });
  }, [navigation, headerTitle, handleAddLabels, onGoBack, selectedItems]);

  const handleOnSelect = item => {
    if (multiple) {
      const isItemPresent = selectedItems.some(_item => _item.emojiShortName === item.emojiShortName);
      if (isItemPresent) {
        const items = selectedItems.filter(selectedItem => selectedItem.emojiShortName !== item.emojiShortName);
        setSelectedItems(items);
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };

  if (isError) {
    return <Text>Error</Text>;
  }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  console.log("payload.data.labels", payload?.data?.labels);

  if (isSuccess) {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer]}
        data={payload.data.labels}
        ItemSeparatorComponent={() => <Space size="small" />}
        renderItem={({ item }) => {
          return (
            <LabelSelectorItem
              isSelected={multiple ? selectedItems.some(_item => _item.emojiShortName === item.emojiShortName) : undefined}
              disabled={false}
              item={item}
              onSelectItem={handleOnSelect}
            />
          );
        }}
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
