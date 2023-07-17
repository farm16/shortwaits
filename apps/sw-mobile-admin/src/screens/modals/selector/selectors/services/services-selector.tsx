import React, { FC, useCallback, useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ActivityIndicator } from "react-native-paper";

import {
  ServiceItem,
  Screen,
  LeftChevronButton,
  Space,
} from "../../../../../components";
import { useBusiness } from "../../../../../store";
import { useGetServicesByBusinessQuery } from "../../../../../services";
import { ModalsScreenProps } from "../../../../../navigation";

/**
 * TODO: handle error to non ideal state
 */
export const ServicesSelector: FC<
  ModalsScreenProps<"selector-modal-screen">
> = ({ navigation, route }) => {
  const { onSelect, data } = route.params;

  const business = useBusiness();

  const {
    data: services,
    isLoading,
    isSuccess,
    isUninitialized,
  } = useGetServicesByBusinessQuery(
    data || !business?._id ? skipToken : business._id
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Services",
      headerLeft: () => (
        <LeftChevronButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  const List = useCallback(
    data => (
      <Screen unsafe preset="fixed" style={styles.container}>
        <Space size="small" />
        <FlatList
          ItemSeparatorComponent={() => <Space size="tiny" />}
          contentContainerStyle={styles.contentContainer}
          data={data}
          renderItem={({ item }) => {
            return (
              <ServiceItem
                service={item}
                onPress={_service => {
                  onSelect(_service);
                  navigation.goBack();
                }}
              />
            );
          }}
          keyExtractor={item => String(item._id)}
        />
      </Screen>
    ),
    [navigation, onSelect]
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isSuccess) {
    return List(services.data);
  }

  if (data) {
    return List(data);
  }
};
const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
  },
  bottomSheetHeader: {
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  listSeparator: {
    borderTopWidth: 1,
    marginVertical: 5,
  },
  registerButton: {
    borderWidth: 2,
    paddingVertical: 1.75,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  fab: {
    position: "absolute",
    marginRight: 25,
    marginBottom: 40,
    right: 0,
    bottom: 0,
  },
});
