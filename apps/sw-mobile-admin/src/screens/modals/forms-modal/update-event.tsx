import { BusinessUsersDtoType, EventDtoType, ServiceDtoType, UpdateEventDtoType, eventPaymentMethods, eventStatusCodes, eventStatusNames } from "@shortwaits/shared-lib";
import {
  ActivityIndicator,
  BackButton,
  Button,
  ButtonCard,
  CurrencyFieldCard,
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
  nextEventStatuses,
  useForm,
} from "@shortwaits/shared-ui";
import { FormikErrors } from "formik";
import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { GenericModalData, ModalsScreenProps } from "../../../navigation";
import { useUpdateEventMutation } from "../../../services";
import { useBusiness, useServices } from "../../../store";

export const UpdateEventModal: FC<ModalsScreenProps<"update-event-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit;
  const onGoBack = params?.onGoBack;
  const onSuccess = params?.onSuccess;

  console.log("serviceId >>>", params?.initialValues?.serviceId);
  const intl = useIntl();
  const services = useServices();
  const business = useBusiness();
  const [selectedService, setSelectedService] = useState(params?.initialValues?.serviceId ? services.find(service => service?._id === params?.initialValues?.serviceId) : null);
  const [isFree, setIsFree] = useState<boolean>(false);
  const statusName = params?.initialValues?.status?.statusName ?? "";
  const isEventDisabled = statusName ? nextEventStatuses[params?.initialValues?.status?.statusName].length === 0 : true;

  const [updateEvent, updateEventStatus] = useUpdateEventMutation();

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

  const initialValues = params?.initialValues;

  const { touched, errors, values, setValues, handleChange, handleSubmit, setFieldValue } = useForm(
    {
      // todo remove this hardcoded paymentMethod value
      initialValues: initialValues as FormSchemaTypes["updateEvent"],
      validate: validateDates,
      onSubmit: formData => {
        updateEvent({ businessId: business._id, body: formData as EventDtoType });
        if (onSubmit) {
          onSubmit();
        }
      },
    },
    "updateEvent"
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

                  updateEvent({
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
  }, [initialValues, intl, isEventDisabled, navigation, onGoBack, updateEvent, values]);

  useEffect(() => {
    if (updateEventStatus.isSuccess) {
      if (onSuccess) {
        onSuccess(updateEventStatus?.data?.data);
      }
      navigation.goBack();
    }
  }, [onSuccess, updateEventStatus.isSuccess, navigation, updateEventStatus.data]);

  const updateEventService = useCallback(
    (selectedService: ServiceDtoType) => {
      const validService = services.find(service => service._id === selectedService._id);
      if (validService) {
        const hasDuration = selectedService.durationInMin > 0;
        const startTime = new Date(values.startTime);
        const expectedEndTime = new Date(startTime.getTime() + selectedService.durationInMin * 60000).toISOString();
        setIsFree(selectedService.price === 0 ? true : false);
        setValues(
          {
            ...values,
            name: values.name,
            startTime: values.startTime,
            priceExpected: selectedService.price === 0 ? 0 : selectedService.price,
            serviceId: selectedService._id,
            isPublicEvent: !selectedService.isPrivate,
            durationInMin: selectedService.durationInMin,
            hasDuration: hasDuration,
            expectedEndTime: expectedEndTime,
          },
          false
        );
      }
    },
    [services, setValues, values]
  );

  if (updateEventStatus.isError) {
    Alert.alert("Error", updateEventStatus.error.message);
  }

  const renderSubmitButton = (
    <Button
      preset="secondary"
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

  const handleServiceUpdate = useCallback(() => {
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
            updateEventService(selectedService);
          }
        },
      },
    });
  }, [navigation, selectedService, setFieldValue, updateEventService, values.serviceId]);

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
        headerTitle: intl.formatMessage({ id: "AddEventModal.staff.selector.headerTitle" }),
        selectedData: values.staffIds,
        minSelectedItems: 1,
        onGoBack: staff => {
          const staffIds = (staff as BusinessUsersDtoType).map(s => s._id);
          setFieldValue("staffIds", staffIds);
        },
      },
    });
  }, [intl, navigation, setFieldValue, values.staffIds]);

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

  if (updateEventStatus.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FormContainer footer={renderSubmitButton}>
      {renderErrorMessage()}
      <TextFieldCard disabled={isEventDisabled} title="Name" value={values?.name} onChangeText={handleChange("name")} isTouched={touched.name} errors={errors.name} />
      <Space size="tiny" />
      <TextFieldCard
        disabled={isEventDisabled}
        title="Description"
        value={values?.description}
        multiline
        onChangeText={handleChange("description")}
        isTouched={touched.description}
        errors={errors.description}
      />
      <Space size="tiny" />
      <TextFieldCard
        disabled={isEventDisabled}
        title="Notes"
        value={values?.notes}
        multiline
        onChangeText={handleChange("notes")}
        isTouched={touched.notes}
        errors={errors.notes}
      />
      <ButtonCard title="Labels" disabled={isEventDisabled} subTitle={values.labels.length > 0 ? `${emojis}` : "Select labels"} onPress={handleLabelUpdate} />
      <ButtonCard
        disabled={isEventDisabled}
        title={intl.formatMessage({ id: "AddEventModal.service.title" })}
        subTitle={selectedService ? selectedService.name : intl.formatMessage({ id: "AddEventModal.service.description" })}
        leftIconName={selectedService ? "circle" : "circle-outline"}
        leftIconColor={selectedService?.serviceColor?.hexCode ?? "grey"}
        onPress={handleServiceUpdate}
      />
      <ButtonCard
        disabled={isEventDisabled}
        isVisible={!selectedService}
        rightIconName={values?.hasDuration ? "checkbox-outline" : "checkbox-blank-outline"}
        title={intl.formatMessage({ id: "AddEventModal.noDuration" })}
        onPress={() => {
          setFieldValue("hasDuration", !values?.hasDuration);
        }}
      />
      <TimePickerFieldCard
        disabled={isEventDisabled}
        title={intl.formatMessage({ id: "AddEventModal.startTime" })}
        date={new Date(values.startTime)}
        onChange={handleChange("startTime")}
        isTouched={touched.startTime}
        errors={errors.startTime}
      />
      <TimePickerFieldCard
        disabled={values?.hasDuration || isEventDisabled}
        title={intl.formatMessage({ id: "AddEventModal.endTime" })}
        date={new Date(values.expectedEndTime)}
        onChange={handleChange("expectedEndTime")}
        isTouched={touched.expectedEndTime}
        errors={errors.expectedEndTime}
      />

      {selectedService?.price === 0 ? null : (
        <ButtonCard
          disabled={!selectedService || isEventDisabled}
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
      <ButtonCard
        disabled={isEventDisabled}
        title={intl.formatMessage({ id: "AddEventModal.paymentMethod" })}
        subTitle={values.paymentMethod ? eventPaymentMethods[values.paymentMethod] : intl.formatMessage({ id: "AddEventModal.selectPaymentMethod" })}
        onPress={handlePaymentMethodUpdate}
      />
      <CurrencyFieldCard
        disabled={!!selectedService || isEventDisabled}
        title={intl.formatMessage({ id: "AddEventModal.price" })}
        keyboardType="number-pad"
        placeholder={intl.formatMessage({ id: "AddEventModal.enterPrice" })}
        value={values?.priceExpected}
        onChangeValue={price => setFieldValue("priceExpected", price)}
        isTouched={touched.priceExpected}
        errors={errors.priceExpected}
        currencyType={"USD"}
      />
      <ButtonCard
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
      ) : null}
      <ButtonCard
        rightIconName={values?.repeat ? "checkbox-outline" : "checkbox-blank-outline"}
        title={"Recurring"}
        disabled // TODO: implement recurring events
        onPress={() => {
          setFieldValue("repeat", !values?.repeat);
        }}
      />
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
        disabled={!values?.isPublicEvent || isEventDisabled}
        title={intl.formatMessage({ id: "AddEventModal.client.title" })}
        subTitle={
          clientsCount > 0
            ? `${intl.formatMessage({ id: "AddEventModal.client.description" })}: ${clientsCount}`
            : intl.formatMessage({ id: "AddEventModal.client.emptyDescription" })
        }
        onPress={handleClientsUpdate}
      />
      <Space size="large" />
    </FormContainer>
  );
};
