import React, { FC, useLayoutEffect, useMemo } from "react";
import { ActivityIndicator } from "react-native-paper";
import { noop } from "lodash";

import { useCreateBusinessClientsMutation } from "../../../services";
import { useForm } from "../../../hooks";
import { useBusiness } from "../../../redux";
import {
  Card,
  Text,
  TextFieldCard,
  TimePickerFieldCard,
  CircleIconButton,
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { formatAddClientsValues } from "./form-utils";
import { FormBody } from "./commons/form-body";

export const AddClientModal: FC<AuthorizedScreenProps<"form-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { onSaved = noop } = route.params;

  const business = useBusiness();
  const [createBusinessClient, createBusinessClientResult] =
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
  const { touched, errors, values, handleChange, handleSubmit } = useForm(
    {
      initialValues,
      onSubmit: async (formData, { resetForm }) => {
        const formattedValues = formatAddClientsValues(formData);
        // console.log("formData", JSON.stringify(formattedValues, null, 2));
        try {
          const newBusinessClient = await createBusinessClient({
            businessId: business._id,
            businessClients: formattedValues,
          }).unwrap();
          if (newBusinessClient) {
            resetForm();
            onSaved();
            navigation.goBack();
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
    "addClient"
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CircleIconButton
          marginLeft
          iconType="cancel"
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => (
        <CircleIconButton
          marginRight
          onPress={() => {
            handleSubmit();
          }}
          iconType="check"
        />
      ),
      headerTitle: () => <Text preset="text" text="Add Clients" />,
    });
  }, [handleSubmit, navigation]);

  const isLoading =
    createBusinessClientResult.isLoading &&
    !createBusinessClientResult.isSuccess;

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormBody>
      <Card mode="button">
        <Text preset="cardTitle" text={"Tag"} />
        <Text
          preset="cardSubtitle"
          text={"Add an emoji to represent your client"}
        />
      </Card>
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
      <TextFieldCard
        title="Home Number"
        placeholder="+1 (234) 567-8910"
        keyboardType="number-pad"
        value={values.phoneNumber2}
        onChangeText={handleChange("phoneNumber2")}
        isTouched={touched.phoneNumber2}
        errors={errors.phoneNumber2}
      />
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
        placeholder="New York City"
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
        title={"DOE (date of birth)"}
        date={new Date(values.doe)}
        onChange={handleChange("doe")}
        isTouched={touched.postCode}
        errors={errors.postCode}
      />
    </FormBody>
  );
};
