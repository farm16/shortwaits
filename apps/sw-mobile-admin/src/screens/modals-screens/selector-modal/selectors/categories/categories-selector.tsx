import { BackButton, Button, FormContainer, Space, Text, useTheme } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { FlatList, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { ModalsScreenProps } from "../../../../../navigation";
import { useGetCategoriesQuery } from "../../../../../services";
import { useMobileAdmin } from "../../../../../store";
import { CategoriesSelectorItem } from "./categories-selector-item";

export const CategoriesSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const { onSelect, onSubmit, onGoBack, selectedData = [], searchable = false } = route.params;

  const { Colors } = useTheme();
  const intl = useIntl();
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedData ?? []);
  const { data: categories, isError, isLoading } = useGetCategoriesQuery();
  const { preferredLanguage, suggestedLanguage } = useMobileAdmin();
  const language = preferredLanguage || suggestedLanguage;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: intl.formatMessage({ id: "Common.categories" }),
      headerLeft: () => (
        <BackButton
          onPress={() => {
            if (onGoBack) {
              const _categories = categories?.data ? categories.data.filter(category => selectedItems.includes(category._id)) : [];
              onGoBack(_categories);
            }
            navigation.goBack();
          }}
        />
      ),
    });
  }, [categories, categories?.data, intl, navigation, onGoBack, selectedItems]);

  /**
   * TODO: handle error to non ideal state
   */
  const renderItem = useCallback(
    ({ item }) => {
      const handleOnSelect = item => {
        if (onSelect) {
          onSelect([item]);
          navigation.goBack();
        } else {
          if (selectedItems.includes(item._id)) {
            setSelectedItems(selectedItems.filter(id => id !== item._id));
          } else {
            setSelectedItems([...selectedItems, item._id]);
          }
        }
      };
      return <CategoriesSelectorItem language={language} item={item} onSelectItem={handleOnSelect} isSelected={selectedItems.includes(item._id)} />;
    },
    [language, navigation, onSelect, selectedItems]
  );

  const keyExtractor = useCallback(item => item._id, []);

  if (isError) {
    return <Text>Error</Text>;
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }

  const submitButton = onSubmit ? (
    <Button
      preset="secondary"
      text={intl.formatMessage({
        id: "Common.done",
      })}
      onPress={() => {
        onSubmit(categories.data.filter(category => selectedItems.includes(category._id)));
        navigation.goBack();
      }}
    />
  ) : null;

  return (
    <FormContainer preset="fixed" footer={submitButton} withHorizontalPadding={false} unsafeBottom>
      <FlatList
        style={{
          backgroundColor: Colors.lightBackground,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={categories.data}
        ItemSeparatorComponent={() => <Space size="small" />}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchBar: {},
  button: {
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  flatList: {
    paddingHorizontal: 16,
  },
});
