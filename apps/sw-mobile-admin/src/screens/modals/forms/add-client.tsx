import React, { FC, useEffect, useLayoutEffect, useMemo } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Alert } from "react-native";

import { useCreateBusinessClientsMutation } from "../../../services";
import { useForm } from "../../../hooks";
import { useBusiness } from "../../../store";
import {
  Card,
  Text,
  TextFieldCard,
  TimePickerFieldCard,
  BackButton,
  Button,
} from "../../../components";
import { ModalsScreenProps } from "../../../navigation";
import { formatAddClientsValues } from "./form-utils";
import { FormContainer } from "./commons/form-container";

export const AddClientModal: FC<ModalsScreenProps<"form-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { onSubmit, onDone, closeOnSubmit = true } = route.params;

  const business = useBusiness();

  const [createBusinessClients, createBusinessClientsStatus] =
    useCreateBusinessClientsMutation();

  const initialValues = useMemo(
    () => ({
      displayName: "",
      businessId: business._id,
      username: "",
      accountImageUrl: "",
      phoneNumber1: "",
      phoneNumber2: "",
      addresses1: "",
      addresses2: "",
      desiredCurrencies: "",
      city: "",
      region: "",
      state: "",
      postCode: "",
      country: "",
      doe: new Date().toISOString(),
      email: "",
    }),
    [business._id]
  );

  const { touched, errors, values, handleChange, handleSubmit, setFieldValue } =
    useForm(
      {
        initialValues,
        onSubmit: formData => {
          const formattedValues = formatAddClientsValues(formData);
          if (onSubmit) {
            onSubmit<"addClient">(formattedValues);
          } else {
            createBusinessClients({
              businessId: business._id,
              businessClients: formattedValues,
            });
          }
        },
      },
      "addClient"
    );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <Button
          onPress={() => {
            handleSubmit();
          }}
          preset="headerLink"
          text="Save"
        />
      ),
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

  return createBusinessClientsStatus.isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormContainer>
      {/* <Card mode="button">
        <Text preset="cardTitle" text={"Tag"} />
        <Text
          preset="cardSubtitle"
          text={"Add an emoji to represent your client"}
        />
      </Card> */}
      <TextFieldCard
        title="Name"
        placeholder="John Smith"
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
      <TextFieldCard
        title="Mobile Number"
        placeholder="+1 (234) 567-8910"
        keyboardType="number-pad"
        value={values.phoneNumber1}
        onChangeText={handleChange("phoneNumber1")}
        isTouched={touched.phoneNumber1}
        errors={errors.phoneNumber1}
      />
      {/* <TextFieldCard
        title="Home Number"
        placeholder="+1 (234) 567-8910"
        keyboardType="number-pad"
        value={values.phoneNumber2}
        onChangeText={handleChange("phoneNumber2")}
        isTouched={touched.phoneNumber2}
        errors={errors.phoneNumber2}
      /> */}
      <TextFieldCard
        title="Address 1"
        placeholder="123 Maiden Ave."
        value={values.addresses1}
        onChangeText={handleChange("addresses1")}
        isTouched={touched.addresses1}
        errors={errors.addresses1}
      />
      <TextFieldCard
        title="Address 2"
        placeholder="Apt. 100"
        value={values.addresses2}
        onChangeText={handleChange("addresses2")}
        isTouched={touched.addresses2}
        errors={errors.addresses2}
      />
      <TextFieldCard
        title="City"
        placeholder="New York"
        keyboardType="number-pad"
        value={values.city}
        onChangeText={handleChange("city")}
        isTouched={touched.city}
        errors={errors.city}
      />
      <TextFieldCard
        title="State"
        placeholder="New York"
        keyboardType="number-pad"
        value={values.state}
        onChangeText={handleChange("state")}
        isTouched={touched.state}
        errors={errors.state}
      />
      <TextFieldCard
        title="Country"
        placeholder="United States of America"
        keyboardType="number-pad"
        value={values.country}
        onChangeText={handleChange("country")}
        isTouched={touched.country}
        errors={errors.country}
      />
      <TextFieldCard
        title="Zip Code"
        placeholder="12345"
        keyboardType="number-pad"
        value={values.postCode}
        onChangeText={handleChange("postCode")}
        isTouched={touched.postCode}
        errors={errors.postCode}
      />
      <TimePickerFieldCard
        withTime={false}
        title={"DOE (date of birth)"}
        date={new Date(values.doe)}
        onChange={handleChange("doe")}
        isTouched={touched.postCode}
        errors={errors.postCode}
      />
    </FormContainer>
  );
};
