import { useNavigation } from "@react-navigation/native";
import { AddLocalClientDtoType, ClientType } from "@shortwaits/shared-lib";
import {
  BackButton,
  Button,
  ButtonCard,
  Container,
  ExpandableSection,
  Icon,
  PhoneNumberCard,
  QrScanner,
  STATIC_FORM_USA_STATES,
  Space,
  Text,
  TextFieldCard,
  getCapitalizedString,
  useForm,
  useTheme,
} from "@shortwaits/shared-ui";
import { FormikErrors } from "formik";
import { noop } from "lodash";
import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { GenericModalData, ModalsScreenProps } from "../../../navigation";
import { useAddClientToBusinessMutation, useCreateLocalClientsMutation } from "../../../services";
import { useBusiness } from "../../../store";

export const AddClientModal: FC<ModalsScreenProps<"add-client-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit ?? noop;

  const intl = useIntl(); // Access the intl object
  const { Colors } = useTheme();
  const business = useBusiness();
  const [addClient, addClientStatus] = useAddClientToBusinessMutation();
  const [clientType, setClientType] = useState<"shortwaits" | "local">("shortwaits"); // ["shortwaits", "local"

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="headerTitle" text={"Add client"} />,
    });
  }, [intl, navigation]);

  useEffect(() => {
    if (addClientStatus.isSuccess) {
      navigation.goBack();
    }
  }, [addClientStatus.isSuccess, navigation]);

  useEffect(() => {
    const cleanup = async () => {
      if (onSubmit) {
        try {
          await onSubmit();
        } catch (error) {
          console.error("Error in onSubmit:", error);
        }
      }
    };
    return () => {
      cleanup();
    };
  }, []);

  if (addClientStatus.isError) {
    console.log("addClientStatus.error >>>", addClientStatus.error);
    Alert.alert("Error", addClientStatus.error.data.message);
  }

  const handleCodeScanned = value => {
    console.log("camera >>>", value);
    addClient({
      businessId: business._id,
      body: {
        shortId: value,
      },
    });
  };

  const renderClientTypeOption = useCallback(() => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Space size="large" />
        <TouchableOpacity onPress={() => setClientType("shortwaits")}>
          <Container
            direction="row"
            alignItems="center"
            style={{
              paddingHorizontal: 8,
            }}
          >
            <Icon name={clientType === "shortwaits" ? "radiobox-marked" : "radiobox-blank"} color={Colors.brandPrimary} size={26} />
            <Space direction="vertical" size="small" />
            <Text
              text={"Scan QR code"}
              style={{
                color: Colors.brandSecondary,
                fontWeight: "600",
              }}
              preset="textLarge"
            />
          </Container>
        </TouchableOpacity>
        <Space size="small" />
        <TouchableOpacity onPress={() => setClientType("local")}>
          <Container
            direction="row"
            alignItems="center"
            style={{
              paddingHorizontal: 8,
            }}
          >
            <Icon name={clientType === "local" ? "radiobox-marked" : "radiobox-blank"} color={Colors.brandPrimary} size={26} />
            <Space direction="vertical" size="small" />
            <Text
              text={"Enter details manually"}
              style={{
                color: Colors.brandSecondary,
                fontWeight: "600",
              }}
              preset="textLarge"
            />
          </Container>
        </TouchableOpacity>
      </View>
    );
  }, [clientType, Colors.brandPrimary, Colors.brandSecondary]);

  if (addClientStatus.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.background }}>
      {renderClientTypeOption()}
      <Space />
      {clientType === "shortwaits" ? <QrScanner preset="scanClientQr" /> : <LocalClientForm onSubmit={onSubmit} />}
    </ScrollView>
  );
};

const LocalClientForm = ({ onSubmit }) => {
  const intl = useIntl(); // Access the intl object
  const business = useBusiness();
  const navigation = useNavigation<ModalsScreenProps<"add-client-modal-screen">["navigation"]>();
  const [addLocalClients, addLocalClientsStatus] = useCreateLocalClientsMutation();
  const initialValues = useMemo(() => {
    return localClientFormInitialValues;
  }, []);

  if (addLocalClientsStatus.isError) {
    console.log("addLocalClientsStatus.error >>>", addLocalClientsStatus.error);
    Alert.alert("Error", addLocalClientsStatus.error.data.message);
  }

  useEffect(() => {
    if (addLocalClientsStatus.isSuccess) {
      navigation.goBack();
    }
  }, [addLocalClientsStatus.isSuccess, navigation]);

  const { touched, errors, values, validateField, setFieldTouched, handleChange, handleSubmit, setFieldError, setFieldValue } = useForm<AddLocalClientDtoType>(
    {
      initialValues: initialValues,
      onSubmit: formData => {
        addLocalClients({
          businessId: business._id,
          body: [formData], // needs to be an array to support multiple clients
        });
        if (onSubmit) {
          onSubmit(formData);
        }
      },
    },
    "addLocalClient"
  );
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <TextFieldCard
        title={intl.formatMessage({ id: "AddLocalClientModal.nickname" })}
        placeholder={intl.formatMessage({ id: "AddLocalClientModal.nickname.placeholder" })}
        value={values.displayName}
        onChangeText={handleChange("displayName")}
        isTouched={touched.displayName}
        errors={errors.displayName}
      />
      <TextFieldCard
        title={intl.formatMessage({ id: "AddLocalClientModal.email" })}
        placeholder={intl.formatMessage({ id: "AddLocalClientModal.email.placeholder" })}
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
          title={intl.formatMessage({ id: "AddLocalClientModal.address1" })}
          value={values.addresses[0].address1}
          onChangeText={handleChange("addresses[0].address1")}
          isTouched={touched?.addresses ? touched.addresses[0]?.address1 ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientType["addresses"][number]>)?.address1 ?? "" : ""}
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddLocalClientModal.address2" })}
          value={values.addresses[0].address2}
          onChangeText={handleChange("addresses[0].address2")}
          isTouched={touched?.addresses ? touched.addresses[0]?.address2 ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientType["addresses"][number]>)?.address2 ?? "" : ""}
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddLocalClientModal.city" })}
          value={values.addresses[0].city}
          onChangeText={handleChange("addresses[0].city")}
          isTouched={touched?.addresses ? touched.addresses[0]?.city ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientType["addresses"][number]>)?.city ?? "" : ""}
        />
        <ButtonCard
          title={intl.formatMessage({ id: "AddLocalClientModal.state" })}
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
          title={intl.formatMessage({ id: "AddLocalClientModal.postCode" })}
          value={values.addresses[0].postCode}
          keyboardType="number-pad"
          inputMode="numeric"
          maxLength={7}
          onChangeText={handleChange("addresses[0].postCode")}
          isTouched={touched?.addresses ? touched.addresses[0]?.postCode ?? false : false}
          errors={errors.addresses ? (errors.addresses[0] as FormikErrors<ClientType["addresses"][number]>)?.postCode ?? "" : ""}
        />
      </ExpandableSection>
      <Space size="large" />
      <Button
        text="Submit"
        preset="secondary"
        disabled={errors && Object.keys(errors).length > 0}
        onPress={() => {
          handleSubmit();
        }}
      />
      <Space size="large" />
    </View>
  );
};

const localClientFormInitialValues: AddLocalClientDtoType = {
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
  desiredCurrencies: ["USD"],
  // set to US for now
  locale: {
    countryCode: "US",
    isRTL: false,
    languageCode: "en",
    languageTag: "en-US",
  },
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
  isSocialAccount: false,
  socialAccount: null,
  deviceSetting: null,
  accountSettings: null,
};
