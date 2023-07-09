import { useDispatch } from "react-redux";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { StackActions } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import {
  Screen,
  TextFieldCard,
  ButtonCard,
  Space,
  CircleIconButton,
  Button,
} from "../../../components";
import { UnauthorizedScreenProps } from "../../../navigation";
import { getPrettyStringFromHours } from "../../../utils/time";
import { getStaffCount } from "../../../utils/staff";
import { useTheme } from "../../../theme";
import { useForm } from "../../../hooks";
import {
  useBusiness,
  useUser,
  setBusinessDescription,
  setBusinessShortName,
  useSignOut,
  useAuth,
  useMobileAdmin,
  setBusinessCategories,
} from "../../../redux";

export const Onboarding1Screen: FC<
  UnauthorizedScreenProps<"onboarding-1-screen">
> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isCategoriesTouched, setIsCategoriesTouched] = useState(false);
  const signOut = useSignOut();
  const business = useBusiness();
  const mobileData = useMobileAdmin();
  const user = useUser();
  const auth = useAuth();
  const { Colors } = useTheme();

  const getSelectedCategoryNames = (
    availableCategories: any[],
    selectedCategories: any[]
  ): string => {
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
    businessShortName: "",
    businessDescription: "",
  };
  const { touched, errors, values, handleChange, handleSubmit } = useForm(
    {
      initialValues,
      onSubmit: formData => {
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
    "onboarding1"
  );
  const isCategorySelected = business.categories.length > 0;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Welcome ${user?.familyName || ""}`,
      headerLeft: () => (
        <CircleIconButton
          withMarginLeft
          iconType="account-cancel"
          onPress={() => {
            signOut();
          }}
        />
      ),
    });
  }, [
    navigation,
    dispatch,
    handleSubmit,
    errors,
    signOut,
    user?.familyName,
    isCategorySelected,
  ]);

  return (
    <>
      <Screen
        preset="scroll"
        style={{ alignItems: "center", flex: 1 }}
        unsafe
        stickyHeaderIndices={[0]}
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
          value={values.businessShortName}
          onChangeText={handleChange("businessShortName")}
          isTouched={touched.businessShortName}
          errors={errors.businessShortName}
        />
        <Space size="small" />
        <TextFieldCard
          title="Description"
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
          subTitle={
            !Array.isArray(business.categories) || !business.categories.length
              ? "Select a business category"
              : getSelectedCategoryNames(
                  mobileData.categories,
                  business.categories
                )
          }
          errors={
            !Array.isArray(business.categories) || !business.categories.length
              ? "this field is required"
              : undefined
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
        <Space size="small" />
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
                type: "My-Business-Hours",
              },
            })
          }
        />
        <Space size="small" />
        <ButtonCard
          title="Staff"
          subTitle={getStaffCount(business.staff)}
          onPress={() =>
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                type: "staff",
                onSelect: (staff: any) => {
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
          text="CONTINUE"
          onPress={e => {
            setIsCategoriesTouched(true);
            if (
              !(
                !Array.isArray(business.categories) ||
                !business.categories.length
              )
            ) {
              handleSubmit();
            }
          }}
        />
      </LinearGradient>
    </>
  );
};
