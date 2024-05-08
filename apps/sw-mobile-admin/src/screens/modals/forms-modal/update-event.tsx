import { BusinessUsersDtoType, ServiceDtoType, UpdateEventDtoType, eventPaymentMethods } from "@shortwaits/shared-lib";
import {
  BackButton,
  Button,
  ButtonCard,
  CurrencyFieldCard,
  FormContainer,
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
import { noop } from "lodash";
import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { GenericModalData, ModalsScreenProps } from "../../../navigation";
import { useUpdateEventMutation } from "../../../services";
import { useBusiness, useServices } from "../../../store";

export const UpdateEventModal: FC<ModalsScreenProps<"update-event-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit ?? noop;
  const onGoBack = params?.onGoBack ?? noop;
  const closeOnSubmit = params?.closeOnSubmit ?? true;
  const initialValues = params?.initialValues ?? null;

  const intl = useIntl();
  const services = useServices();
  const business = useBusiness();
  const [selectedService, setSelectedService] = useState<ServiceDtoType | null>(initialValues.serviceId ? services.find(service => service._id === initialValues.serviceId) : null);
  const [isFree, setIsFree] = useState<boolean>(false);
  const [updateEvent, updateEventStatus] = useUpdateEventMutation();
  const isEventDisabled = nextEventStatuses[initialValues?.status?.statusName].length === 0;

  const customEventValidation = (formData: UpdateEventDtoType): FormikErrors<UpdateEventDtoType> => {
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

  console.log("initialValues >>>>>", JSON.stringify(initialValues, null, 2));
  const { touched, errors, values, setValues, handleChange, handleSubmit, setFieldValue } = useForm(
    {
      // todo remove this hardcoded paymentMethod value
      initialValues: initialValues,
      validate: customEventValidation,
      onSubmit: formData => {
        console.log("create event >>>>> ", formData);
        if (onSubmit) {
          onSubmit(formData);
        }
        updateEvent({ businessId: business._id, body: formData });
      },
    },
    "updateEvent"
  );

  const handleOnGoBack = useCallback(() => {
    const onAbort = () => {
      navigation.goBack();
    };
    if (onGoBack) {
      onGoBack(values);
    }
    compareFormObjectsBeforeAbort({ obj1: initialValues, obj2: values, onAbort });
  }, [initialValues, navigation, onGoBack, values]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={handleOnGoBack} />,
      headerRight: () => (
        <IconButton
          disabled={isEventDisabled}
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
      headerTitle: () => <Text preset="headerTitle" text="Update Event" />,
    });
  }, [handleOnGoBack, isEventDisabled, navigation]);

  useEffect(() => {
    if (!selectedService) {
      setValues(initialValues, false);
    } else return;
  }, [initialValues, selectedService, setValues]);

  useEffect(() => {
    if (selectedService) {
      const hasDuration = selectedService.durationInMin > 0;
      const startTime = new Date(values.startTime);
      const expectedEndTime = new Date(startTime.getTime() + selectedService.durationInMin * 60000).toISOString();
      setIsFree(selectedService.price === 0 ? true : false);
      setValues(
        {
          ...initialValues,
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
    } else return;
  }, [initialValues, selectedService, setValues, values.name, values.startTime]);

  useEffect(() => {
    if (updateEventStatus.isSuccess && closeOnSubmit) {
      navigation.goBack();
    }
  }, [closeOnSubmit, updateEventStatus.isSuccess, navigation]);

  if (updateEventStatus.isError) {
    Alert.alert("Error", updateEventStatus.error.message);
  }

  const renderSubmitButton = (
    <Button
      text="Update"
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  console.log("errors >>>>>", JSON.stringify(errors, null, 2));
  const emojis = values.labels.map(label => getEmojiString(label.emojiShortName)).join(" ");
  const clientsCount = getArrCount(values.clientsIds) + getArrCount(values.localClientsIds);

  const renderErrorMessage = useCallback(() => {
    if (isEventDisabled) {
      return <Messages type="warning" message="This event is no longer active." />;
    } else return null;
  }, [isEventDisabled]);

  return updateEventStatus.isLoading ? (
    <ActivityIndicator />
  ) : (
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
      <ButtonCard
        title="Labels"
        disabled={isEventDisabled}
        subTitle={values.labels.length > 0 ? `${emojis}` : "Select labels"}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              mode: "eventLabels",
              data: values.labels,
              onSubmit: labels => {
                if (labels.length > 0) {
                  setFieldValue("labels", labels);
                }
              },
            },
          })
        }
      />
      <ButtonCard
        disabled={isEventDisabled}
        title={intl.formatMessage({ id: "AddEventModal.service.title" })}
        subTitle={selectedService ? selectedService.name : intl.formatMessage({ id: "AddEventModal.service.description" })}
        leftIconName={selectedService ? "circle" : "circle-outline"}
        leftIconColor={selectedService?.serviceColor?.hexCode ?? "grey"}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              mode: "services",
              searchable: true,
              selectedData: selectedService ? [selectedService._id] : [],
              onSelect: (service: ServiceDtoType[]) => {
                const selectedService = service[0];
                if (selectedService._id === values.serviceId) {
                  setFieldValue("serviceId", "");
                  setSelectedService(null);
                } else {
                  setSelectedService(selectedService);
                  setFieldValue("serviceId", selectedService._id);
                }
              },
            },
          })
        }
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
        onPress={() =>
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
          })
        }
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
        onPress={() =>
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
          })
        }
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
        onPress={() =>
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
          })
        }
      />
      <ButtonCard
        disabled={!values?.isPublicEvent || isEventDisabled}
        title={intl.formatMessage({ id: "AddEventModal.client.title" })}
        subTitle={
          clientsCount > 0
            ? `${intl.formatMessage({ id: "AddEventModal.client.description" })}: ${clientsCount}`
            : intl.formatMessage({ id: "AddEventModal.client.emptyDescription" })
        }
        onPress={() =>
          navigation.navigate("modals", {
            screen: "clients-selector-modal-screen",
            params: {
              mode: "clientsAndLocalClients",
              headerTitle: intl.formatMessage({ id: "AddEventModal.client.selector.headerTitle" }),
              selectedData: {
                clients: values.clientsIds,
                localClients: values.localClientsIds,
              },
              onGoBack: clients => {
                console.log("selected clients:", JSON.stringify(clients, null, 2));
                const clientsIds = clients.clients ?? [];
                const localClientsIds = clients.localClients ?? [];
                setFieldValue("clientsIds", clientsIds);
                setFieldValue("localClientsIds", localClientsIds);
              },
            },
          })
        }
      />
      <Space size="large" />
    </FormContainer>
  );
};
