import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { ActivityIndicator } from "react-native-paper";
import { Alert } from "react-native";

import { useForm } from "../../../hooks";
import { useBusiness, useServices, useUser } from "../../../redux";
import {
  Text,
  TextFieldCard,
  TimePickerFieldCard,
  Button,
  BackButton,
  ButtonCard,
  CurrencyFieldCard,
} from "../../../components";
import { ModalsScreenProps } from "../../../navigation";
import { FormBody } from "./commons/form-body";
import { CreateEventDtoType, ServiceDtoType } from "@shortwaits/shared-types";
import { useCreateEventMutation } from "../../../services";

export const AddEventModal: FC<ModalsScreenProps<"form-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { onSubmit, onDone, closeOnSubmit = true } = route.params;

  const [selectedService, setSelectedService] = useState<ServiceDtoType | null>(
    null
  );

  const business = useBusiness();
  const services = useServices();
  const user = useUser();

  const [createEvent, createEventStatus] = useCreateEventMutation();

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
      registrationDeadlineTime: "",
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
      expectedEndTime: futureDate.toISOString(),
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
          if (onSubmit) {
            onSubmit<"addEvent">(formData);
          } else {
            createEvent(formData);
          }
        },
      },
      "addEvent"
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
      headerTitle: () => <Text preset="text" text="Add Event" />,
    });
  }, [closeOnSubmit, createEventStatus.isSuccess, handleSubmit, navigation]);

  useEffect(() => {
    if (createEventStatus.isSuccess && closeOnSubmit) {
      navigation.goBack();
    }
  }, [closeOnSubmit, createEventStatus.isSuccess, navigation]);

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

  if (createEventStatus.isError) {
    Alert.alert("Error", createEventStatus.error.message);
  }

  return createEventStatus.isLoading ? (
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
                console.log("selected service:", service._id);
                setSelectedService(service);
                setFieldValue("serviceId", service._id);
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
        date={new Date(values.expectedEndTime)}
        onChange={handleChange("startTime")}
        isTouched={touched.expectedEndTime}
        errors={errors.expectedEndTime}
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
