import React, { FC, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Alert } from "react-native";
import { FormikErrors } from "formik";

import { useForm } from "../../../hooks";
import { useBusiness, useServices, useUser } from "../../../store";
import {
  Text,
  TextFieldCard,
  TimePickerFieldCard,
  Button,
  BackButton,
  ButtonCard,
  CurrencyFieldCard,
  Space,
  FormContainer,
  ExpandableSection,
} from "../../../components";
import { ModalsScreenProps } from "../../../navigation";
import { CreateEventDtoType, ServiceDtoType, eventPaymentMethods } from "@shortwaits/shared-lib";
import { useCreateEventMutation } from "../../../services";
import { getEmojiString } from "../../../utils";

export const AddEventModal: FC<ModalsScreenProps<"form-modal-screen">> = ({ navigation, route }) => {
  const { onSubmit, onDone, closeOnSubmit = true } = route.params;

  const [selectedService, setSelectedService] = useState<ServiceDtoType | null>(null);
  const [isFree, setIsFree] = useState<boolean>(true);
  const business = useBusiness();
  const services = useServices();
  const user = useUser();
  const [createEvent, createEventStatus] = useCreateEventMutation();

  const validateDates = (formData: CreateEventDtoType): FormikErrors<CreateEventDtoType> => {
    const errors: FormikErrors<CreateEventDtoType> = {};
    const startTime = new Date(formData.startTime);
    const expectedEndTime = new Date(formData.expectedEndTime);

    if (startTime && expectedEndTime && !formData?.hasNoDuration) {
      if (startTime > expectedEndTime) {
        errors.startTime = "Start date should not exceed the end date.";
        errors.expectedEndTime = "End date should not precede the start date.";
      }
    }

    return errors;
  };

  const initialValues = useMemo(() => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + 15 * 60000);
    const _initialValues: CreateEventDtoType = {
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
      priceExpected: 0,
      isGroupEvent: true,
      repeat: true,
      paymentMethod: "CASH",
      notes: "",
      labels: [],
    };
    return _initialValues;
  }, [business._id, selectedService?._id, user?._id]);

  const { touched, errors, values, handleChange, handleSubmit, setFieldValue } = useForm(
    {
      initialValues,
      validate: validateDates,
      onSubmit: formData => {
        if (onSubmit) {
          onSubmit<"addEvent">(formData);
        } else {
          createEvent({ businessId: business._id, body: formData });
        }
      },
    },
    "createEvent"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="text" text="Create Event" />,
    });
  }, [handleSubmit, navigation]);

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
  }, [onDone]);

  if (createEventStatus.isError) {
    Alert.alert("Error", createEventStatus.error.message);
  }

  const renderSubmitButton = (
    <Button
      text="Create Event"
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  const emojis = values.labels.map(label => getEmojiString(label.emojiShortName)).join(" ");

  return createEventStatus.isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormContainer footer={renderSubmitButton}>
      <TextFieldCard
        title="Name"
        placeholder="Yoga class"
        value={values.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
      />

      <ButtonCard
        title="Services"
        subTitle={selectedService ? selectedService.name : "Select a service"}
        leftIconName={selectedService ? "circle" : "circle-outline"}
        leftIconColor={selectedService?.serviceColor?.hexCode ?? "grey"}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "services",
              data: services,
              onSelect: (service: ServiceDtoType) => {
                console.log("selected service:", service._id);
                setSelectedService(service);
                setFieldValue("serviceId", service._id);
              },
            },
          })
        }
        isTouched={touched.serviceId}
        errors={errors.serviceId}
      />
      <ButtonCard
        rightIconName={values?.hasNoDuration ? "checkbox-outline" : "checkbox-blank-outline"}
        title={"No duration"}
        onPress={() => {
          setFieldValue("hasNoDuration", !values?.hasNoDuration);
        }}
      />
      <TimePickerFieldCard
        title={"Starts"}
        date={new Date(values.startTime)}
        onChange={handleChange("startTime")}
        isTouched={touched.startTime}
        errors={errors.startTime}
      />
      {values?.hasNoDuration ? null : (
        <TimePickerFieldCard
          title={"Ends"}
          date={new Date(values.expectedEndTime)}
          onChange={handleChange("expectedEndTime")}
          isTouched={touched.expectedEndTime}
          errors={errors.expectedEndTime}
        />
      )}
      <ButtonCard
        rightIconName={isFree ? "checkbox-outline" : "checkbox-blank-outline"}
        title={"Free"}
        onPress={() => {
          setIsFree(isFree => {
            if (!isFree) {
              setFieldValue("priceExpected", 0);
            }
            return !isFree;
          });
        }}
      />
      {isFree ? null : (
        <>
          <ButtonCard
            title="Payment method"
            subTitle={values.paymentMethod ? eventPaymentMethods[values.paymentMethod] : "Select a payment method"}
            onPress={() =>
              navigation.navigate("modals", {
                screen: "selector-modal-screen",
                params: {
                  type: "static",
                  headerTitle: "Payment method",
                  data: Object.keys(eventPaymentMethods).map(key => {
                    return {
                      key,
                      title: eventPaymentMethods[key],
                    };
                  }),
                  onSelect: paymentMethod => {
                    setFieldValue("paymentMethod", paymentMethod.key);
                  },
                },
              })
            }
          />
          <CurrencyFieldCard
            title="Price"
            disabled={isFree}
            keyboardType="number-pad"
            placeholder="Give a price"
            value={values.priceExpected}
            onChangeValue={price => setFieldValue("priceExpected", price)}
            isTouched={touched.notes}
            errors={errors.notes}
            currencyType={"USD"}
          />
        </>
      )}
      <ExpandableSection>
        <ButtonCard
          title="Labels"
          subTitle={values.labels.length > 0 ? `${emojis}` : "Select labels"}
          onPress={() =>
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                type: "eventLabels",
                data: values.labels,
                multiple: true,
                onGoBack: labels => {
                  setFieldValue("labels", labels);
                },
              },
            })
          }
        />

        <TextFieldCard
          title="Description"
          placeholder="15 minutes hot Yoga"
          value={values.description}
          onChangeText={handleChange("description")}
          isTouched={touched.description}
          errors={errors.description}
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
      </ExpandableSection>
      <Space size="large" />
    </FormContainer>
  );
};
