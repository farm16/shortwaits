import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BackButton, IconButton, Space } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch } from "react-redux";
import { ModalsScreenProps } from "../../../../../navigation";
import { useGetBusinessQuery } from "../../../../../services";
import { showPremiumMembershipModal, useUser } from "../../../../../store";
import { selectorConfigs } from "../../selector-config";
import { LabelSelectorItem } from "./labels-selector-item";

export const LabelsSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const { mode, onSelect } = route.params;

  const dispatch = useDispatch();
  const { headerTitle, searchPlaceholder, isReadOnly } = useMemo(() => selectorConfigs[mode], [mode]);

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

  console.log("payload >>>", JSON.stringify(payload?.data));

  const handleOnSelect = item => {
    if (selectedItems.includes(item._id)) {
      setSelectedItems(selectedItems.filter(id => id !== item._id));
    } else {
      setSelectedItems([...selectedItems, item._id]);
    }
  };

  if (isError) {
    Alert.alert("Error", "An error occurred while fetching labels");
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.listContainer]}
      data={payload.data.labels}
      ItemSeparatorComponent={() => <Space size="small" />}
      renderItem={({ item }) => {
        return <LabelSelectorItem item={item} onSelect={handleOnSelect} />;
      }}
      // keyExtractor={(item, index) => `${item.name || ""}${index}`}
    />
  );
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
