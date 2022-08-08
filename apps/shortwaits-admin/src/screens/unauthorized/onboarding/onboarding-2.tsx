/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import {
  ServiceCard,
  Screen,
  SubmitHeaderIconButton,
  LeftChevronButton,
  Space,
  BottomSheet,
  BottomSheetType,
  useBottomSheet,
  MultipleHeaderButtons,
  SimpleServiceForm,
} from "@/components";
import { useTheme } from "@/theme";
import {
  RootStackParamList,
  UnauthorizedStackParamList,
} from "@/navigation/navigation-types";
import { useMobileAdmin } from "@/hooks/useMobileAdmin";
import { ServicesType } from "@shortwaits/shared-types";
import { useBusiness } from "@/hooks/useBusiness";
import { setSampleBusinessServicesByIndex } from "@/redux/mobile-admin";
import { useUser } from "@/hooks/useUser";
import { usePostBusinessRegistrationMutation } from "@/services/api";

export interface Onboarding2ScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "onboarding-2-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export type SampleBusinessServices = number;

export const Onboarding2Screen = ({ navigation }: Onboarding2ScreenProps) => {
  const { Colors } = useTheme();
  const [sampleServicesIndex, setSampleServicesIndex] = useState<number>(0);
  const user = useUser();
  const mobileAdmin = useMobileAdmin();
  const business = useBusiness();
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);
  const dispatch = useDispatch();

  const [registerBusiness, { isSuccess, isError, isLoading }] =
    usePostBusinessRegistrationMutation();

  //  TODO: user will not be able create new service during sign-up on update data
  const handleBusinessRegistration = useCallback(() => {
    console.log("\nUserId", user._id);
    console.log("\nBusiness", JSON.stringify(business));
    console.log(
      "\nServices",
      JSON.stringify(mobileAdmin?.sampleBusinessData.services)
    );
    registerBusiness({
      userId: user._id,
      business,
      services: mobileAdmin?.sampleBusinessData.services!,
    });
  }, [
    business,
    mobileAdmin?.sampleBusinessData.services,
    registerBusiness,
    user._id,
  ]);

  const handleCardOnPress = useCallback(
    (index: number, _data: Partial<ServicesType>) => {
      setSampleServicesIndex(index);
      handleBottomSheet.expand();
    },
    [handleBottomSheet]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Services",
      headerLeft: () => (
        <LeftChevronButton onPress={() => navigation.goBack()} />
      ),
      headerRight: () => (
        <MultipleHeaderButtons>
          {/* <CircleIconButton
            noMargin
            iconType="add-services"
          
          /> */}
          <SubmitHeaderIconButton onPress={handleBusinessRegistration} />
        </MultipleHeaderButtons>
      ),
    });
  }, [handleBusinessRegistration, navigation]);

  const ItemSeparatorComponent = () => (
    <View
      style={[
        styles.listSeparator,
        { borderTopColor: Colors.backgroundOverlay },
      ]}
    />
  );
  return (
    <Screen preset="fixed" style={styles.container}>
      <Space />
      <FlatList
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={styles.contentContainer}
        data={mobileAdmin?.sampleBusinessData.services}
        renderItem={({ index, item }) => {
          return (
            <ServiceCard
              service={item}
              onPress={() => handleCardOnPress(index, item)}
            />
          );
        }}
        keyExtractor={(item, index) => item.name! + index}
      />
      <BottomSheet snapPoints={["77%"]} ref={bottomSheetRef}>
        <SimpleServiceForm
          mode="update"
          initialValues={
            mobileAdmin?.sampleBusinessData.services[sampleServicesIndex]
          }
          onSubmit={(formData) => {
            dispatch(
              setSampleBusinessServicesByIndex({
                data: formData,
                index: sampleServicesIndex,
              })
            );
            handleBottomSheet.close();
          }}
        />
      </BottomSheet>
    </Screen>
  );
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
});
