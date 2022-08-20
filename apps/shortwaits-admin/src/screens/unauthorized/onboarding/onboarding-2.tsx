/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FlatList, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { ServicesType } from "@shortwaits/shared-types";

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
  Container,
} from "../../../components";
import { useTheme } from "../../../theme";
import {
  RootStackParamList,
  UnauthorizedStackParamList,
} from "../../../navigation";
import {
  useMobileAdmin,
  useUser,
  useBusiness,
  setSampleBusinessServicesByIndex,
} from "../../../redux";
import {
  usePostBusinessRegistrationMutation,
  useGetServicesByBusinessQuery,
} from "../../../services/shortwaits-api";
import { skipToken } from "@reduxjs/toolkit/dist/query";

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

  const business = useBusiness();
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);
  const dispatch = useDispatch();

  const [registerBusiness, postBusinessRegistrationMutationStatus] =
    usePostBusinessRegistrationMutation();

  //  TODO: user will not be able create new service during sign-up on update data
  const handleBusinessRegistration = useCallback(() => {
    return registerBusiness(business);
  }, [business, registerBusiness]);

  const servicesByBusinessQuery = useGetServicesByBusinessQuery(
    business ? String(business?._id) : skipToken
  );

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
        <Container>
          {/* <CircleIconButton
            noMargin
            iconType="add-services"
          
          /> */}
          <SubmitHeaderIconButton onPress={handleBusinessRegistration} />
        </Container>
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
        data={servicesByBusinessQuery.data.data}
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
        {/* <SimpleServiceForm
          mode="update"
          initialValues={servicesByBusinessQuery.data.data[sampleServicesIndex]}
          onSubmit={(formData) => {
            // dispatch(
            //   setSampleBusinessServicesByIndex({
            //     data: formData,
            //     index: sampleServicesIndex,
            //   })
            // );
            handleBottomSheet.close();
          }} */}
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
