import React, { useCallback, useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { DocType, ServicesType } from "@shortwaits/shared-types";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ActivityIndicator } from "react-native-paper";

import {
  ServiceItem,
  Screen,
  LeftChevronButton,
  Space,
  CircleIconButton,
} from "../../../../../components";
import {
  RootStackParamList,
  ModalStackParamList,
} from "../../../../../navigation";
import { useBusiness } from "../../../../../redux";
import { useGetServicesByBusinessQuery } from "../../../../../services";

export interface ServicesSelectorModalScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ModalStackParamList, "selector-modal-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export const ServicesSelector = ({
  navigation,
}: ServicesSelectorModalScreenProps) => {
  const business = useBusiness();

  const {
    data: services,
    // isError,
    // isFetching,
    isLoading,
    isSuccess,
  } = useGetServicesByBusinessQuery(business ? business?._id : skipToken);

  const handleCardOnPress = useCallback(
    (item: DocType<ServicesType>) => {
      navigation.navigate("modals", {
        screen: "service-modal-screen",
        params: {
          initialValues: item,
          mode: "update",
        },
      });
    },
    [navigation]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Services",
      headerLeft: () => (
        <LeftChevronButton onPress={() => navigation.goBack()} />
      ),
      headerRight: () => (
        <CircleIconButton
          onPress={() =>
            navigation.navigate("modals", {
              screen: "service-modal-screen",
              params: {
                mode: "create",
              },
            })
          }
          iconType="add"
          withMarginRight
        />
      ),
    });
  }, [navigation]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isSuccess) {
    return (
      <Screen unsafe preset="fixed" style={styles.container}>
        <Space size="small" />
        <FlatList
          ItemSeparatorComponent={() => <Space size="tiny" />}
          contentContainerStyle={styles.contentContainer}
          data={services.data}
          renderItem={({ item }) => {
            return (
              <ServiceItem
                service={item}
                onPress={() => handleCardOnPress(item)}
              />
            );
          }}
          keyExtractor={(item) => String(item._id)}
        />
      </Screen>
    );
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
