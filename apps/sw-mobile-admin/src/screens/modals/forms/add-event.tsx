import React, { FC, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Alert } from "react-native";
import { FormikErrors } from "formik";
import { useIntl } from "react-intl";
import { CreateEventDtoType, ServiceDtoType, eventPaymentMethods } from "@shortwaits/shared-lib";

import { useForm } from "../../../hooks";
import { useBusiness, useUser } from "../../../store";
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
import { useCreateEventMutation } from "../../../services";
import { getEmojiString } from "../../../utils";
import { noop } from "lodash";

export const AddEventModal: FC<ModalsScreenProps<"add-event-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit ?? noop;
  const onDone = params?.onDone ?? noop;
  const closeOnSubmit = params?.closeOnSubmit ?? true;

  const intl = useIntl(); // Access the intl object

  const [selectedService, setSelectedService] = useState<ServiceDtoType | null>(null);
  const [isFree, setIsFree] = useState<boolean>(true);
  const business = useBusiness();
  const user = useUser();
  const [createEvent, createEventStatus] = useCreateEventMutation();

  // useGetServicesQuery(business?._id ? business._id : skipToken, {
  //   refetchOnMountOrArgChange: true,
  // });

  const validateDates = (formData: CreateEventDtoType): FormikErrors<CreateEventDtoType> => {
    const errors: FormikErrors<CreateEventDtoType> = {};
    const startTime = new Date(formData.startTime);
    const expectedEndTime = new Date(formData.expectedEndTime);

    if (startTime && expectedEndTime && !formData?.hasDuration) {
      if (startTime > expectedEndTime) {
        errors.startTime = intl.formatMessage({ id: "AddEventModal.errorStartTime" });
        errors.expectedEndTime = intl.formatMessage({ id: "AddEventModal.errorExpectedEndTime" });
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
      serviceId: "",
      //TODO will be able to select multiple staff
      staffIds: [user?._id],
      //TODO will be able to select multiple clients
      clientsIds: [],
      hasDuration: true,
      eventImage: "",
      businessId: business._id as string,
      name: "",
      description: "",
      features: [],
      durationInMin: 0,
      startTime: currentDate.toISOString(),
      expectedEndTime: futureDate.toISOString(),
      priceExpected: 0,
      isPublicEvent: true,
      repeat: true,
      paymentMethod: "CASH",
      notes: "",
      labels: [],
    };
    return _initialValues;
  }, [business._id, user?._id]);

  const { touched, errors, values, handleChange, handleSubmit, setFieldValue } = useForm(
    {
      initialValues,
      validate: validateDates,
      onSubmit: formData => {
        createEvent({ businessId: business._id, body: formData });
        if (onSubmit) {
          onSubmit(formData);
        }
      },
    },
    "createEvent"
  );

  console.log("errors", errors);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="text" text={intl.formatMessage({ id: "AddEventModal.title" })} />,
    });
  }, [handleSubmit, navigation, intl]);

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

  useEffect(() => {
    if (!selectedService) {
      setFieldValue("serviceId", initialValues.serviceId);
      setFieldValue("isPublicEvent", initialValues.isPublicEvent);
      setFieldValue("priceExpected", initialValues.priceExpected);
      setFieldValue("durationInMin", initialValues.durationInMin);
      setFieldValue("hasDuration", initialValues.hasDuration);
      setFieldValue("expectedEndTime", initialValues.expectedEndTime);
    }
    if (selectedService) {
      const hasDuration = selectedService.durationInMin > 0;

      const startTime = new Date(values.startTime);
      const expectedEndTime = new Date(startTime.getTime() + selectedService.durationInMin * 60000).toISOString();

      if (selectedService.price === 0) {
        setIsFree(true);
        setFieldValue("priceExpected", 0);
      } else {
        setIsFree(false);
        setFieldValue("priceExpected", selectedService.price);
      }

      setFieldValue("serviceId", selectedService._id);
      setFieldValue("isPublicEvent", selectedService.isPrivate);
      setFieldValue("durationInMin", selectedService.durationInMin);
      setFieldValue("hasDuration", hasDuration);
      setFieldValue("expectedEndTime", expectedEndTime);
    }
  }, [
    initialValues.durationInMin,
    initialValues.expectedEndTime,
    initialValues.hasDuration,
    initialValues.isPublicEvent,
    initialValues.priceExpected,
    initialValues.serviceId,
    selectedService,
    setFieldValue,
    values.expectedEndTime,
    values.startTime,
  ]);

  if (createEventStatus.isError) {
    Alert.alert(intl.formatMessage({ id: "AddEventModal.errorTitle" }), createEventStatus.error.message);
  }

  const renderSubmitButton = (
    <Button
      text={intl.formatMessage({ id: "AddEventModal.createEventButton" })}
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
        title={intl.formatMessage({ id: "AddEventModal.name" })}
        placeholder={intl.formatMessage({ id: "AddEventModal.name" })}
        value={values.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
      />

      <ButtonCard
        title={intl.formatMessage({ id: "AddEventModal.service.title" })}
        subTitle={
          selectedService ? selectedService.name : intl.formatMessage({ id: "AddEventModal.service.description" })
        }
        leftIconName={selectedService ? "circle" : "circle-outline"}
        leftIconColor={selectedService?.serviceColor?.hexCode ?? "grey"}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "services",
              searchable: true,
              selectedData: selectedService ? [selectedService._id] : [],
              onSelect: (service: ServiceDtoType) => {
                if (service._id === values.serviceId) {
                  setFieldValue("serviceId", "");
                  setSelectedService(null);
                } else {
                  setSelectedService(service);
                  setFieldValue("serviceId", service._id);
                }
              },
            },
          })
        }
        isTouched={touched.serviceId}
        errors={errors.serviceId}
      />
      <ButtonCard
        isVisible={!selectedService}
        rightIconName={values?.hasDuration ? "checkbox-blank-outline" : "checkbox-outline"}
        title={intl.formatMessage({ id: "AddEventModal.noDuration" })}
        onPress={() => {
          setFieldValue("hasDuration", !values?.hasDuration);
        }}
      />
      <TimePickerFieldCard
        title={intl.formatMessage({ id: "AddEventModal.startTime" })}
        date={new Date(values.startTime)}
        onChange={handleChange("startTime")}
        isTouched={touched.startTime}
        errors={errors.startTime}
      />

      <TimePickerFieldCard
        disabled={values?.hasDuration}
        title={intl.formatMessage({ id: "AddEventModal.endTime" })}
        date={new Date(values.expectedEndTime)}
        onChange={handleChange("expectedEndTime")}
        isTouched={touched.expectedEndTime}
        errors={errors.expectedEndTime}
      />
      {selectedService?.price === 0 ? null : (
        <ButtonCard
          rightIconName={isFree ? "checkbox-outline" : "checkbox-blank-outline"}
          title={intl.formatMessage({ id: "AddEventModal.free" })}
          isVisible={!selectedService}
          onPress={() => {
            setIsFree(isFree => {
              if (!isFree) {
                setFieldValue("priceExpected", 0);
              }
              return !isFree;
            });
          }}
        />
      )}

      {isFree ? null : (
        <>
          <ButtonCard
            title={intl.formatMessage({ id: "AddEventModal.paymentMethod" })}
            subTitle={
              values.paymentMethod
                ? eventPaymentMethods[values.paymentMethod]
                : intl.formatMessage({ id: "AddEventModal.selectPaymentMethod" })
            }
            onPress={() =>
              navigation.navigate("modals", {
                screen: "selector-modal-screen",
                params: {
                  type: "static",
                  headerTitle: intl.formatMessage({ id: "AddEventModal.paymentMethod" }),
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
            disabled={!!selectedService}
            title={intl.formatMessage({ id: "AddEventModal.price" })}
            keyboardType="number-pad"
            placeholder={intl.formatMessage({ id: "AddEventModal.enterPrice" })}
            value={values.priceExpected}
            onChangeValue={price => setFieldValue("priceExpected", price)}
            isTouched={touched.priceExpected}
            errors={errors.priceExpected}
            currencyType={"USD"}
          />
        </>
      )}
      <ExpandableSection>
        <ButtonCard
          isVisible={!selectedService}
          rightIconName={values?.isPublicEvent ? "checkbox-outline" : "checkbox-blank-outline"}
          title={intl.formatMessage({ id: "AddEventModal.isPublicEvent" })}
          subTitle={intl.formatMessage(
            { id: "AddEventModal.isPublicEvent.description" },
            { isPublicEvent: values?.isPublicEvent }
          )}
          onPress={() => {
            setFieldValue("isPublicEvent", !values?.isPublicEvent);
          }}
        />
        <ButtonCard
          disabled={values?.isPublicEvent ? true : false}
          title={intl.formatMessage({ id: "AddEventModal.client.title" })}
          subTitle={
            values.clientsIds.length > 0
              ? `${intl.formatMessage({ id: "AddEventModal.client.description" })}: ${values.clientsIds.length}`
              : intl.formatMessage({ id: "AddEventModal.client.emptyDescription" })
          }
          onPress={() =>
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                type: "clients",
                headerTitle: intl.formatMessage({ id: "AddEventModal.client.selector.headerTitle" }),
                selectedData: values.clientsIds,
                multiple: true,
                minSelectedItems: 1,
                onGoBack: clients => {
                  if (clients) {
                    console.log("selected clients:", clients);
                    const clientsIds = clients.map(s => s._id);
                    setFieldValue("clientsIds", clientsIds);
                  }
                },
              },
            })
          }
        />
        <ButtonCard
          title={intl.formatMessage({ id: "AddEventModal.staff.title" })}
          subTitle={
            values.staffIds.length > 0
              ? `${intl.formatMessage({ id: "AddEventModal.staff.description" })}: ${values.staffIds.length}`
              : intl.formatMessage({ id: "AddEventModal.staff.emptyDescription" })
          }
          onPress={() =>
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                type: "staff",
                headerTitle: intl.formatMessage({ id: "AddEventModal.staff.selector.headerTitle" }),
                selectedData: values.staffIds,
                multiple: true,
                minSelectedItems: 1,
                onGoBack: staff => {
                  console.log("selected staff:", staff);
                  const staffIds = staff.map(s => s._id);
                  setFieldValue("staffIds", staffIds);
                },
              },
            })
          }
        />
        <ButtonCard
          title={intl.formatMessage({ id: "AddEventModal.labels" })}
          subTitle={values.labels.length > 0 ? `${emojis}` : intl.formatMessage({ id: "AddEventModal.selectLabels" })}
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
          title={intl.formatMessage({ id: "AddEventModal.description" })}
          placeholder={intl.formatMessage({ id: "AddEventModal.enterDescription" })}
          value={values.description}
          onChangeText={handleChange("description")}
          isTouched={touched.description}
          errors={errors.description}
        />
        <TextFieldCard
          title={intl.formatMessage({ id: "AddEventModal.notes" })}
          multiline
          placeholder={intl.formatMessage({ id: "AddEventModal.enterNotes" })}
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
