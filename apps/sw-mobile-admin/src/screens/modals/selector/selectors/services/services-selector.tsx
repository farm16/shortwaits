import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ActivityIndicator } from "react-native-paper";

import {
  ServiceItem,
  Screen,
  Text,
  LeftChevronButton,
  Space,
  Container,
  IconButton,
  AnimatedSearchBar,
  NonIdealState,
} from "../../../../../components";
import { showPremiumMembershipModal, useBusiness } from "../../../../../store";
import { useGetServicesByBusinessQuery } from "../../../../../services";
import { ModalsScreenProps } from "../../../../../navigation";
import { useDispatch } from "react-redux";
import { ServicesDtoType } from "@shortwaits/shared-lib";

/**
 * TODO: handle error to non ideal state
 */
export const ServicesSelector: FC<ModalsScreenProps<"selector-modal-screen">> = ({ navigation, route }) => {
  const {
    onSelect,
    closeOnSelect = true,
    headerTitle = "Services",
    selectedData = [],
    onGoBack,
    searchable,
    multiple = false, // there is no case where multiple is needed
  } = route.params;

  const dispatch = useDispatch();
  const handleAddStaffPress = useCallback(() => {
    dispatch(showPremiumMembershipModal());
  }, [dispatch]);
  const business = useBusiness();

  const {
    data: services,
    isLoading,
    isSuccess,
    isError,
  } = useGetServicesByBusinessQuery(business?._id ? business._id : skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<ServicesDtoType>([]);
  const [isListSearchable, setIsListSearchable] = useState(false);
  const [selectedItems, setSelectedItems] = useState(selectedData);

  function filterServicesUsers(searchText: string, services: ServicesDtoType) {
    return services.filter(item =>
      ["name", "description"].some(prop => item[prop] ?? "".toLowerCase().includes(searchText.toLowerCase()))
    );
  }

  useEffect(() => {
    if (services?.data && isSuccess) {
      const initialFilteredData = filterServicesUsers(searchText, services.data ?? []);
      setFilteredData(initialFilteredData);
    }
  }, [isSuccess, services, searchText]);

  useLayoutEffect(() => {
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
      headerTitle: headerTitle,
      headerLeft: () => <LeftChevronButton onPress={handleOnGoBack} />,
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
          <IconButton onPress={() => handleAddStaffPress()} withMarginRight iconType="add" />
        </Container>
      ),
    });
  }, [
    handleAddStaffPress,
    headerTitle,
    isListSearchable,
    multiple,
    navigation,
    onGoBack,
    searchable,
    selectedItems,
    services?.data,
  ]);

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    const filteredItems = filterServicesUsers(text, services.data);
    setFilteredData(filteredItems);
  };

  const handleOnSelect = useCallback(
    item => {
      if (closeOnSelect && onSelect) {
        onSelect(item);
        navigation.goBack();
      } else if (onSelect) {
        onSelect(item);
      } else {
        navigation.navigate("authorized-stack", {
          screen: "business-client-screen",
          params: {
            client: item,
          },
        });
      }
    },
    [closeOnSelect, navigation, onSelect]
  );

  const renderItem = useCallback(
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

  if (isSuccess && services.data) {
    return (
      <>
        <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} />
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          data={filteredData}
          ItemSeparatorComponent={renderSeparator}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          maxToRenderPerBatch={10}
          ListEmptyComponent={<NonIdealState type="noServices" />}
        />
      </>
    );
  }
};
const styles = StyleSheet.create({
  flatList: {},
  searchBar: {},
  flatListContainer: {
    flex: 1,
  },
});
