import React, { FC, useLayoutEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { noop } from "lodash";

import { useCreateBusinessClientsMutation } from "../../../services";
import { HandleOnPress, useForm } from "../../../hooks";
import { useBusiness, useServices, useUser } from "../../../redux";
import {
  Text,
  TextFieldCard,
  TimePickerFieldCard,
  Button,
  BackButton,
  DurationFieldCard,
  Card,
  ButtonCard,
  CurrencyFieldCard,
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { FormBody } from "./commons/form-body";
import {
  CreateEventDtoType,
  EventType,
  ServiceDtoType,
} from "@shortwaits/shared-types";

export const AddEventModal: FC<AuthorizedScreenProps<"form-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { onSaved = noop } = route.params;

  const [selectedService, setSelectedService] = useState<ServiceDtoType | null>(
    null
  );

  const business = useBusiness();
  const services = useServices();
  const user = useUser();

  const initialValues = useMemo(() => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + 15 * 60000);
    const _initialValues: CreateEventDtoType = {
      paymentMethod: "CASH",
      participantsIds: [],
      leadClientId: "",
      urls: [],
      location: {
        address: "",
        latitude: 0,
        longitude: 0,
      },
      attendeeLimit: 0,
      registrationDeadlineTime: null,
      registrationFee: 0,
      serviceId: selectedService?._id ?? "",
      //TODO will be able to select multiple staff
      staffIds: [user?._id],
      //TODO will be able to select multiple clients
      clientsIds: [],
      hasNoDuration: true,
      eventImage: "",
      businessId: business._id as string,
      name: "",
      description: "",
      features: [],
      durationInMin: 0,
      startTime: currentDate.toISOString(),
      endTime: futureDate.toISOString(),
      endTimeExpected: futureDate.toISOString(),
      priceExpected: null,
      isGroupEvent: true,
      repeat: true,
      payment: null,
      notes: "",
      labels: [],
    };
    return _initialValues;
  }, [business._id, selectedService?._id, user?._id]);

  const { touched, errors, values, handleChange, handleSubmit, setFieldValue } =
    useForm(
      {
        initialValues,
        onSubmit: formData => {
          onSaved(formData);
          console.log("dd>>>", JSON.stringify(formData, null, 3));
        },
      },
      "addEvent"
    );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <Button
          onPress={handleSubmit as unknown as HandleOnPress}
          preset="headerLink"
          text="Save"
        />
      ),
      headerTitle: () => <Text preset="text" text="Add Event" />,
    });
  }, [handleSubmit, navigation]);

  const isLoading = false;

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormBody>
      <TextFieldCard
        title="Name"
        placeholder="Yoga class"
        value={values.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
      />
      <TextFieldCard
        title="Description"
        placeholder="15 minutes hot Yoga"
        value={values.description}
        onChangeText={handleChange("description")}
        isTouched={touched.description}
        errors={errors.description}
      />

      <ButtonCard
        title="Services"
        subTitle={selectedService ? selectedService.name : "Select a service"}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "services",
              data: services,
              onSelected: service => {
                setSelectedService(service);
              },
            },
          })
        }
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
        date={new Date(values.endTime)}
        onChange={handleChange("startTime")}
        isTouched={touched.endTime}
        errors={errors.endTime}
      />
      <CurrencyFieldCard
        title="Price"
        keyboardType="number-pad"
        placeholder="Give a price"
        value={values.priceExpected}
        onChangeValue={price => setFieldValue("priceExpected", price)}
        isTouched={touched.notes}
        errors={errors.notes}
        currencyType={"USD"}
      />
      <TextFieldCard
        title="Notes"
        multiline
        placeholder="Include notes here"
        value={values.notes}
        onChangeText={handleChange("notes")}
        isTouched={touched.notes}
        errors={errors.notes}
      />
    </FormBody>
  );
};
