import React, { FC, useLayoutEffect, useMemo } from "react";
import { ActivityIndicator, View } from "react-native";

import { useTheme } from "../../../theme";
import {
  BackButton,
  Button,
  Screen,
  Avatar,
  Text,
  TextFieldCard,
  TextHeaderButton,
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { FormBody } from "./commons/form-body";
import { useForm } from "../../../hooks";

export const AddStaffModal: FC<AuthorizedScreenProps<"form-modal-screen">> = ({
  navigation,
}) => {
  const { Colors } = useTheme();
  const initialValues = useMemo(
    () => ({
      name: "",
      email: "",
      phoneNumber: "",
      notes: "",
    }),
    []
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => <Button preset="headerLink" text="Save" />,
      headerTitle: () => <Text preset="text" text="Add Staff" />,
    });
  }, [navigation]);

  const { touched, errors, values, handleChange, handleSubmit, setFieldValue } =
    useForm(
      {
        initialValues,
        onSubmit: (formData) => {
          console.log("dd>>>", formData);
        },
      },
      "addStaff"
    );

  const isLoading = false;

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormBody>
      <Avatar imageUrl={""} size="large" mode="upload" />
      <TextFieldCard
        title="Name"
        placeholder="John Smith"
        value={values.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
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
        value={values.phoneNumber}
        onChangeText={handleChange("phoneNumber")}
        isTouched={touched.phoneNumber}
        errors={errors.phoneNumber}
      />
      <TextFieldCard
        title="Notes"
        placeholder="Add Notes"
        value={values.notes}
        onChangeText={handleChange("notes")}
        isTouched={touched.notes}
        errors={errors.notes}
      />
    </FormBody>
  );
};
