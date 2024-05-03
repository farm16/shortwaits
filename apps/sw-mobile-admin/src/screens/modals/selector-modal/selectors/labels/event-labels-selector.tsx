import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BusinessLabelType } from "@shortwaits/shared-lib";
import { BackButton, Button, FormContainer, IconButton, Space, Text, compareFormObjectsBeforeAbort } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { ModalsScreenProps } from "../../../../../navigation";
import { useGetBusinessQuery } from "../../../../../services";
import { showPremiumMembershipModal, useUser } from "../../../../../store";
import { selectorConfigs } from "../../selector-config";
import { LabelSelectorItem } from "./labels-selector-item";

export const EventLabelsSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const { mode, onSelect, onGoBack, onSubmit, data, multiple = false } = route.params;

  const { headerTitle } = useMemo(() => selectorConfigs[mode], [mode]);

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
            if (onGoBack) {
              onGoBack(selectedItems);
            }
            compareFormObjectsBeforeAbort({
              obj1: data,
              obj2: selectedItems,
              onAbort: () => {
                navigation.goBack();
              },
            });
          }}
        />
      ),
      headerRight: () => <IconButton onPress={() => handleAddLabels()} withMarginRight iconType="add" />,
    });
  }, [data, handleAddLabels, headerTitle, navigation, onGoBack, selectedItems]);

  const handleOnSelect = item => {
    if (onSelect) {
      onSelect(item);
    }
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

  const renderSubmitButton = useCallback(
    () => (
      <Button
        disabled={selectedItems.length === 0}
        preset={selectedItems.length === 0 ? "primary-disabled" : "primary"}
        text={`Add ${selectedItems.length > 1 ? "labels" : "label"}`}
        onPress={() => {
          if (onSubmit) {
            onSubmit(selectedItems);
          }
          navigation.goBack();
        }}
      />
    ),
    [navigation, onSubmit, selectedItems]
  );

  if (isError) {
    return <Text>Error</Text>;
  }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isSuccess) {
    return (
      <FormContainer preset="fixed" footer={renderSubmitButton()}>
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
      </FormContainer>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  searchBar: {},
  listContainer: {
    alignItems: "center",
  },
});
