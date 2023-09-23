import React, { FC, useEffect, useLayoutEffect, useMemo } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Alert } from "react-native";
import { FormikErrors } from "formik";
import { ClientUserType, CreateBusinessUserDtoType } from "@shortwaits/shared-lib";
import { useIntl } from "react-intl";

import { useCreateBusinessStaffMutation } from "../../../../services";
import { useForm } from "../../../../hooks";
import { useBusiness } from "../../../../store";
import {
  Text,
  TextFieldCard,
  BackButton,
  Button,
  PhoneNumberCard,
  Space,
  ExpandableSection,
  TimePickerFieldCard,
  FormContainer,
  ButtonCard,
} from "../../../../components";
import { ModalsScreenProps } from "../../../../navigation";
import { STATIC_FORM_USA_STATES, getCapitalizedString } from "../../../../utils";
import { getPrettyStringFromHours } from "../../../../utils/time";

export const AddStaffModal: FC<ModalsScreenProps<"form-modal-screen">> = ({ navigation, route }) => {
  const { onSubmit, onDone, closeOnSubmit = true } = route.params;
  const intl = useIntl(); // Access the intl object

  const business = useBusiness();

  const [createBusinessStaff, createBusinessStaffStatus] = useCreateBusinessStaffMutation();

  const initialValues = useMemo(() => {
    const _initialValues: CreateBusinessUserDtoType = {
      // constant values for now
      imAddresses: [],
      socialAccounts: [],
      desiredCurrencies: ["USD"],
      preferredAlias: "displayName",
      //
      // set to US for now
      locale: {
        countryCode: "US",
        isRTL: false,
        languageCode: "en",
        languageTag: "en-US",
      },
      //
      displayName: "",
      accountImageUrl: "",
      email: "",
      givenName: "",
      familyName: "",
      middleName: "",
      phoneNumbers: [
        {
          label: "mobile",
          number: "",
        },
        {
          label: "home",
          number: "",
        },
        {
          label: "work",
          number: "",
        },
      ],
      addresses: [
        {
          label: "home",
          address1: "",
          address2: "",
          city: "",
          region: "",
          state: "",
          postCode: "",
          country: "",
        },
      ],
      birthday: new Date().toISOString(),
      hours: business?.hours,
      password: "",
      isPasswordProtected: false,
      username: "",
      primaryPhoneNumberLabel: "",
    };
    return _initialValues;
  }, [business?.hours]);

  const {
    touched,
    errors,
    values,
    setFieldValue,
    validateField,
    setFieldTouched,
    handleChange,
    handleSubmit,
    setFieldError,
  } = useForm(
    {
      initialValues,
      onSubmit: formData => {
        console.log("formData", formData);
        if (onSubmit) {
          onSubmit<"addStaff">(formData);
        } else {
          createBusinessStaff({
            businessId: business._id,
            body: [formData],
          });
        }
      },
    },
    "addStaff"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="text" text="Add Staff" />,
    });
  }, [closeOnSubmit, handleSubmit, navigation]);

  useEffect(() => {
    if (createBusinessStaffStatus.isSuccess && closeOnSubmit) {
      navigation.goBack();
    }
  }, [closeOnSubmit, createBusinessStaffStatus.isSuccess, navigation]);

  useEffect(() => {
    const cleanup = async () => {
      if (onDone) {
        try {
          await onDone();
        } catch (error) {
          console.error("Error in onDone:", error);
        }
      }
    };
    return () => {
      cleanup();
    };
  }, []);

  if (createBusinessStaffStatus.isError) {
    Alert.alert("Error", createBusinessStaffStatus.error.message);
  }

  const _renderSubmitButton = (
    <Button
      text={intl.formatMessage({ id: "Common.submit" })}
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  return createBusinessStaffStatus.isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormContainer footer={_renderSubmitButton}>
      <TextFieldCard
        title={intl.formatMessage({ id: "AddStaffModal.nickname" })}
        placeholder={intl.formatMessage({ id: "AddStaffModal.nickname.placeholder" })}
        value={values.displayName}
        onChangeText={handleChange("displayName")}
        isTouched={touched.displayName}
        errors={errors.displayName}
      />
      <TextFieldCard
        title={intl.formatMessage({ id: "AddStaffModal.email" })}
        placeholder={intl.formatMessage({ id: "AddStaffModal.email.placeholder" })}
        value={values.email}
        onChangeText={handleChange("email")}
        isTouched={touched.email}
        errors={errors.email}
      />
      <PhoneNumberCard
        title={getCapitalizedString(values.phoneNumbers[0].label)}
        onChangeText={handleChange(`phoneNumbers[0].number`)}
        isValid={async isValid => {
          await setFieldTouched(`phoneNumbers[0].number`, true);
          if (isValid) {
            await validateField(`phoneNumbers[0].number`);
          } else {
            await setFieldError(`phoneNumbers[0].number`, "Invalid phone number");
          }
        }}
        isTouched={touched?.phoneNumbers ? touched.phoneNumbers[0]?.number ?? false : false}
        errors={
          errors.phoneNumbers
            ? (errors.phoneNumbers[0] as FormikErrors<{ label: string; number: string }>)?.number ?? ""
            : ""
        }
      />
      <ButtonCard
        title={intl.formatMessage({ id: "AddStaffModal.schedule" })}
        subTitle={getPrettyStringFromHours(values.hours)}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "schedule-modal-screen",
            params: {
              hours: values.hours,
              onSubmit: (hours: CreateBusinessUserDtoType["hours"]) => {
                console.log("hours", hours);
                setFieldValue("hours", hours);
              },
            },
          })
        }
      />
      <ExpandableSection>
        <TextFieldCard
          title={intl.formatMessage({ id: "AddStaffModal.firstName" })}
          placeholder={intl.formatMessage({ id: "AddStaffModal.firstName.placeholder" })}
          value={values.givenName}
          onChangeText={handleChange("givenName")}
          isTouched={touched.givenName}
          errors={errors.givenName}
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddStaffModal.lastName" })}
          placeholder={intl.formatMessage({ id: "AddStaffModal.lastName.placeholder" })}
          value={values.familyName}
          onChangeText={handleChange("familyName")}
          isTouched={touched.familyName}
          errors={errors.familyName}
        />
        <TimePickerFieldCard
          title={intl.formatMessage({ id: "AddStaffModal.dob" })}
          date={new Date(values.birthday)}
          onChange={handleChange("birthday")}
          isTouched={touched.birthday}
          errors={errors.birthday}
          withTime={false}
        />
        <PhoneNumberCard
          title={getCapitalizedString(values.phoneNumbers[1].label)}
          onChangeText={handleChange(`phoneNumbers[1].number`)}
          isValid={async isValid => {
            await setFieldTouched(`phoneNumbers[1].number`, true);
            if (isValid) {
              await validateField(`phoneNumbers[1].number`);
            } else {
              await setFieldError(`phoneNumbers[1].number`, "Invalid phone number");
            }
          }}
          isTouched={touched?.phoneNumbers ? touched.phoneNumbers[1]?.number ?? false : false}
          errors={
            errors.phoneNumbers
              ? (errors.phoneNumbers[1] as FormikErrors<{ label: string; number: string }>)?.number ?? ""
              : ""
          }
        />
        <PhoneNumberCard
          title={getCapitalizedString(values.phoneNumbers[2].label)}
          onChangeText={handleChange(`phoneNumbers[2].number`)}
          isValid={async isValid => {
            await setFieldTouched(`phoneNumbers[2].number`, true);
            if (isValid) {
              await validateField(`phoneNumbers[2].number`);
            } else {
              await setFieldError(`phoneNumbers[2].number`, "Invalid phone number");
            }
          }}
          isTouched={touched?.phoneNumbers ? touched.phoneNumbers[2]?.number ?? false : false}
          errors={
            errors.phoneNumbers
              ? (errors.phoneNumbers[2] as FormikErrors<{ label: string; number: string }>)?.number ?? ""
              : ""
          }
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddStaffModal.address1" })}
          value={values.addresses[0].address1}
          onChangeText={handleChange("addresses[0].address1")}
          isTouched={touched?.addresses ? touched.addresses[0]?.address1 ?? false : false}
          errors={
            errors.addresses
              ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.address1 ?? ""
              : ""
          }
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddStaffModal.address2" })}
          value={values.addresses[0].address2}
          onChangeText={handleChange("addresses[0].address2")}
          isTouched={touched?.addresses ? touched.addresses[0]?.address2 ?? false : false}
          errors={
            errors.addresses
              ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.address2 ?? ""
              : ""
          }
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddStaffModal.city" })}
          value={values.addresses[0].city}
          onChangeText={handleChange("addresses[0].city")}
          isTouched={touched?.addresses ? touched.addresses[0]?.city ?? false : false}
          errors={
            errors.addresses
              ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.city ?? ""
              : ""
          }
        />
        <ButtonCard
          title={intl.formatMessage({ id: "AddStaffModal.state" })}
          subTitle={
            STATIC_FORM_USA_STATES.find(state => state.key === values.addresses[0].state)?.title ?? "Select State"
          }
          isTouched={touched?.addresses ? touched.addresses[0]?.state ?? false : false}
          errors={
            errors.addresses
              ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.state ?? ""
              : ""
          }
          onPress={() =>
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                type: "static",
                data: STATIC_FORM_USA_STATES,
                headerTitle: "Select State",
                closeOnSelect: true,
                onSelect: state => {
                  setFieldValue("addresses[0].state", state.key);
                },
              },
            })
          }
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddStaffModal.postCode" })}
          value={values.addresses[0].postCode}
          keyboardType="number-pad"
          inputMode="numeric"
          onChangeText={handleChange("addresses[0].postCode")}
          isTouched={touched?.addresses ? touched.addresses[0]?.postCode ?? false : false}
          errors={
            errors.addresses
              ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.postCode ?? ""
              : ""
          }
        />
      </ExpandableSection>
      <Space size="large" />
    </FormContainer>
  );
};
