import React, { FC, useEffect, useLayoutEffect, useMemo } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Alert } from "react-native";
import { FormikErrors } from "formik";
import { ClientUserType, CreateClientUserDtoType } from "@shortwaits/shared-lib";

import { useCreateBusinessClientsMutation } from "../../../services";
import { useForm } from "../../../hooks";
import { useBusiness } from "../../../store";
import {
  Text,
  TextFieldCard,
  BackButton,
  Button,
  PhoneNumberCard,
  Space,
  ExpandableSection,
  FormContainer,
} from "../../../components";
import { ModalsScreenProps } from "../../../navigation";
import { getCapitalizedString } from "../../../utils";

export const AddClientModal: FC<ModalsScreenProps<"form-modal-screen">> = ({ navigation, route }) => {
  const { onSubmit, onDone, closeOnSubmit = true } = route.params;

  const business = useBusiness();

  const [createBusinessClients, createBusinessClientsStatus] = useCreateBusinessClientsMutation();

  const initialValues = useMemo(() => {
    const _initialValues: CreateClientUserDtoType = {
      // constant values for now
      clientType: "local",
      imAddresses: [],
      socialAccounts: [],
      desiredCurrencies: ["USD"],
      alias: "displayName",
      // set to US for now
      locale: {
        countryCode: "US",
        isRTL: false,
        languageCode: "en",
        languageTag: "en-US",
      },
      //
      displayName: "",
      username: "",
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
      password: "",
    };
    return _initialValues;
  }, []);

  const { touched, errors, values, validateField, setFieldTouched, handleChange, handleSubmit, setFieldError } =
    useForm(
      {
        initialValues,
        onSubmit: formData => {
          console.log("formData", formData);
          if (onSubmit) {
            onSubmit<"addClient">(formData);
          } else {
            createBusinessClients({
              businessId: business._id,
              businessClients: formData,
            });
          }
        },
      },
      "addClient"
    );

  console.log("errors", errors);
  console.log("touched", touched);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="text" text="Add Client" />,
    });
  }, [closeOnSubmit, handleSubmit, navigation]);

  useEffect(() => {
    if (createBusinessClientsStatus.isSuccess && closeOnSubmit) {
      navigation.goBack();
    }
  }, [closeOnSubmit, createBusinessClientsStatus.isSuccess, navigation]);

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

  if (createBusinessClientsStatus.isError) {
    Alert.alert("Error", createBusinessClientsStatus.error.message);
  }

  const _renderSubmitButton = (
    <Button
      text="Save"
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  return createBusinessClientsStatus.isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormContainer footer={_renderSubmitButton}>
      <TextFieldCard
        title="Nickname"
        placeholder="John from front desk"
        value={values.displayName}
        onChangeText={handleChange("displayName")}
        isTouched={touched.displayName}
        errors={errors.displayName}
      />
      <TextFieldCard
        title="Email"
        placeholder="jhon_smith@shortwaits.com"
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
      <ExpandableSection>
        <TextFieldCard
          title="First Name"
          placeholder="John"
          value={values.givenName}
          onChangeText={handleChange("givenName")}
          isTouched={touched.givenName}
          errors={errors.givenName}
        />
        <TextFieldCard
          title="Last Name"
          placeholder="Smith"
          value={values.familyName}
          onChangeText={handleChange("familyName")}
          isTouched={touched.familyName}
          errors={errors.familyName}
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
          title={"Address 1"}
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
          title={"Address 2 (optional)"}
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
          title={"City"}
          value={values.addresses[0].city}
          onChangeText={handleChange("addresses[0].city")}
          isTouched={touched?.addresses ? touched.addresses[0]?.city ?? false : false}
          errors={
            errors.addresses
              ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.city ?? ""
              : ""
          }
        />
        <TextFieldCard
          title={"State"}
          value={values.addresses[0].state}
          onChangeText={handleChange("addresses[0].state")}
          isTouched={touched?.addresses ? touched.addresses[0]?.state ?? false : false}
          errors={
            errors.addresses
              ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.state ?? ""
              : ""
          }
        />
        <TextFieldCard
          title={"Zip Code"}
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
