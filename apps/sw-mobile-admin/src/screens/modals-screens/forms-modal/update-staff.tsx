import { ClientType, CreateBusinessUserDtoType, PartialBusinessUserDtoType } from "@shortwaits/shared-lib";
import {
  BackButton,
  Button,
  ButtonCard,
  ExpandableSection,
  FormContainer,
  PhoneNumberCard,
  STATIC_FORM_USA_STATES,
  Space,
  Text,
  TextFieldCard,
  TimePickerFieldCard,
  getCapitalizedString,
  getPrettyStringFromHours,
  useForm,
} from "@shortwaits/shared-ui";
import { FormikErrors } from "formik";
import { noop } from "lodash";
import React, { FC, useEffect, useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { GenericModalData, ModalsScreenProps } from "../../../navigation";
import { useUpdateBusinessUserMutation } from "../../../services";
import { useBusiness } from "../../../store";

export const UpdateStaffModal: FC<ModalsScreenProps<"update-staff-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit ?? noop;
  const onDone = params?.onDone ?? noop;
  const initialValues = params?.initialValues as PartialBusinessUserDtoType;
  console.log("initialValues", JSON.stringify(initialValues, null, 2));

  const intl = useIntl(); // Access the intl object
  const business = useBusiness();
  const [updateBusinessUser, updateBusinessUserStatus] = useUpdateBusinessUserMutation();

  const initialValuesWithDefaultValues: PartialBusinessUserDtoType = {
    ...initialValues,
    phoneNumbers: [
      { label: "mobile", number: initialValues.phoneNumbers?.[0]?.number ?? "" },
      { label: "home", number: initialValues.phoneNumbers?.[1]?.number ?? "" },
      { label: "work", number: initialValues.phoneNumbers?.[2]?.number ?? "" },
    ],
    addresses: [
      {
        label: initialValues.addresses?.[0]?.label ?? "home",
        address1: initialValues.addresses?.[0]?.address1 ?? "",
        address2: initialValues.addresses?.[0]?.address2 ?? "",
        city: initialValues.addresses?.[0]?.city ?? "",
        state: initialValues.addresses?.[0]?.state ?? "",
        region: initialValues.addresses?.[0]?.region ?? "",
        postCode: initialValues.addresses?.[0]?.postCode ?? "",
        country: initialValues.addresses?.[0]?.country ?? "",
      },
    ],
  };

  const { touched, errors, values, setFieldValue, validateField, setFieldTouched, handleChange, handleSubmit, setFieldError } = useForm<PartialBusinessUserDtoType>(
    {
      initialValues: initialValuesWithDefaultValues,
      onSubmit: formData => {
        updateBusinessUser({
          businessId: business._id,
          body: formData,
        });
        if (onSubmit) {
          onSubmit(formData);
        }
      },
    },
    "updateStaff"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="headerTitle" text={"Update Staff"} />,
    });
  }, [handleSubmit, intl, navigation]);

  useEffect(() => {
    if (updateBusinessUserStatus.isSuccess) {
      navigation.goBack();
    }
  }, [updateBusinessUserStatus.isSuccess, navigation]);

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

  if (updateBusinessUserStatus.isError) {
    Alert.alert("Error", updateBusinessUserStatus.error.message);
  }

  const _renderSubmitButton = (
    <Button
      preset="secondary"
      text={intl.formatMessage({ id: "Common.submit" })}
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  return updateBusinessUserStatus.isLoading ? (
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
        errors={errors.phoneNumbers ? (errors.phoneNumbers[0] as FormikErrors<{ label: string; number: string }>)?.number ?? "" : ""}
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
          date={values.birthday ? new Date(values.birthday) : new Date()}
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
          errors={errors.phoneNumbers ? (errors.phoneNumbers[1] as FormikErrors<{ label: string; number: string }>)?.number ?? "" : ""}
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
          errors={errors.phoneNumbers ? (errors.phoneNumbers[2] as FormikErrors<{ label: string; number: string }>)?.number ?? "" : ""}
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddStaffModal.address1" })}
          value={values.addresses[0].address1}
          onChangeText={handleChange("addresses[0].address1")}
          isTouched={touched?.addresses ? touched.addresses[0]?.address1 ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientType["addresses"][number]>)?.address1 ?? "" : ""}
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddStaffModal.address2" })}
          value={values.addresses[0].address2}
          onChangeText={handleChange("addresses[0].address2")}
          isTouched={touched?.addresses ? touched.addresses[0]?.address2 ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientType["addresses"][number]>)?.address2 ?? "" : ""}
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddStaffModal.city" })}
          value={values.addresses[0].city}
          onChangeText={handleChange("addresses[0].city")}
          isTouched={touched?.addresses ? touched.addresses[0]?.city ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientType["addresses"][number]>)?.city ?? "" : ""}
        />
        <ButtonCard
          title={intl.formatMessage({ id: "AddStaffModal.state" })}
          subTitle={STATIC_FORM_USA_STATES.find(state => state._id === values.addresses[0].state)?.title ?? "Select State"}
          isTouched={touched?.addresses ? touched.addresses[0]?.state ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientType["addresses"][number]>)?.state ?? "" : ""}
          onPress={() =>
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                mode: "static",
                headerTitle: "Select State",
                data: STATIC_FORM_USA_STATES,
                onSelect: data => {
                  const state = data[0] as GenericModalData;
                  setFieldValue("addresses[0].state", state._id);
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
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientType["addresses"][number]>)?.postCode ?? "" : ""}
        />
      </ExpandableSection>
      <Space size="large" />
    </FormContainer>
  );
};
