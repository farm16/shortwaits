import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Alert } from "react-native";

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
  IconButton,
  Space,
  FormContainer,
} from "../../../components";
import { ModalsScreenProps } from "../../../navigation";
import { EventDtoType, ServiceDtoType, UpdateEventDtoType } from "@shortwaits/shared-lib";
import { useCreateEventMutation } from "../../../services";
import { FormikErrors } from "formik";
import { getEmojiString } from "../../../utils";

export const UpdateEventModal: FC<ModalsScreenProps<"form-modal-screen">> = ({ navigation, route }) => {
  const { onSubmit, onDone, closeOnSubmit = true, initialValues } = route.params;
  const services = useServices();
  const [selectedService, setSelectedService] = useState<ServiceDtoType | null>(
    services.find(service => service._id === (initialValues as EventDtoType).serviceId) || null
  );
  const [isFree, setIsFree] = useState<boolean>(false);

  const business = useBusiness();

  const user = useUser();

  const [createEvent, createEventStatus] = useCreateEventMutation();

  const validateDates = (formData: UpdateEventDtoType): FormikErrors<UpdateEventDtoType> => {
    const errors: FormikErrors<UpdateEventDtoType> = {};
    const startTime = new Date(formData.startTime);
    const expectedEndTime = new Date(formData.expectedEndTime);

    if (startTime && expectedEndTime) {
      if (startTime > expectedEndTime) {
        errors.startTime = "Start date must not be after the end date.";
        errors.expectedEndTime = "End date must not be before the start date.";
      }
    }

    return errors;
  };

  const { touched, errors, values, handleChange, handleSubmit, setFieldValue } = useForm(
    {
      // todo remove this hardcoded paymentMethod value
      initialValues: { ...initialValues, paymentMethod: "CASH" } as UpdateEventDtoType,
      validate: validateDates,
      onSubmit: formData => {
        if (onSubmit) {
          onSubmit<"updateEvent">(formData);
        } else {
          createEvent({ businessId: business._id, body: formData });
        }
      },
    },
    "updateEvent"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <IconButton
          onPress={() =>
            Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Delete",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ])
          }
          withMarginRight
          iconType="delete"
        />
      ),
      headerTitle: () => <Text preset="text" text="Update Event" />,
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

  const renderSubmitButton = (
    <Button
      text="Save"
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  console.log("errors:", JSON.stringify(errors, null, 2));
  const emojis = values.labels.map(label => getEmojiString(label.emojiShortName)).join(" ");

  return createEventStatus.isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormContainer footer={renderSubmitButton}>
      <TextFieldCard
        title="Name"
        value={values?.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
      />
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
                if (labels.length > 0) {
                  setFieldValue("labels", labels);
                }
              },
            },
          })
        }
      />

      <TextFieldCard
        title="Description"
        value={values?.description}
        multiline
        onChangeText={handleChange("description")}
        isTouched={touched.description}
        errors={errors.description}
      />
      <ButtonCard
        title="Services"
        leftIconName={selectedService ? "circle" : "circle-outline"}
        leftIconColor={selectedService?.serviceColor?.hexCode ?? "grey"}
        subTitle={selectedService ? selectedService.name : "Select a service"}
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
      />
      <ButtonCard
        rightIconName={values?.hasNoDuration ? "checkbox-outline" : "checkbox-blank-outline"}
        title={"Limited time"}
        onPress={() => {
          setFieldValue("hasNoDuration", !values?.hasNoDuration);
        }}
      />
      <TimePickerFieldCard
        title={"Starts"}
        date={new Date(values?.startTime || Date.now())}
        onChange={handleChange("startTime")}
        isTouched={touched.startTime}
        errors={errors.startTime}
      />
      {values?.hasNoDuration ? null : (
        <TimePickerFieldCard
          title={"Ends"}
          date={new Date(values?.expectedEndTime || Date.now())}
          onChange={handleChange("startTime")}
          isTouched={touched.expectedEndTime}
          errors={errors.expectedEndTime}
        />
      )}
      <ButtonCard
        rightIconName={values?.repeat ? "checkbox-outline" : "checkbox-blank-outline"}
        title={"Recurring"}
        onPress={() => {
          setFieldValue("repeat", !values?.repeat);
        }}
      />
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
      <CurrencyFieldCard
        title="Price"
        disabled={isFree}
        keyboardType="number-pad"
        value={values?.priceExpected}
        onChangeValue={price => setFieldValue("priceExpected", price)}
        isTouched={touched.notes}
        errors={errors.notes}
        currencyType={"USD"}
      />
      <TextFieldCard
        title="Notes"
        multiline
        value={values?.notes}
        onChangeText={handleChange("notes")}
        isTouched={touched.notes}
        errors={errors.notes}
      />
      <Space size="large" />
    </FormContainer>
  );
};
