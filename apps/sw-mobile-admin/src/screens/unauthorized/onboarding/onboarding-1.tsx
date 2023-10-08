import { useDispatch } from "react-redux";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { StackActions } from "@react-navigation/native";

import { TextFieldCard, ButtonCard, Space, IconButton, Button, FormContainer } from "../../../components";
import { UnauthorizedScreenProps } from "../../../navigation";
import { getPrettyStringFromHours } from "../../../utils/time";
import { getArrCount } from "../../../utils";
import { useForm } from "../../../hooks";
import { useBusiness, useUser, setBusiness, useSignOut, useAuth, setBusinessCategories } from "../../../store";
import { useIntl } from "react-intl";

export const Onboarding1Screen: FC<UnauthorizedScreenProps<"onboarding-1-screen">> = ({ navigation }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [isCategoriesTouched, setIsCategoriesTouched] = useState(false);
  const signOut = useSignOut();
  const business = useBusiness();
  const user = useUser();
  const auth = useAuth();

  useEffect(() => {
    if (auth.token === null) {
      navigation.dispatch(StackActions.popToTop());
    }
  }, [auth, navigation]);

  const initialValues = {
    shortName: "",
    description: "",
    longName: "",
    phone1: "",
    country: "",
  };
  const { touched, errors, values, handleChange, handleSubmit } = useForm(
    {
      initialValues,
      onSubmit: formData => {
        dispatch(setBusiness(formData));
        navigation.navigate("unauthorized", {
          screen: "onboarding-2-screen",
        });
      },
    },
    "onboarding1"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: `Welcome ${user?.familyName || ""}`,
      headerTitle: intl.formatMessage(
        {
          id: "Onboarding_1_Screen.headerTitle",
        },
        {
          name: user?.username || "",
        }
      ),
      headerLeft: () => (
        <IconButton
          withMarginLeft
          iconType="account-cancel"
          onPress={() => {
            signOut();
          }}
        />
      ),
    });
  }, [intl, navigation, signOut, user?.username]);

  return (
    <FormContainer
      footer={
        <Button
          preset="secondary"
          text={intl.formatMessage({
            id: "Common.continue",
          })}
          onPress={e => {
            setIsCategoriesTouched(true);
            if (!(!Array.isArray(business?.categories) || !business?.categories.length)) {
              handleSubmit();
            }
          }}
        />
      }
    >
      <Space />
      {/**
       * @todo UploadProfileImage needs to connect to
       * aws for images
       * <UploadProfileImage preset="small" />
       * <Space />
       **/}
      <TextFieldCard
        title={intl.formatMessage({
          id: "Onboarding_1_Screen.businessName",
        })}
        placeholder={intl.formatMessage({
          id: "Onboarding_1_Screen.businessName.placeholder",
        })}
        value={values.shortName}
        onChangeText={handleChange("shortName")}
        isTouched={touched.shortName}
        errors={errors.shortName}
      />
      <TextFieldCard
        title={intl.formatMessage({
          id: "Onboarding_1_Screen.businessDescription",
        })}
        placeholder={intl.formatMessage({
          id: "Onboarding_1_Screen.businessDescription.placeholder",
        })}
        multiline
        maxLength={150} // get reduced to 140 by the form's validation
        value={values.description}
        onChangeText={handleChange("description")}
        isTouched={touched.description}
        errors={errors.description}
      />
      <ButtonCard
        title={intl.formatMessage({
          id: "Onboarding_1_Screen.businessCategories",
        })}
        subTitle={intl.formatMessage(
          {
            id: "Common.Count",
          },
          {
            count: getArrCount(business?.categories ?? []),
          }
        )}
        errors={
          !Array.isArray(business?.categories) || !business?.categories.length ? "this field is required" : undefined
        }
        isTouched={isCategoriesTouched}
        onPress={() => {
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "categories",
              multiple: true,
              closeOnSelect: true,
              onSelect: (categories: string[]) => {
                dispatch(setBusinessCategories(categories));
              },
            },
          });
        }}
      />
      {/**
       * @TODO
       * schedule should default should be 5 days per week
       */}
      <ButtonCard
        title={intl.formatMessage({
          id: "Onboarding_1_Screen.businessHours",
        })}
        subTitle={
          getPrettyStringFromHours(business?.hours, intl.locale) ??
          intl.formatMessage({
            id: "Onboarding_1_Screen.businessHours.placeholder",
          })
        }
        onPress={() =>
          navigation.navigate("modals", {
            screen: "schedule-modal-screen",
            params: {
              hours: business.hours,
              headerTitle: "Business Hours",
              onSubmit: hours => {
                console.log("hours", hours);
                dispatch(setBusiness({ hours }));
              },
            },
          })
        }
      />
      <ButtonCard
        title={intl.formatMessage({
          id: "Onboarding_1_Screen.businessStaff",
        })}
        // subTitle={getArrCount(business?.staff ?? [])}
        subTitle={intl.formatMessage(
          {
            id: "Common.Count",
          },
          {
            count: getArrCount(business?.staff ?? []),
          }
        )}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "staff",
              closeOnSelect: false,
              onSelect: staff => {
                console.log("staff", staff);
              },
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
        subTitle={getPrettyStringFromCurrencyType(business?.currency!)}
        onPress={() =>{}
        }
      /> */}
    </FormContainer>
  );
};
