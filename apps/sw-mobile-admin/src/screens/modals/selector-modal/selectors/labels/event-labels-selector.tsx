import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ActivityIndicator, BackButton, Button, FormContainer, Messages, Space, compareFormObjectsBeforeAbort } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useLayoutEffect, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { ModalsScreenProps } from "../../../../../navigation";
import { useGetBusinessQuery } from "../../../../../services";
import { showPremiumMembershipModal, useUser } from "../../../../../store";
import { LabelSelectorItem } from "./labels-selector-item";

const MIN_SELECTED_ITEMS_DEFAULT = 0; // Define your minimum selected items here
const MAX_SELECTED_ITEMS_DEFAULT = 5; // Define your maximum selected items here

export const EventLabelsSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const {
    selectedData = [],
    minSelectedItems = MIN_SELECTED_ITEMS_DEFAULT,
    maxSelectedItems = MAX_SELECTED_ITEMS_DEFAULT,
    headerTitle = "Select labels",
    onGoBack,
    onSubmit,
  } = route.params;

  const dispatch = useDispatch();
  const user = useUser();
  const { data: businessData, isError, isLoading, isSuccess } = useGetBusinessQuery(user ? user.businesses[0] : skipToken);

  console.log("selectedData >>>", selectedData);
  const _initialSelectedLabels = useRef(selectedData);
  const _selectedLabels = useRef(selectedData);

  const handleAddLabels = useCallback(() => {
    dispatch(showPremiumMembershipModal());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <BackButton
          onPress={() => {
            compareFormObjectsBeforeAbort({
              obj1: _initialSelectedLabels.current,
              obj2: _selectedLabels.current,
              onAbort: () => {
                navigation.goBack();
              },
            });
          }}
        />
      ),
    });
  }, [businessData?.data?.labels, handleAddLabels, headerTitle, navigation, onGoBack]);

  const renderSubmitButton = useCallback(() => {
    const handleOnSubmit = () => {
      if (onSubmit) {
        const _labels = businessData?.data?.labels.filter(label => _selectedLabels.current.includes(label.emojiShortName));
        onSubmit(_labels);
      }
      navigation.goBack();
    };
    return onSubmit ? <Button text={`Done`} onPress={handleOnSubmit} /> : null;
  }, [onSubmit, navigation, businessData?.data?.labels]);

  const handleOnSelect = item => {
    if (_selectedLabels.current.includes(item.emojiShortName)) {
      _selectedLabels.current = _selectedLabels.current.filter(label => label !== item.emojiShortName);
    } else {
      _selectedLabels.current = [..._selectedLabels.current, item.emojiShortName];
    }
  };

  if (isError) {
    return <Messages type="error" message="An error occurred" />;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FormContainer preset="fixed" footer={renderSubmitButton()}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer]}
        data={businessData?.data?.labels}
        ItemSeparatorComponent={() => <Space size="small" />}
        renderItem={({ item }) => {
          return (
            <LabelSelectorItem
              item={item}
              initialIsSelected={_selectedLabels?.current?.includes(item.emojiShortName)}
              onSelect={() => {
                handleOnSelect(item);
              }}
            />
          );
        }}
      />
    </FormContainer>
  );

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
