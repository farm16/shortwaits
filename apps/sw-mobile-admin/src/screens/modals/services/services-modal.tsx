import React, { FC, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ActivityIndicator } from "react-native-paper";

import { Space, Screen, Text, BackButton, ServiceItem, IconButton } from "../../../components";
import { ModalsScreenProps } from "../../../navigation";
import { useBusiness } from "../../../store";
import { useGetServicesByBusinessQuery } from "../../../services";

export const ServicesModal: FC<ModalsScreenProps<"service-modal-screen">> = ({ navigation, route }) => {
  const business = useBusiness();
  const {
    data: services,
    isLoading,
    isSuccess,
    isUninitialized,
  } = useGetServicesByBusinessQuery(business?._id ?? skipToken);

  console.log("services >>>>");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <IconButton
          iconType="add"
          withMarginRight
          onPress={() => {
            navigation.navigate("modals", {
              screen: "form-modal-screen",
              params: {
                form: "addService",
              },
            });
          }}
        />
      ),
      headerTitle: () => <Text preset="text" text={"Service"} />,
    });
  }, [navigation]);

  if (isLoading || isUninitialized) return <ActivityIndicator />;

  return (
    <Screen unsafe preset="fixed">
      <Space size="small" />
      <FlatList
        ItemSeparatorComponent={() => <Space size="tiny" />}
        contentContainerStyle={styles.contentContainer}
        data={services.data}
        renderItem={({ item }) => {
          return (
            <ServiceItem
              service={item}
              onPress={_service => {
                navigation.navigate("modals", {
                  screen: "form-modal-screen",
                  params: {
                    form: "updateService",
                    initialValues: _service,
                  },
                });
              }}
            />
          );
        }}
        keyExtractor={item => String(item._id)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
  },
});
