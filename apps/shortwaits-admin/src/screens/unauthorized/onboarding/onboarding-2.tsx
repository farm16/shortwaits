import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { FlatList, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { DocType, ServicesType } from "@shortwaits/shared-types";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ActivityIndicator } from "react-native-paper";

import {
  ServiceCard,
  Screen,
  LeftChevronButton,
  Space,
  BottomSheet,
  BottomSheetType,
  useBottomSheet,
  Button,
  AddServiceForm,
  AddServiceFormValues,
  FloatingActionButton,
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

export interface OnboardingScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "onboarding-2-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export type SampleBusinessServices = number;

export const Onboarding2Screen = ({ navigation }: OnboardingScreenProps) => {
  const { Colors } = useTheme();
  const [form, setForm] = useState<AddServiceFormValues>({
    data: null,
    mode: null,
  });
  const business = useBusiness();
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);
  // const dispatch = useDispatch();

  // const [registerBusiness, postBusinessRegistrationMutationStatus] =
  //   usePostBusinessRegistrationMutation();

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

  useEffect(() => {
    console.log("form >>>", form);
  }, [form]);

  const handleCardOnPress = useCallback(
    (item: DocType<ServicesType>) => {
      setForm({ ...{ data: item, mode: "update" } });
      handleBottomSheet.expand();
    },
    [handleBottomSheet]
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
        <Button
          preset="none"
          text="Register"
          onPress={() => registerBusiness(business)}
          style={[
            {
              backgroundColor: Colors.orange1,
              borderColor: Colors.orange,
            },
            styles.registerButton,
          ]}
          textStyle={[
            {
              color: Colors.orange,
            },
            styles.registerButtonText,
          ]}
        />
      ),
    });
  }, [
    Colors,
    business,
    handleBusinessRegistration,
    navigation,
    registerBusiness,
  ]);

  if (isLoading || registerBusinessStatus.isLoading) {
    return <ActivityIndicator />;
  }
  if (isSuccess) {
    return (
      <Screen unsafe preset="fixed" style={styles.container}>
        <Space />
        <FlatList
          ItemSeparatorComponent={() => <Space size="tiny" />}
          contentContainerStyle={styles.contentContainer}
          data={services.data}
          renderItem={({ item }) => {
            return (
              <ServiceCard
                service={item}
                onPress={() => handleCardOnPress(item)}
              />
            );
          }}
          keyExtractor={(item) => String(item._id)}
        />
        <FloatingActionButton
          actions={[{ icon: "plus" }]}
          isBottomTab={false}
        />
        <BottomSheet
          snapPointsLevel={6}
          ref={bottomSheetRef}
          onClose={() => setForm({ ...{ data: null, mode: null } })}
        >
          {form.data ? (
            <AddServiceForm mode={form.mode} initialValues={form.data} />
          ) : null}
        </BottomSheet>
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
    fontSize: 15,
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
