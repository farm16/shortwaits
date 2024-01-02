import { ClientUserType, UpdateLocalClientDtoType } from "@shortwaits/shared-lib";
import { FormikErrors } from "formik";
import { isEmpty, noop } from "lodash";
import React, { FC, useEffect, useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { BackButton, Button, ButtonCard, FormContainer, PhoneNumberCard, Space, Text, TextFieldCard } from "../../../components";
import { useForm } from "../../../hooks";
import { ModalsScreenProps } from "../../../navigation";
import { useCreateLocalClientsMutation } from "../../../services";
import { useBusiness } from "../../../store";
import { STATIC_FORM_USA_STATES, getCapitalizedString } from "../../../utils";

export const UpdateLocalClientModal: FC<ModalsScreenProps<"update-local-client-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit ?? noop;
  const onDone = params?.onDone ?? noop;
  const closeOnSubmit = params?.closeOnSubmit ?? true;
  const initialValues = params?.initialValues ?? {};

  const _initialValues: UpdateLocalClientDtoType = {
    ...initialValues,
    displayName: initialValues.displayName ?? "",
    email: initialValues.email ?? "",
    phoneNumbers: initialValues.phoneNumbers ?? [
      { label: "mobile", number: "" },
      { label: "home", number: "" },
      { label: "work", number: "" },
    ],
    givenName: initialValues.givenName ?? "",
    familyName: initialValues.familyName ?? "",
    addresses: isEmpty(initialValues.addresses)
      ? [
          {
            label: "Address",
            address1: "",
            address2: "",
            city: "",
            region: "",
            state: "",
            postCode: "",
            country: "",
          },
          {
            label: "Address 2",
            address1: "",
            address2: "",
            city: "",
            region: "",
            state: "",
            postCode: "",
            country: "",
          },
        ]
      : initialValues.addresses,
  };

  const intl = useIntl(); // Access the intl object
  const business = useBusiness();
  const [createLocalClients, createLocalClientsStatus] = useCreateLocalClientsMutation();

  const { touched, errors, values, validateField, setFieldTouched, handleChange, handleSubmit, setFieldError, setFieldValue } = useForm(
    {
      initialValues: _initialValues,
      onSubmit: formData => {
        createLocalClients({
          businessId: business._id,
          body: [formData],
        });
        if (onSubmit) {
          onSubmit(formData);
        }
      },
    },
    "updateLocalClient"
  );

  // console.log("errors", JSON.stringify(errors, null, 3));
  console.log("initialValues >>>", JSON.stringify(initialValues, null, 3));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="text" text={intl.formatMessage({ id: "Common.updateClient" })} />,
    });
  }, [intl, navigation]);

  useEffect(() => {
    if (createLocalClientsStatus.isSuccess && closeOnSubmit) {
      navigation.goBack();
    }
  }, [closeOnSubmit, createLocalClientsStatus.isSuccess, navigation]);

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

  if (createLocalClientsStatus.isError) {
    Alert.alert("Error", createLocalClientsStatus.error.message);
  }

  const _renderSubmitButton = (
    <Button
      text={intl.formatMessage({ id: "Common.update" })}
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  return createLocalClientsStatus.isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormContainer footer={_renderSubmitButton}>
      <TextFieldCard
        title={intl.formatMessage({ id: "AddLocalClientModal.nickname" })}
        placeholder={""}
        value={values.displayName}
        onChangeText={handleChange("displayName")}
        isTouched={touched.displayName}
        errors={errors.displayName}
      />
      <TextFieldCard
        title={intl.formatMessage({ id: "AddLocalClientModal.firstName" })}
        placeholder={intl.formatMessage({ id: "AddLocalClientModal.firstName.placeholder" })}
        value={values.givenName}
        onChangeText={handleChange("givenName")}
        isTouched={touched.givenName}
        errors={errors.givenName}
      />
      <TextFieldCard
        title={intl.formatMessage({ id: "AddLocalClientModal.lastName" })}
        placeholder={intl.formatMessage({ id: "AddLocalClientModal.lastName.placeholder" })}
        value={values.familyName}
        onChangeText={handleChange("familyName")}
        isTouched={touched.familyName}
        errors={errors.familyName}
      />
      <TextFieldCard
        title={"Email or phone"}
        placeholder={intl.formatMessage({ id: "AddLocalClientModal.email.placeholder" })}
        value={values.email}
        onChangeText={handleChange("email")}
        isTouched={touched.email}
        errors={errors.email}
      />
      <PhoneNumberCard
        title={getCapitalizedString(values.phoneNumbers[0]?.label ?? "mobile")}
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

      <PhoneNumberCard
        title={getCapitalizedString(values.phoneNumbers[1]?.label ?? "home")}
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
        title={getCapitalizedString(values.phoneNumbers[2]?.label ?? "work")}
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
        title={intl.formatMessage({ id: "AddLocalClientModal.address1" })}
        value={values.addresses[0].address1}
        onChangeText={handleChange("addresses[0].address1")}
        isTouched={touched?.addresses ? touched.addresses[0]?.address1 ?? false : false}
        errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.address1 ?? "" : ""}
      />
      <TextFieldCard
        title={intl.formatMessage({ id: "AddLocalClientModal.address2" })}
        value={values.addresses[0].address2}
        onChangeText={handleChange("addresses[0].address2")}
        isTouched={touched?.addresses ? touched.addresses[0]?.address2 ?? false : false}
        errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.address2 ?? "" : ""}
      />
      <ButtonCard
        title={intl.formatMessage({ id: "AddLocalClientModal.state" })}
        subTitle={STATIC_FORM_USA_STATES.find(state => state.key === values.addresses[0].state)?.title ?? "Select State"}
        isTouched={touched?.addresses ? touched.addresses[0]?.state ?? false : false}
        errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.state ?? "" : ""}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "static",
              headerTitle: "Select State",
              data: STATIC_FORM_USA_STATES,
              closeOnSelect: true,
              onSelect: state => {
                setFieldValue("addresses[0].state", state.key);
              },
            },
          })
        }
      />
      <TextFieldCard
        title={intl.formatMessage({ id: "AddLocalClientModal.postCode" })}
        value={values.addresses[0].postCode}
        keyboardType="number-pad"
        inputMode="numeric"
        maxLength={7}
        onChangeText={handleChange("addresses[0].postCode")}
        isTouched={touched?.addresses ? touched.addresses[0]?.postCode ?? false : false}
        errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.postCode ?? "" : ""}
      />
      <Space size="large" />
    </FormContainer>
  );
};
