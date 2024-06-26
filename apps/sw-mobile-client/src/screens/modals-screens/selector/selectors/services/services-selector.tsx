import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ListRenderItem, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useFocusEffect } from "@react-navigation/native";
import { ServiceDtoType, ServicesDtoType } from "@shortwaits/shared-lib";
import { AnimatedSearchBar, BackButton, Container, IconButton, NonIdealState, ServiceItem, Space, Text } from "@shortwaits/shared-ui";
import { noop } from "lodash";
import { useIntl } from "react-intl";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ModalsScreenProps } from "../../../../../navigation";
import { useGetServicesQuery } from "../../../../../services";
import { useBusiness } from "../../../../../store";

/**
 * TODO: handle error to non ideal state
 */
export const ServicesSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const {
    onSelect,
    selectedData = [],
    onGoBack = noop,
    searchable,
    multiple = false, // there is no case where multiple is needed
  } = route.params;

  // const dispatch = useDispatch();

  const business = useBusiness();
  const intl = useIntl();

  const { data: services, isLoading, isSuccess, isError, refetch: refetchServices } = useGetServicesQuery(business?._id ?? skipToken);

  useFocusEffect(
    useCallback(() => {
      refetchServices();
    }, [refetchServices])
  );

  console.log("isLoading", isLoading);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<ServicesDtoType>([]);
  const [isListSearchable, setIsListSearchable] = useState(false);
  const [selectedItems, setSelectedItems] = useState(selectedData);

  function filterServicesUsers(searchText: string, services: ServicesDtoType) {
    return services.filter(item => ["name", "description"].some(prop => item[prop] ?? "".toLowerCase().includes(searchText.toLowerCase())));
  }

  useEffect(() => {
    if (services?.data && isSuccess) {
      const initialFilteredData = filterServicesUsers(searchText, services.data ?? []);
      setFilteredData(initialFilteredData);
    }
  }, [isSuccess, services, searchText]);

  useLayoutEffect(() => {
    const handleAddService = () => {
      // dispatch(showPremiumMembershipModal());
      navigation.navigate("modals", {
        screen: "add-service-modal-screen",
        params: {
          onSubmit: async () => {
            await refetchServices();
          },
        },
      });
    };
    const handleOnGoBack = () => {
      if (multiple) {
        const items = services?.data?.filter(item => selectedItems.includes(item._id)) || null;
        if (onGoBack) {
          onGoBack(items);
        }
        navigation.goBack();
      } else {
        navigation.goBack();
      }
    };
    navigation.setOptions({
      headerTitle: intl.formatMessage({ id: "Selectors.services.headerTitle" }),
      headerLeft: () => <BackButton onPress={handleOnGoBack} />,
      headerRight: () => (
        <Container direction="row" alignItems="center">
          {searchable ? (
            <IconButton
              withMarginRight
              iconType={isListSearchable ? "search-close" : "search"}
              onPress={() => {
                setIsListSearchable(s => !s);
              }}
            />
          ) : null}
          <IconButton onPress={() => handleAddService()} withMarginRight iconType="add" />
        </Container>
      ),
    });
  }, [intl, isListSearchable, multiple, navigation, onGoBack, refetchServices, searchable, selectedItems, services?.data]);

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    const filteredItems = filterServicesUsers(text, services.data);
    setFilteredData(filteredItems);
  };

  const handleOnSelect = useCallback(
    (item: ServiceDtoType) => {
      if (onSelect) {
        onSelect([item]);
        navigation.goBack();
      } else {
        navigation.goBack();
      }
    },
    [navigation, onSelect]
  );

  const renderItem: ListRenderItem<ServiceDtoType> = useCallback(
    ({ item }) => {
      return (
        <ServiceItem
          isSelected={selectedItems?.includes(item._id)}
          service={item}
          onPress={_service => {
            handleOnSelect(_service);
          }}
        />
      );
    },
    [handleOnSelect, selectedItems]
  );

  const renderSeparator = useCallback(() => <Space size="tiny" />, []);

  const keyExtractor = useCallback(item => item._id, []);

  if (isError) {
    return <Text>Error</Text>;
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isSuccess) {
    return (
      <>
        <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={async () => {
                await refetchServices();
              }}
            />
          }
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          data={filteredData}
          ItemSeparatorComponent={renderSeparator}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={<NonIdealState type="noServices" />}
          ListFooterComponent={<Space size="large" />}
        />
      </>
    );
  }

  return null;
};
const styles = StyleSheet.create({
  flatList: {},
  searchBar: {},
  flatListContainer: {},
});
