import React, { FC, useCallback, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

import { Space, Screen, Text, BackButton, ServiceItem, IconButton } from "../../../components";
import { ModalsScreenProps } from "../../../navigation";
import { useBusiness } from "../../../store";
import { useGetServicesQuery } from "../../../services";
import { useIntl } from "react-intl";

export const ServicesModal: FC<ModalsScreenProps<"service-modal-screen">> = ({ navigation, route }) => {
  const business = useBusiness();
  const intl = useIntl();
  const { data: services, isLoading: isServicesLoading, isSuccess: isServicesSuccess, refetch: refetchServices } = useGetServicesQuery(business?._id ?? skipToken);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <IconButton
          iconType="add"
          withMarginRight
          onPress={() => {
            navigation.navigate("modals", {
              screen: "add-service-modal-screen",
              params: {
                onSubmit: () => {
                  refetchServices();
                },
              },
            });
          }}
        />
      ),
      headerTitle: () => (
        <Text
          preset="text"
          text={intl.formatMessage({
            id: "Common.services",
          })}
        />
      ),
    });
  }, [intl, navigation, refetchServices]);

  useFocusEffect(
    useCallback(() => {
      refetchServices();
    }, [refetchServices])
  );

  const isLoading = isServicesLoading;

  if (isLoading) return <ActivityIndicator />;

  return (
    <Screen unsafe preset="fixed" withHorizontalPadding>
      <Space size="small" />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={async () => {
              await refetchServices();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <Space size="tiny" />}
        contentContainerStyle={styles.contentContainer}
        data={services.data}
        renderItem={({ item }) => {
          return (
            <ServiceItem
              service={item}
              onPress={_service => {
                navigation.navigate("modals", {
                  screen: "update-service-modal-screen",
                  params: {
                    initialValues: _service,
                    onSubmit: () => {
                      refetchServices();
                    },
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
    paddingBottom: 24,
  },
});
