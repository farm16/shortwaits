import React, { FC, useLayoutEffect, useMemo } from "react";
import { ActivityIndicator, Portal } from "react-native-paper";
import { FormikHelpers } from "formik";
import { noop } from "lodash";

import { useCreateBusinessClientsMutation } from "../../../services";
import { useForm } from "../../../hooks";
import { formSchemas } from "../../../utils/formSchemas";
import { useBusiness, useServices } from "../../../redux";
import {
  Text,
  TextFieldCard,
  TimePickerFieldCard,
  CircleIconButton,
  PickerSelectFieldCard,
  Button,
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { FormBody } from "./commons/form-body";
import { ServicePayloadType } from "@shortwaits/shared-types";

export const AddEventModal: FC<AuthorizedScreenProps<"form-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { onSaved = noop } = route.params;

  const business = useBusiness();
  const services = useServices();

  const [createBusinessClient, createBusinessClientResult] =
    useCreateBusinessClientsMutation();
  const initialValues = useMemo(
    () => ({
      name: "",
      description: "",
      leadClientName: "",
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

  const { touched, errors, values, handleChange, handleSubmit } = useForm(
    {
      initialValues,
      onSubmit: (formData) => {
        console.log("dd>>>", formData);
      },
    },
    "addEvent"
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
          onPress={(e) => handleSubmit()}
          iconType="check"
        />
      ),
      headerTitle: () => <Text preset="text" text="Add Event" />,
    });
  }, [handleSubmit, navigation]);

  const isLoading =
    createBusinessClientResult.isLoading &&
    !createBusinessClientResult.isSuccess;

  const getClientsData: GetSelectorData<ServicePayloadType> = getServiceData;

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
        placeholder="Yoga class description"
        value={values.description}
        onChangeText={handleChange("description")}
        isTouched={touched.description}
        errors={errors.description}
      />
      {/* <PickerSelectFieldCard
        title={"Service"}
        placeholder="Select a service"
        onChange={(value) => handleChange("serviceId")}
        data={getClientsData(services, "name", "_id")}
      />
      <PickerSelectFieldCard
        title={"Client"}
        disabled
        placeholder="Select a service"
        onChange={() => null}
        data={[
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
        ]}
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
      /> */}
    </FormBody>
  );
};

type GetSelectorData<T> = (
  data: T[],
  label: keyof T,
  value: keyof T
) => { label: string; value: string }[];

const getServiceData = (data, _label, _value) =>
  data.map((elem) => {
    const label = elem[_label];
    const value = elem[_value];

    return { label, value };
  });
