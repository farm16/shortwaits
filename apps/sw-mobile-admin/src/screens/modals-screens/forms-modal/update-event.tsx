import { EventDtoType, ServiceDtoType, UpdateEventDtoType, eventPaymentMethods, eventStatusCodes, eventStatusNames } from "@shortwaits/shared-lib";
import {
  ActivityIndicator,
  BackButton,
  Button,
  ButtonCard,
  CurrencyFieldCard,
  ExpandableSection,
  FormContainer,
  FormSchemaTypes,
  IconButton,
  Messages,
  Space,
  Text,
  TextFieldCard,
  TimePickerFieldCard,
  compareFormObjectsBeforeAbort,
  getArrCount,
  getEmojiString,
  getPrettyStringFromDurationInMin,
  getPrettyStringFromPrice,
  nextEventStatuses,
  useForm,
} from "@shortwaits/shared-ui";
import { FormikErrors } from "formik";
import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { GenericModalData, ModalsScreenProps } from "../../../navigation";
import { useUpdateBusinessEventMutation } from "../../../services";
import { useBusiness, useService } from "../../../store";

export const UpdateEventModal: FC<ModalsScreenProps<"update-event-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit;
  const onGoBack = params?.onGoBack;
  const onSuccess = params?.onSuccess;
  const initialValues = params?.initialValues;
  const serviceId = params?.initialValues?.serviceId;
  const statusName = params?.initialValues?.status?.statusName ?? "";
  const isEventDisabled = statusName ? nextEventStatuses[params?.initialValues?.status?.statusName].length === 0 : true;
  console.log("initialValues", JSON.stringify(initialValues, null, 2));

  const intl = useIntl();
  const business = useBusiness();
  const service = useService(serviceId);
  const [selectedService, setSelectedService] = useState<ServiceDtoType | null>(service);
  const [isFree, setIsFree] = useState<boolean>(false);
  const [updateBusinessEvent, updateEventStatus] = useUpdateBusinessEventMutation();

  const validateDates = (formData: UpdateEventDtoType): FormikErrors<UpdateEventDtoType> => {
    const errors: FormikErrors<UpdateEventDtoType> = {};
    const startTime = new Date(formData.startTime);
    const expectedEndTime = new Date(formData.expectedEndTime);

    // validate start time and end time are not the same
    if (startTime && expectedEndTime) {
      if (startTime > expectedEndTime) {
        errors.startTime = "Start date must not be after the end date.";
        errors.expectedEndTime = "End date must not be before the start date.";
      }
    }
    // validate discount amount
    if (formData.selectedDiscountCode?.code === "MANUAL") {
      if (formData.selectedDiscountCode?.discount >= formData.priceExpected) {
        errors.selectedDiscountCode = {
          discount: "Discount amount must be less or equal to the price.",
        };
      }
    }

    return errors;
  };

  const { touched, errors, values, setValues, handleChange, handleSubmit, setFieldValue } = useForm(
    {
      // todo remove this hardcoded paymentMethod value
      initialValues: initialValues as FormSchemaTypes["updateBusinessEvent"],
      validate: validateDates,
      onSubmit: formData => {
        updateBusinessEvent({ businessId: business._id, body: formData as EventDtoType });
        if (onSubmit) {
          onSubmit();
        }
      },
    },
    "updateBusinessEvent"
  );

  console.log("errors", errors);

  useLayoutEffect(() => {
    const handleOnGoBack = () => {
      const onAbort = () => {
        navigation.goBack();
      };
      if (onGoBack) {
        onGoBack();
      }
      compareFormObjectsBeforeAbort({ obj1: initialValues, obj2: values, onAbort });
    };
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={handleOnGoBack} />,
      headerRight: () => (
        <IconButton
          disabled={isEventDisabled}
          onPress={() =>
            Alert.alert("Are you sure you want to cancel this event?", "This event will be cancelled and all participants will be notified.", [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => {
                  const status = "CANCELED";
                  const body = {
                    ...initialValues,
                    status: {
                      statusName: eventStatusNames[status],
                      statusCode: eventStatusCodes[status],
                    },
                  };

                  console.log("cancel event body", body);

                  updateBusinessEvent({
                    body,
                    businessId: initialValues.businessId,
                  });
                },
              },
            ])
          }
          withMarginRight
          iconType="cancel"
        />
      ),
      headerTitle: () => <Text preset="headerTitle" text={intl.formatMessage({ id: "UpdateEventModal.title" })} />,
    });
  }, [initialValues, intl, isEventDisabled, navigation, onGoBack, updateBusinessEvent, values]);

  useEffect(() => {
    if (selectedService) {
      const startTime = new Date(values.startTime); // todo: check if this is in within service hours
      const expectedEndTime = new Date(startTime.getTime() + selectedService.durationInMin * 60000);
      const expectedEndTimeISO = expectedEndTime.toISOString();
      const hasDuration = startTime.getTime() !== expectedEndTime.getTime();
      setValues(
        {
          ...values,
          priceExpected: selectedService.price === 0 ? 0 : selectedService.price,
          serviceId: selectedService._id,
          isPublicEvent: !selectedService.isPrivate,
          durationInMin: selectedService.durationInMin,
          hasDuration: hasDuration,
          expectedEndTime: expectedEndTimeISO,
        },
        false
      );
    }
  }, [selectedService]);

  useEffect(() => {
    if (updateEventStatus.isSuccess) {
      if (onSuccess) {
        onSuccess(updateEventStatus?.data?.data);
      }
      navigation.goBack();
    }
  }, [onSuccess, updateEventStatus.isSuccess, navigation, updateEventStatus.data]);

  if (updateEventStatus.isError) {
    Alert.alert("Error", updateEventStatus.error.message);
  }

  const renderSubmitButton = (
    <Button
      preset="secondary"
      disabled={isEventDisabled}
      text={intl.formatMessage({ id: "Common.done" })}
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  const emojis = values.labels.map(label => getEmojiString(label.emojiShortName)).join(" ");
  const clientsCount = getArrCount(values.clientsIds) + getArrCount(values.localClientsIds);

  const handleLabelUpdate = useCallback(() => {
    const selectedData = values.labels.map(label => {
      return label.emojiShortName;
    });

    navigation.navigate("modals", {
      screen: "selector-modal-screen",
      params: {
        mode: "eventLabels",
        selectedData: selectedData,
        onSubmit: labels => {
          console.log("selected labels:", JSON.stringify(labels, null, 2));
          setFieldValue("labels", labels);
        },
      },
    });
  }, [navigation, setFieldValue, values.labels]);

  const handleServicePress = useCallback(() => {
    navigation.navigate("modals", {
      screen: "selector-modal-screen",
      params: {
        mode: "services",
        searchable: true,
        selectedData: selectedService ? [selectedService._id] : [],
        onSelect: (service: ServiceDtoType[]) => {
          const selectedService = service[0];
          if (selectedService._id === values.serviceId) {
            setSelectedService(null);
            setFieldValue("serviceId", "");
          } else {
            setSelectedService(selectedService);
          }
        },
      },
    });
  }, [navigation, selectedService, setFieldValue, values.serviceId]);

  const handlePaymentMethodUpdate = useCallback(() => {
    navigation.navigate("modals", {
      screen: "selector-modal-screen",
      params: {
        mode: "static",
        headerTitle: intl.formatMessage({ id: "AddEventModal.paymentMethod" }),
        data: Object.keys(eventPaymentMethods).map(key => {
          return {
            _id: key,
            title: eventPaymentMethods[key],
          };
        }),
        onSelect: paymentMethods => {
          const paymentMethod = paymentMethods[0] as GenericModalData;
          setFieldValue("paymentMethod", paymentMethod._id);
        },
      },
    });
  }, [intl, navigation, setFieldValue]);

  const handleDiscountCodeUpdate = useCallback(() => {
    navigation.navigate("modals", {
      screen: "selector-modal-screen",
      params: {
        mode: "static",
        headerTitle: intl.formatMessage({ id: "AddEventModal.availableDiscountCodes.addAvailableDiscountCode" }),
        data: [
          {
            code: "MANUAL",
            discount: null,
            description: "Manual Discount",
          },
        ].map(key => {
          return {
            _id: key.code,
            title: key.code,
            subTitle: key.description,
            itemData: key,
          };
        }),
        onSelect: selectedDiscountCodes => {
          const selectedDiscountCode = selectedDiscountCodes[0] as GenericModalData;
          setFieldValue("selectedDiscountCode", selectedDiscountCode.itemData);
        },
      },
    });
  }, [intl, navigation, setFieldValue]);

  const handleStaffUpdate = useCallback(() => {
    navigation.navigate("modals", {
      screen: "selector-modal-screen",
      params: {
        mode: "staff",
        headerTitle: "Event Staff",
        selectedData: values.staffIds ?? [],
        onSubmit: selectedClientIds => {
          console.log("selected selector-modal-screen >>>", selectedClientIds);
          setFieldValue("staffIds", selectedClientIds);
        },
      },
    });
  }, [navigation, setFieldValue, values.staffIds]);

  const handleClientsUpdate = useCallback(() => {
    navigation.navigate("modals", {
      screen: "clients-selector-modal-screen",
      params: {
        mode: "clientsAndLocalClients",
        headerTitle: intl.formatMessage({ id: "AddEventModal.client.selector.headerTitle" }),
        selectedData: {
          clients: values.clientsIds,
          localClients: values.localClientsIds,
        },
        onSubmit: clients => {
          console.log("selected clients:", JSON.stringify(clients, null, 2));
          const clientsIds = clients.clients ?? [];
          const localClientsIds = clients.localClients ?? [];
          setFieldValue("clientsIds", clientsIds);
          setFieldValue("localClientsIds", localClientsIds);
        },
      },
    });
  }, [intl, navigation, setFieldValue, values.clientsIds, values.localClientsIds]);

  const renderErrorMessage = useCallback(() => {
    if (isEventDisabled) {
      return (
        <>
          <Messages type="warning" message="This event is no longer active." />
          <Space size="large" />
        </>
      );
    } else return null;
  }, [isEventDisabled]);

  useEffect(() => {
    if (updateEventStatus.isError) {
      Alert.alert("Error", updateEventStatus?.error?.message ?? "An error occurred.");
    }
  }, [updateEventStatus]);

  const handleStartTimeChange = (dateString: string) => {
    const hasDuration = selectedService?.durationInMin > 0;
    const defaultDuration = 30;
    setFieldValue("startTime", dateString);
    if (hasDuration) {
      const startTime = new Date(dateString);
      const expectedEndTime = new Date(startTime.getTime() + selectedService.durationInMin * 60000).toISOString();
      setFieldValue("expectedEndTime", expectedEndTime);
    } else {
      const startTime = new Date(dateString);
      const expectedEndTime = new Date(startTime.getTime() + defaultDuration * 60000).toISOString();
      setFieldValue("expectedEndTime", expectedEndTime);
    }
  };

  if (updateEventStatus.isLoading) {
    return <ActivityIndicator />;
  }

  // check if end time is number
  const selectedServiceHasDuration = !isNaN(selectedService?.durationInMin);

  return (
    <FormContainer footer={renderSubmitButton}>
      {renderErrorMessage()}
      <TextFieldCard
        disabled={isEventDisabled}
        title={intl.formatMessage({ id: "AddEventModal.name" })}
        placeholder={intl.formatMessage({ id: "AddEventModal.name" })}
        value={values?.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
      />
      <TextFieldCard
        disabled={isEventDisabled}
        title="Description"
        value={values?.description}
        multiline
        onChangeText={handleChange("description")}
        isTouched={touched.description}
        errors={errors.description}
      />
      <ButtonCard
        disabled={isEventDisabled}
        title={intl.formatMessage({ id: "AddEventModal.service.title" })}
        subTitle={selectedService ? selectedService.name : intl.formatMessage({ id: "AddEventModal.service.description" })}
        leftIconName={selectedService ? "circle" : "circle-outline"}
        leftIconColor={selectedService?.serviceColor?.hexCode ?? "grey"}
        onPress={handleServicePress}
      />
      <TimePickerFieldCard
        disabled={isEventDisabled}
        title={intl.formatMessage({ id: "AddEventModal.startTime" })}
        date={new Date(values.startTime)}
        onChange={handleStartTimeChange}
        isTouched={touched.startTime}
        errors={errors.startTime}
      />
      {selectedService?.durationInMin === 0 ? (
        <Messages size="small" hasShadow={false} type="info" message="This service has no time limit." />
      ) : (
        <TimePickerFieldCard
          disabled={isEventDisabled || selectedServiceHasDuration}
          title={intl.formatMessage({ id: "AddEventModal.endTime" })}
          date={new Date(values.expectedEndTime)}
          onChange={handleChange("expectedEndTime")}
          isTouched={touched.expectedEndTime}
          errors={errors.expectedEndTime}
        />
      )}
      {selectedService?.durationInMin > 0 ? (
        <Messages
          size="small"
          style={{ marginBottom: 16 }}
          hasShadow={false}
          type="info"
          message={`Service has a duration of ${getPrettyStringFromDurationInMin(selectedService?.durationInMin)}`}
        />
      ) : null}
      <ExpandableSection>
        <ButtonCard
          disabled={isEventDisabled}
          title={intl.formatMessage({ id: "AddEventModal.paymentMethod" })}
          subTitle={values.paymentMethod ? eventPaymentMethods[values.paymentMethod] : intl.formatMessage({ id: "AddEventModal.selectPaymentMethod" })}
          onPress={handlePaymentMethodUpdate}
        />
        <ButtonCard
          disabled={isEventDisabled || !!selectedService}
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
        <CurrencyFieldCard
          disabled={isEventDisabled || !!selectedService || isFree}
          title={intl.formatMessage({ id: "AddEventModal.price" })}
          keyboardType="number-pad"
          placeholder={intl.formatMessage({ id: "AddEventModal.enterPrice" })}
          value={values?.priceExpected}
          onChangeValue={price => setFieldValue("priceExpected", price)}
          isTouched={touched.priceExpected}
          errors={errors.priceExpected}
          currencyType={"USD"}
        />
        {selectedService?.price ? (
          <Messages
            size="small"
            style={{ marginBottom: 16 }}
            hasShadow={false}
            type="info"
            message={`Service has a price set to ${getPrettyStringFromPrice(selectedService?.currency, selectedService?.price)}`}
          />
        ) : null}
        <ButtonCard
          disabled={isEventDisabled}
          title={intl.formatMessage({ id: "AddEventModal.staff.title" })}
          subTitle={
            values.staffIds.length > 0
              ? `${intl.formatMessage({ id: "AddEventModal.staff.description" })}: ${values.staffIds.length}`
              : intl.formatMessage({ id: "AddEventModal.staff.emptyDescription" })
          }
          onPress={handleStaffUpdate}
        />
        <ButtonCard
          disabled={isEventDisabled}
          title={intl.formatMessage({ id: "AddEventModal.client.title" })}
          subTitle={
            clientsCount > 0
              ? `${intl.formatMessage({ id: "AddEventModal.client.description" })}: ${clientsCount}`
              : intl.formatMessage({ id: "AddEventModal.client.emptyDescription" })
          }
          onPress={handleClientsUpdate}
        />
        {/* <ButtonCard
          disabled={isEventDisabled}
          title={intl.formatMessage({ id: "AddEventModal.availableDiscountCodes.title" })}
          subTitle={values.selectedDiscountCode ? values.selectedDiscountCode.code : intl.formatMessage({ id: "AddEventModal.availableDiscountCodes.subTitle" })}
          onPress={handleDiscountCodeUpdate}
        />
        {values?.selectedDiscountCode?.code === "MANUAL" ? (
          <CurrencyFieldCard
            disabled={isEventDisabled}
            title="Discount Amount"
            keyboardType="number-pad"
            value={values?.selectedDiscountCode?.discount}
            onChangeValue={price => setFieldValue("selectedDiscountCode.discount", price)}
            isTouched={touched.selectedDiscountCode?.discount}
            errors={errors.selectedDiscountCode?.discount}
            currencyType={"USD"}
          />
        ) : null} */}
        {/* <ButtonCard
        rightIconName={values?.repeat ? "checkbox-outline" : "checkbox-blank-outline"}
        title={"Recurring"}
        disabled // TODO: implement recurring events
        onPress={() => {
          setFieldValue("repeat", !values?.repeat);
        }}
      /> */}
        <ButtonCard
          title={intl.formatMessage({ id: "AddEventModal.labels" })}
          disabled={isEventDisabled}
          subTitle={values.labels.length > 0 ? `${emojis}` : intl.formatMessage({ id: "AddEventModal.selectLabels" })}
          onPress={handleLabelUpdate}
        />
        <TextFieldCard
          disabled={isEventDisabled}
          title={intl.formatMessage({ id: "AddEventModal.notes" })}
          placeholder={intl.formatMessage({ id: "AddEventModal.enterNotes" })}
          value={values?.notes}
          multiline
          onChangeText={handleChange("notes")}
          isTouched={touched.notes}
          errors={errors.notes}
        />
      </ExpandableSection>
      <Space size="large" />
    </FormContainer>
  );
};
