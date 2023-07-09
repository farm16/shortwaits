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
  Button,
  CircleIconButton,
} from "../../../components";
import { useTheme } from "../../../theme";
import {
  RootStackParamList,
  UnauthorizedStackParamList,
} from "../../../navigation";
import { useBusiness } from "../../../redux";
import {
  useGetServicesByBusinessQuery,
  useRegisterBusinessMutation,
} from "../../../services";
import LinearGradient from "react-native-linear-gradient";

export interface OnboardingScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "onboarding-2-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export type SampleBusinessServices = number;

export const Onboarding2Screen = ({ navigation }: OnboardingScreenProps) => {
  const { Colors } = useTheme();
  const business = useBusiness();

  //  TODO: user will not be able create new service during sign-up on update data
  const handleBusinessRegistration = useCallback(() => {
    return null;
    // return registerBusiness(business);
  }, []);

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
  const [registerBusiness, registerBusinessStatus] =
    useRegisterBusinessMutation();

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

  if (isLoading || registerBusinessStatus.isLoading) {
    return <ActivityIndicator />;
  }
  if (isSuccess) {
    return (
      <>
        <Screen unsafe preset="fixed" style={styles.container}>
          <Space />
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
        <LinearGradient
          colors={[Colors.background, Colors.background, Colors.brandAccent2]}
          style={{
            alignItems: "center",
            alignSelf: "stretch",
            paddingTop: 30,
            paddingBottom: 65,
          }}
        >
          <Button
            preset={"secondary"}
            text="REGISTER"
            onPress={(e) => registerBusiness(business)}
          />
        </LinearGradient>
      </>
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
