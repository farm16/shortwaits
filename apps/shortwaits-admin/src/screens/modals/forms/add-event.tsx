import React, { FC, useLayoutEffect, useMemo } from "react";
import { ActivityIndicator } from "react-native-paper";
import { FormikHelpers } from "formik";
import { noop } from "lodash";

import { useCreateBusinessClientsMutation } from "../../../services";
import { useForm } from "../../../hooks";
import { useBusiness } from "../../../redux";
import {
  Text,
  TextFieldCard,
  TimePickerFieldCard,
  CircleIconButton,
  PickerSelectFieldCard,
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { FormBody } from "./commons/form-body";

export const AddEventModal: FC<AuthorizedScreenProps<"form-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { onSaved = noop } = route.params;

  const business = useBusiness();
  const [createBusinessClient, createBusinessClientResult] =
    useCreateBusinessClientsMutation();
  const initialValues = useMemo(
    () => ({
      leadClientName: "",
      name: "",
      description: "",
      eventImage: "",
      businessId: "",
      serviceId: "",
      staffIds: [],
      clientsIds: [],
      features: [],

      priceExpected: 0,
      priceFinal: 0,
      isGroupEvent: false,
      repeat: false,
      // payment: object;
      notes: "",
      labels: [],

      //duration
      durationInMin: 0,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      endTimeExpected: new Date().toISOString(),
      hasNoDuration: false,
    }),
    []
  );

  const { touched, errors, values, handleChange, handleSubmit } = useForm<
    typeof initialValues
  >(
    {
      initialValues,
      onSubmit: function (
        values: typeof initialValues,
        formikHelpers: FormikHelpers<typeof initialValues>
      ): void | Promise<any> {
        throw new Error("Function not implemented.");
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
      headerTitle: () => <Text preset="text" text="Add Event" />,
    });
  }, [handleSubmit, navigation]);

  const isLoading =
    createBusinessClientResult.isLoading &&
    !createBusinessClientResult.isSuccess;

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormBody>
      <TextFieldCard
        title="Event Name"
        placeholder="Yoga class"
        value={values.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
      />
      <TextFieldCard
        title="Description"
        placeholder="jhon_smith@shortwaits.com"
        value={values.description}
        onChangeText={handleChange("description")}
        isTouched={touched.description}
        errors={errors.description}
      />
      <PickerSelectFieldCard
        title={"Service"}
        placeholder="Select a service"
        onChange={() => null}
        data={[
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
        ]}
      />
      <TextFieldCard
        title="Client"
        placeholder="John Doe"
        keyboardType="number-pad"
        value={values.leadClientName}
        onChangeText={handleChange("leadClientName")}
        isTouched={touched.leadClientName}
        errors={errors.leadClientName}
      />
      <TimePickerFieldCard
        title={"Starts"}
        date={new Date(values.startTime)}
        onChange={handleChange("startTime")}
        isTouched={touched.startTime}
        errors={errors.startTime}
      />
      <TimePickerFieldCard
        title={"Ends"}
        date={new Date(values.endTimeExpected)}
        onChange={handleChange("endTimeExpected")}
        isTouched={touched.endTimeExpected}
        errors={errors.endTimeExpected}
      />
    </FormBody>
  );
};
