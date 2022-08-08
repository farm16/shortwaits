import { useDispatch } from "react-redux";
import React, { FC, useLayoutEffect } from "react";

import {
  CancelAndLogOutHeaderButton,
  Screen,
  TextFieldCard,
  ButtonCard,
  Space,
  RightChevronButton,
} from "@shortwaits/admin/components";
import { UnauthorizedScreenProps } from "@shortwaits/admin/navigation/navigation-types";
import { useUser } from "@shortwaits/admin/hooks/useUser";
import { getPrettyStringFromHours } from "@shortwaits/admin/utils/time";
import { getStaffCount } from "@shortwaits/admin/utils/staff";
import { useBusiness } from "@shortwaits/admin/hooks/useBusiness";
import { persistor } from "@shortwaits/admin/redux";
import {
  setBusinessDescription,
  setBusinessShortName,
} from "@shortwaits/admin/redux/business";
import { isEmpty } from "lodash";
import { useForm } from "@shortwaits/admin/hooks/useForm";

export const Onboarding1Screen: FC<
  UnauthorizedScreenProps<"onboarding-1-screen">
> = ({ navigation }) => {
  const dispatch = useDispatch();

  const businessState = useBusiness();
  const userState = useUser();

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
      headerTitle: `Welcome ${userState?.firstName || ""}`,
      headerLeft: () => (
        <CancelAndLogOutHeaderButton
          onPress={async () => {
            await persistor.purge();
            dispatch({ type: "USER_SIGN_OUT" });
            navigation.navigate("welcome-screen");
          }}
        />
      ),
      headerRight: () => (
        <RightChevronButton
          state={isEmpty(errors) ? "enabled" : "disabled"}
          onPress={handleSubmit}
        />
      ),
    });
  }, [navigation, userState?.firstName, dispatch, handleSubmit, errors]);

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
        title="Business name"
        placeholder="Shortwaits LLC"
        value={values.businessShortName}
        onChangeText={handleChange("businessShortName")}
        isTouched={touched.businessShortName}
        errors={errors.businessShortName}
      />
      <Space size="small" />
      <TextFieldCard
        title="Business description"
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
        title="Business categories"
        subTitle="Select any applicable category"
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "My-Business-Categories",
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
        title="Business hours"
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
              type: "My-Business-Staff",
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
