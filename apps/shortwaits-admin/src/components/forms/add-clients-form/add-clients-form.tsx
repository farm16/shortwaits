import { useForm } from "../../../hooks";
import React from "react";
import { ButtonCard, TextFieldCard } from "../../cards";
import { Card, Container, Screen, Text } from "../../common";
import { View } from "react-native";
import { CircleIconButton } from "../../navigator-action-buttons/navigator-action-buttons";

export const AddClientsForm = () => {
  const initialValues = {
    displayName: "",
    accountImageUrl: "",
    phoneNumber1: "",
    phoneNumber2: "",
    addresses1: "",
    addresses2: "",
    city: "",
    region: "",
    state: "",
    postCode: "",
    country: "",
    year: "",
    month: "",
    day: "",
    email: "",
  };
  const { touched, errors, values, handleChange, handleSubmit } = useForm(
    {
      initialValues,
      onSubmit: (formData) => {
        return null;
      },
    },
    "addService"
  );
  return (
    <>
      <View
        style={{
          marginTop: 15,
          marginBottom: 10,
          flexDirection: "row",
          alignSelf: "stretch",
          // justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "red",
        }}
      >
        <CircleIconButton
          marginLeft
          // style={{ position: "absolute", right: 0 }}
          iconType="cancel"
        />
        <Text style={{ flex: 1 }} preset="text" text="Add Clients" />
        <CircleIconButton
          marginRight
          // style={{ position: "absolute", right: 0 }}
          iconType="check"
        />
      </View>
      <Screen
        preset="scroll"
        unsafe
        style={{
          alignItems: "center",
          // backgroundColor: "blue",
        }}
      >
        <Card mode="button">
          <Container direction="row">
            <Container>
              <Text preset="cardTitle" text={"Tag"} />
              <Text
                preset="cardSubtitle"
                text={"Add an emoji to represent your client"}
              />
            </Container>
          </Container>
        </Card>
        <TextFieldCard
          title="Name"
          placeholder="John Smith"
          value={values.displayName}
          onChangeText={(text) => {
            return null;
          }}
        />
        <TextFieldCard
          title="Email"
          placeholder="jhon_smith@shortwaits.com"
          value={values.email}
          onChangeText={(text) => {
            return null;
          }}
        />
        <TextFieldCard
          title="Mobile Number"
          placeholder="+1 (234) 567-8910"
          value={values.phoneNumber1}
          onChangeText={(text) => {
            return null;
          }}
        />
        <TextFieldCard
          title="Home Number"
          placeholder="+1 (234) 567-8910"
          value={values.phoneNumber1}
          onChangeText={(text) => {
            return null;
          }}
        />
        <TextFieldCard
          title="Address 1"
          placeholder="123 Maiden Ave."
          keyboardType="number-pad"
          value={values.addresses1}
          onChangeText={(text) => {
            return null;
          }}
        />
        <TextFieldCard
          title="Address 2"
          placeholder="Apt. 100"
          keyboardType="number-pad"
          value={values.addresses2}
          onChangeText={(text) => {
            return null;
          }}
        />
        <TextFieldCard
          title="City"
          placeholder="New York City"
          keyboardType="number-pad"
          value={values.city}
          onChangeText={(text) => {
            return null;
          }}
        />
        <TextFieldCard
          title="State"
          placeholder="New York"
          keyboardType="number-pad"
          value={values.state}
          onChangeText={(text) => {
            return null;
          }}
        />
        <TextFieldCard
          title="Country"
          placeholder="United States of America"
          keyboardType="number-pad"
          value={values.country}
          onChangeText={(text) => {
            return null;
          }}
        />
        <TextFieldCard
          title="Zip Code"
          placeholder="Yoga class"
          keyboardType="number-pad"
          value={values.postCode}
          onChangeText={(text) => {
            return null;
          }}
        />
        <TextFieldCard
          title="DOB"
          placeholder="02/12/90"
          keyboardType="number-pad"
          value={values.postCode}
          onChangeText={(text) => {
            return null;
          }}
        />
      </Screen>
    </>
  );
};
