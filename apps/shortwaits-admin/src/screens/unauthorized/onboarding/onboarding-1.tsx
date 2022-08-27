import { useDispatch } from "react-redux";
import React, { FC, useEffect, useLayoutEffect } from "react";
import { isEmpty } from "lodash";
import { StackActions } from "@react-navigation/native";

import {
  Screen,
  TextFieldCard,
  ButtonCard,
  Space,
  RightChevronButton,
  CircleIconButton,
} from "../../../components";
import { UnauthorizedScreenProps } from "../../../navigation";
import { getPrettyStringFromHours } from "../../../utils/time";
import { getStaffCount } from "../../../utils/staff";
import { useForm } from "../../../hooks";
import {
  useBusiness,
  useUser,
  setBusinessDescription,
  setBusinessShortName,
  useSignOut,
  useAuth,
} from "../../../redux";

export const Onboarding1Screen: FC<
  UnauthorizedScreenProps<"onboarding-1-screen">
> = ({ navigation }) => {
  const dispatch = useDispatch();

  const signOut = useSignOut();
  const businessState = useBusiness();
  const user = useUser();
  const auth = useAuth();

  useEffect(() => {
    if (auth.token === null) {
      navigation.dispatch(StackActions.popToTop());
    }
  }, [auth, navigation]);

  const initialValues = {
    businessShortName: "",
    businessDescription: "",
  };
  const { touched, errors, values, handleChange, handleSubmit } = useForm(
    {
      initialValues,
      onSubmit: (formData) => {
        dispatch(
          setBusinessDescription({ description: formData.businessDescription })
        );
        dispatch(
          setBusinessShortName({ shortName: formData.businessShortName })
        );
        navigation.navigate("unauthorized", {
          screen: "onboarding-2-screen",
        });
      },
    },
    "onBoarding1"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Welcome ${user?.firstName || ""}`,
      headerLeft: () => (
        <CircleIconButton
          isHeaderLeft
          iconType="account-cancel"
          onPress={() => {
            signOut();
          }}
        />
      ),
      headerRight: () => (
        <RightChevronButton
          state={isEmpty(errors) ? "enabled" : "disabled"}
          onPress={(e) => handleSubmit()}
        />
      ),
    });
  }, [navigation, user?.firstName, dispatch, handleSubmit, errors, signOut]);

  return (
    <Screen preset="scroll" style={{ alignItems: "center" }}>
      <Space />
      {/**
       * @todo UploadProfileImage needs to connect to
       * aws for images
       * <UploadProfileImage preset="small" />
       * <Space />
       **/}
      <TextFieldCard
        title="Business Name"
        placeholder={`The name of your business`}
        value={values.businessShortName}
        onChangeText={handleChange("businessShortName")}
        isTouched={touched.businessShortName}
        errors={errors.businessShortName}
      />
      <Space size="small" />
      <TextFieldCard
        title="Business Description"
        placeholder="A short description about your business"
        multiline
        maxLength={150} // get reduced to 140 by the form's validation
        value={values.businessDescription}
        onChangeText={handleChange("businessDescription")}
        isTouched={touched.businessDescription}
        errors={errors.businessDescription}
      />
      <Space size="small" />
      <ButtonCard
        title="Business Categories"
        subTitle="Select any applicable category"
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "categories",
            },
          })
        }
      />
      <Space size="small" />
      {/**
       * @TODO
       * schedule should default should be 5 days per week
       */}
      <ButtonCard
        title="Business Hours"
        subTitle={getPrettyStringFromHours(businessState?.hours)}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "schedule-modal-screen",
            params: {
              type: "My-Business-Hours",
            },
          })
        }
      />
      <Space size="small" />
      <ButtonCard
        title="Personnel"
        subTitle={getStaffCount(businessState?.staff)}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "staff",
            },
          })
        }
      />
      {/**
       * @todo
       * Select Currency is disabled for MVP should be for premium
       */}
      {/* <ButtonCard
        disabled
        title="Currency"
        subTitle={getPrettyStringFromCurrencyType(businessState?.currency!)}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "My-Business-Currency"
            }
          })
        }
      /> */}
    </Screen>
  );
};
