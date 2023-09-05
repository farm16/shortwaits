import { useDispatch } from "react-redux";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { StackActions } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import { Screen, TextFieldCard, ButtonCard, Space, IconButton, Button, FormContainer } from "../../../components";
import { UnauthorizedScreenProps } from "../../../navigation";
import { getPrettyStringFromHours } from "../../../utils/time";
import { getStaffCount } from "../../../utils/staff";
import { useTheme } from "../../../theme";
import { useForm } from "../../../hooks";
import {
  useBusiness,
  useUser,
  setBusiness,
  useSignOut,
  useAuth,
  useMobileAdmin,
  setBusinessCategories,
} from "../../../store";
import { useGetCategoriesQuery } from "../../../services";

export const Onboarding1Screen: FC<UnauthorizedScreenProps<"onboarding-1-screen">> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isCategoriesTouched, setIsCategoriesTouched] = useState(false);
  const signOut = useSignOut();
  const business = useBusiness();
  const user = useUser();
  const auth = useAuth();
  const { data: categories } = useGetCategoriesQuery(undefined);

  const getSelectedCategoryNames = (availableCategories: any[], selectedCategories: any[]): string => {
    const _selectedCategories = availableCategories
      .filter(element => selectedCategories.includes(element._id))
      .map(elem => elem.name);

    if (_selectedCategories.length > 2) {
      return _selectedCategories.slice(0, 2).join(", ") + ", ...";
    } else {
      return _selectedCategories.join(", ");
    }
  };

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
  const isCategorySelected = business?.categories?.length > 0;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Welcome ${user?.familyName || ""}`,
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
  }, [navigation, dispatch, handleSubmit, errors, signOut, user?.familyName, isCategorySelected]);

  return (
    <FormContainer
      footer={
        <Button
          preset={"secondary"}
          text="CONTINUE"
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
        title="Business Name"
        placeholder={`The name of your business`}
        value={values.shortName}
        onChangeText={handleChange("shortName")}
        isTouched={touched.shortName}
        errors={errors.shortName}
      />
      <TextFieldCard
        title="Description"
        placeholder="A short description about your business"
        multiline
        maxLength={150} // get reduced to 140 by the form's validation
        value={values.description}
        onChangeText={handleChange("description")}
        isTouched={touched.description}
        errors={errors.description}
      />
      <ButtonCard
        title="Business Categories"
        subTitle={
          !Array.isArray(business?.categories) || !business?.categories?.length
            ? "Select a business category"
            : getSelectedCategoryNames(categories?.data || [], business?.categories)
        }
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
              closeOnSubmit: true,
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
        title="Hours"
        subTitle={getPrettyStringFromHours(business?.hours)}
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
        title="Staff"
        subTitle={getStaffCount(business?.staff ?? [])}
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
