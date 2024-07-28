import { StackActions } from "@react-navigation/native";
import { CategoriesDtoType } from "@shortwaits/shared-lib";
import { Button, ButtonCard, FormContainer, IconButton, Text, TextFieldCard, getArrCount, getPrettyStringFromHours, truncated, useForm } from "@shortwaits/shared-ui";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { UnauthorizedScreenProps } from "../../../navigation";
import { setBusiness, setBusinessCategories, useAuth, useBusiness, useSignOut, useUser } from "../../../store";

export const Onboarding1Screen: FC<UnauthorizedScreenProps<"onboarding-1-screen">> = ({ navigation }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [isCategoriesTouched, setIsCategoriesTouched] = useState(false);
  const signOut = useSignOut();
  const business = useBusiness();
  const user = useUser();
  const auth = useAuth();

  console.log("business", business?.categories);

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
      headerTitle: () => (
        <Text preset="headerTitle">
          {intl.formatMessage(
            {
              id: "Onboarding_1_Screen.headerTitle",
            },
            {
              name: truncated(user?.username, 16) || "",
            }
          )}
        </Text>
      ),
      headerLeft: () => (
        <IconButton
          withMarginLeft
          iconColor="failed"
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
          preset="primary"
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
        subTitle={intl.formatMessage({ id: "Common.count" }, { count: getArrCount(business?.categories ?? []) })}
        errors={!Array.isArray(business?.categories) || !business?.categories.length ? "this field is required" : undefined}
        isTouched={isCategoriesTouched}
        onPress={() => {
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              mode: "categories",
              selectedData: business?.categories ?? [],
              onSubmit: (categories: CategoriesDtoType) => {
                const categoryIds = categories.map(category => category._id);
                dispatch(setBusinessCategories(categoryIds));
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
              hours: business?.hours,
              headerTitle: "Business Hours",
              onSubmit: hours => {
                console.log("hours", hours);
                dispatch(setBusiness({ hours }));
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
