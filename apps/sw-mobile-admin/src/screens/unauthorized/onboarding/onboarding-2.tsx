import React, { useCallback, useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ActivityIndicator } from "react-native-paper";

import { ServiceItem, LeftChevronButton, Space, Button, IconButton, FormContainer } from "../../../components";
import { useTheme } from "../../../theme";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useBusiness } from "../../../store";
import { useGetServicesByBusinessQuery, useRegisterBusinessMutation } from "../../../services";

export interface OnboardingScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "onboarding-2-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export type SampleBusinessServices = number;

export const Onboarding2Screen = ({ navigation }: OnboardingScreenProps) => {
  const business = useBusiness();

  const {
    data: services,
    // isError,
    // isFetching,
    isLoading,
    isSuccess,
  } = useGetServicesByBusinessQuery(business ? business?._id : skipToken);

  const handleCardOnPress = useCallback(
    item => {
      navigation.navigate("modals", {
        screen: "service-modal-screen",
        params: {
          service: item,
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
      headerTitle: "Services",
      headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <IconButton
          onPress={() =>
            navigation.navigate("modals", {
              screen: "service-modal-screen",
            })
          }
          iconType="add"
          withMarginRight
        />
      ),
    });
  }, [navigation]);

  if (isLoading || registerBusinessStatus.isLoading) {
    return <ActivityIndicator />;
  }
  if (isSuccess) {
    return (
      <FormContainer
        preset="fixed"
        footer={<Button preset={"secondary"} text="Register" onPress={e => handleBusinessRegistration()} />}
      >
        <FlatList
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
