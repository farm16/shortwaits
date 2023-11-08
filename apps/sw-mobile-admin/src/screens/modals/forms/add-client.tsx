import { ClientUserType, CreateLocalClientUserDtoType } from "@shortwaits/shared-lib";
import { FormikErrors } from "formik";
import React, { FC, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, StatusBar, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { noop } from "lodash";
import { BackButton, Button, ButtonCard, Camera, ExpandableSection, FormContainer, PhoneNumberCard, Space, Text, TextFieldCard, WithPermission } from "../../../components";
import { useForm } from "../../../hooks";
import { ModalsScreenProps } from "../../../navigation";
import { useCreateLocalClientsMutation } from "../../../services";
import { useBusiness } from "../../../store";
import { STATIC_FORM_USA_STATES, getCapitalizedString } from "../../../utils";

export const AddClientModal: FC<ModalsScreenProps<"add-client-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit ?? noop;
  const onDone = params?.onDone ?? noop;
  const closeOnSubmit = params?.closeOnSubmit ?? true;
  const clientType = params?.clientType ?? "local";

  const intl = useIntl(); // Access the intl object
  const [isCameraOpen, setIsCameraOpen] = useState(clientType === "shortwaits");
  const business = useBusiness();

  const [createLocalClients, createLocalClientsStatus] = useCreateLocalClientsMutation();

  const initialValues = useMemo(() => {
    const _initialValues: CreateLocalClientUserDtoType = {
      clientType: "local",
      username: "",
      alias: "displayName",
      displayName: "",
      familyName: "",
      givenName: "",
      middleName: "",
      accountImageUrl: "",
      email: "",
      imAddresses: [],
      socialAccounts: [],
      desiredCurrencies: ["USD"],
      // set to US for now
      locale: {
        countryCode: "US",
        isRTL: false,
        languageCode: "en",
        languageTag: "en-US",
      },
      //
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
    };
    return _initialValues;
  }, []);

  const { touched, errors, values, validateField, setFieldTouched, handleChange, handleSubmit, setFieldError, setFieldValue } = useForm(
    {
      initialValues,
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
    "addLocalClient"
  );

  console.log("errors", JSON.stringify(errors, null, 3));
  // console.log("touched", touched);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: isCameraOpen ? false : true,
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="text" text={intl.formatMessage({ id: "Common.addClient" })} />,
    });
  }, [closeOnSubmit, handleSubmit, intl, isCameraOpen, navigation]);

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

  const renderSubmitButton = (
    <Button
      text={intl.formatMessage({ id: "Common.submit" })}
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  console.log("clientType", clientType);

  useEffect(() => {
    if (clientType === "shortwaits" && !isCameraOpen) {
      navigation.goBack();
      return () => {
        StatusBar.setHidden(false);
      };
    }
  }, [clientType, isCameraOpen, navigation]);

  useEffect(() => {
    if (clientType === "shortwaits" && isCameraOpen) {
      StatusBar.setHidden(true);
    }
  }, [clientType, isCameraOpen]);

  if (clientType === "shortwaits") {
    return (
      <View>
        <WithPermission show={isCameraOpen} permission="camera">
          <Camera isVisible={isCameraOpen} setIsVisible={setIsCameraOpen} />
        </WithPermission>
      </View>
    );
  }

  return createLocalClientsStatus.isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormContainer footer={renderSubmitButton}>
      <TextFieldCard
        title={intl.formatMessage({ id: "AddClientModal.nickname" })}
        placeholder={intl.formatMessage({ id: "AddClientModal.nickname.placeholder" })}
        value={values.displayName}
        onChangeText={handleChange("displayName")}
        isTouched={touched.displayName}
        errors={errors.displayName}
      />
      <TextFieldCard
        title={intl.formatMessage({ id: "AddClientModal.email" })}
        placeholder={intl.formatMessage({ id: "AddClientModal.email.placeholder" })}
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
      <ExpandableSection>
        <TextFieldCard
          title={intl.formatMessage({ id: "AddClientModal.firstName" })}
          placeholder={intl.formatMessage({ id: "AddClientModal.firstName.placeholder" })}
          value={values.givenName}
          onChangeText={handleChange("givenName")}
          isTouched={touched.givenName}
          errors={errors.givenName}
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddClientModal.lastName" })}
          placeholder={intl.formatMessage({ id: "AddClientModal.lastName.placeholder" })}
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
          title={intl.formatMessage({ id: "AddClientModal.address1" })}
          value={values.addresses[0].address1}
          onChangeText={handleChange("addresses[0].address1")}
          isTouched={touched?.addresses ? touched.addresses[0]?.address1 ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.address1 ?? "" : ""}
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddClientModal.address2" })}
          value={values.addresses[0].address2}
          onChangeText={handleChange("addresses[0].address2")}
          isTouched={touched?.addresses ? touched.addresses[0]?.address2 ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.address2 ?? "" : ""}
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddClientModal.city" })}
          value={values.addresses[0].city}
          onChangeText={handleChange("addresses[0].city")}
          isTouched={touched?.addresses ? touched.addresses[0]?.city ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.city ?? "" : ""}
        />
        <ButtonCard
          title={intl.formatMessage({ id: "AddClientModal.state" })}
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
          title={intl.formatMessage({ id: "AddClientModal.postCode" })}
          value={values.addresses[0].postCode}
          keyboardType="number-pad"
          inputMode="numeric"
          maxLength={7}
          onChangeText={handleChange("addresses[0].postCode")}
          isTouched={touched?.addresses ? touched.addresses[0]?.postCode ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientUserType["addresses"][number]>)?.postCode ?? "" : ""}
        />
      </ExpandableSection>
      <Space size="large" />
    </FormContainer>
  );
};
