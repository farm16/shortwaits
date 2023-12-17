import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useCallback, useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { BackButton, Button, FormContainer, IconButton, ServiceItem, Space } from "../../../components";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useGetServicesQuery, useRegisterBusinessMutation } from "../../../services";
import { useBusiness } from "../../../store";

export interface OnboardingScreenProps {
  navigation: CompositeNavigationProp<StackNavigationProp<UnauthorizedStackParamList, "onboarding-2-screen">, StackNavigationProp<RootStackParamList>>;
}

export const Onboarding2Screen = ({ navigation }: OnboardingScreenProps) => {
  const business = useBusiness();
  const intl = useIntl();
  const {
    data: services,
    isLoading,
    isSuccess,
    refetch,
  } = useGetServicesQuery(business ? business?._id : skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const handleCardOnPress = useCallback(
    item => {
      navigation.navigate("modals", {
        screen: "update-service-modal-screen",
        params: {
          initialValues: item,
        },
      });
    },
    [navigation]
  );
  const [registerBusiness, registerBusinessStatus] = useRegisterBusinessMutation();

  const handleBusinessRegistration = useCallback(() => {
    registerBusiness(business);
  }, [business, registerBusiness]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: intl.formatMessage({
        id: "Onboarding_2_Screen.headerTitle",
      }),
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <IconButton
          onPress={() =>
            navigation.navigate("modals", {
              screen: "add-service-modal-screen",
            })
          }
          iconType="add"
          withMarginRight
        />
      ),
    });
  }, [intl, navigation]);

  if (isLoading || registerBusinessStatus.isLoading) {
    return <ActivityIndicator />;
  }

  if (isSuccess) {
    return (
      <FormContainer
        preset="fixed"
        footer={
          <Button
            preset={"primary"}
            text={intl.formatMessage({
              id: "Onboarding_2_Screen.registerButton",
            })}
            onPress={e => handleBusinessRegistration()}
          />
        }
      >
        <Space size="small" />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={async () => {
                await refetch();
              }}
            />
          }
          ItemSeparatorComponent={() => <Space size="tiny" />}
          contentContainerStyle={styles.contentContainer}
          data={services.data}
          renderItem={({ item }) => {
            return <ServiceItem service={item} onPress={() => handleCardOnPress(item)} />;
          }}
          keyExtractor={item => String(item._id)}
        />
      </FormContainer>
    );
  }
};
const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 24,
  },
});
