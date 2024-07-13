import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ActivityIndicator, BackButton, Button, FormContainer, IconButton, Messages, ServiceItem, Space, Text } from "@shortwaits/shared-ui";
import React, { useCallback, useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { FlatList, StyleSheet } from "react-native";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useGetServicesQuery, useRegisterBusinessMutation } from "../../../services";
import { useBusiness, useServices } from "../../../store";

export interface OnboardingScreenProps {
  navigation: CompositeNavigationProp<StackNavigationProp<UnauthorizedStackParamList, "onboarding-2-screen">, StackNavigationProp<RootStackParamList>>;
}

export const Onboarding2Screen = ({ navigation }: OnboardingScreenProps) => {
  const business = useBusiness();
  const services = useServices();

  const intl = useIntl();
  const { isLoading: isGetServicesQueryLoading, refetch } = useGetServicesQuery(business ? business?._id : skipToken, {
    refetchOnMountOrArgChange: true,
  });
  const [registerBusiness, registerBusinessStatus] = useRegisterBusinessMutation();

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

  const handleBusinessRegistration = useCallback(() => {
    registerBusiness(business);
  }, [business, registerBusiness]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text preset="headerTitle">
          {intl.formatMessage({
            id: "Onboarding_2_Screen.headerTitle",
          })}
        </Text>
      ),
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

  if (isGetServicesQueryLoading || registerBusinessStatus.isLoading) {
    return <ActivityIndicator />;
  }

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
      <Messages type={"info"} message={intl.formatMessage({ id: "Onboarding_2_Screen.infoMessage" })} />
      <Space />
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Space size="tiny" />}
        contentContainerStyle={styles.contentContainer}
        data={services}
        renderItem={({ item }) => {
          return <ServiceItem service={item} onPress={() => handleCardOnPress(item)} />;
        }}
        keyExtractor={item => String(item._id)}
      />
    </FormContainer>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 24,
  },
});
