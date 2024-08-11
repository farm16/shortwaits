import { CreateEventDtoType, ServiceDtoType, eventPaymentMethods } from "@shortwaits/shared-lib";
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
  getEmojiString,
  getPrettyStringFromDurationInMin,
  getPrettyStringFromPrice,
  useForm,
} from "@shortwaits/shared-ui";
import { FormikErrors } from "formik";
import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { GenericModalData, ModalsScreenProps } from "../../../navigation";
import { useCreateBusinessEventMutation } from "../../../services";
import { useBusiness, useUser } from "../../../store";

export const AddEventModal: FC<ModalsScreenProps<"add-event-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit;
  const onGoBack = params?.onGoBack;
  const onSuccess = params?.onSuccess;

  const intl = useIntl();
  const user = useUser();
  const business = useBusiness();
  const [selectedService, setSelectedService] = useState<ServiceDtoType | null>(null);
  const [isFree, setIsFree] = useState<boolean>(true);
  const [createBusinessEvent, createEventStatus] = useCreateBusinessEventMutation();

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
    const _initialValues: FormSchemaTypes["createBusinessEvent"] = {
      participantsIds: [],
      leadClientId: "",
      urls: [],
      location: {
        name: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
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
      localClientsIds: [],
      hasDuration: true,
      eventImage: "",
      businessId: business._id,
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
      endTime: "",
      canceled: false,
      cancellationReason: "",
      priceFinal: 0,
      discountAmount: 0,
      availableDiscountCodes: [
        {
          code: "MANUAL",
          discount: null,
          description: "Manual Discount",
        },
      ],
      payment: null,
      selectedDiscountCode: null,
    };
    return _initialValues;
  }, [business._id, user?._id]);

  const { touched, errors, values, handleChange, handleSubmit, setFieldValue, setValues, dirty } = useForm(
    {
      initialValues: initialValues,
      validate: validateDates,
      onSubmit: formData => {
        createBusinessEvent({ businessId: business._id, body: formData });
        if (onSubmit) {
          onSubmit();
        }
      },
    },
    "createBusinessEvent"
  );

  console.log("errors", errors);

  useLayoutEffect(() => {
    const handleOnGoBack = () => {
      if (dirty) {
        Alert.alert("Are you sure you want to leave?", "You have unsaved changes.", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Accept",
            onPress: () => {
              onGoBack && onGoBack();
              navigation.goBack();
            },
          },
        ]);
      } else {
        onGoBack && onGoBack();
        navigation.goBack();
      }
    };
    const handleReset = () => {
      setValues(initialValues, false);
    };
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={handleOnGoBack} />,
      headerRight: () => <IconButton iconType="reset" onPress={handleReset} withMarginRight />,
      headerTitle: () => <Text preset="headerTitle" text={intl.formatMessage({ id: "AddEventModal.title" })} />,
    });
  }, [navigation, intl, setValues, initialValues, onGoBack, values, dirty]);

  useEffect(() => {
    if (createEventStatus.isSuccess) {
      if (onSuccess) {
        onSuccess(createEventStatus?.data?.data);
      }
      navigation.goBack();
    }
  }, [onSuccess, createEventStatus.isSuccess, navigation, createEventStatus.data]);

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

  if (createEventStatus.isError) {
    Alert.alert(intl.formatMessage({ id: "AddEventModal.errorTitle" }), createEventStatus.error.message);
  }

  const renderSubmitButton = (
    <Button
      preset="secondary"
      text={intl.formatMessage({ id: "Common.submit" })}
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  const emojis = values.labels.map(label => getEmojiString(label.emojiShortName)).join(" ");

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

  const handleIsFreePress = useCallback(() => {
    setIsFree(isFree => {
      if (!isFree) {
        setFieldValue("priceExpected", 0);
      }
      return !isFree;
    });
  }, [setFieldValue]);

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

  const handleClientPress = useCallback(() => {
    navigation.navigate("modals", {
      screen: "business-clients-modal-screen",
      params: {
        mode: "client-selector",
        headerTitle: intl.formatMessage({ id: "AddEventModal.client.selector.headerTitle" }),
        selectedData: {
          clients: values.clientsIds,
          localClients: values.localClientsIds,
        },
        onSubmit: selectedClients => {
          console.log("selected clients >>>", selectedClients);
          const { clients: clientIds, localClients: localClientIds } = selectedClients;
          setFieldValue("clientsIds", clientIds);
          setFieldValue("localClientsIds", localClientIds);
        },
      },
    });
  }, [intl, navigation, setFieldValue, values.clientsIds, values.localClientsIds]);

  const handleStaffPress = useCallback(() => {
    console.log("handleStaffPress >>>", values.staffIds);
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

  const handleLabelPress = useCallback(() => {
    const selectedData = values.labels.map(label => {
      return label.emojiShortName;
    });
    navigation.navigate("modals", {
      screen: "selector-modal-screen",
      params: {
        mode: "eventLabels",
        selectedData: selectedData,
        onSubmit: labels => {
          console.log("selected labels >>>", labels);
          setFieldValue("labels", labels);
        },
      },
    });
  }, [navigation, setFieldValue, values.labels]);

  const handlePaymentMethodPress = useCallback(() => {
    navigation.navigate("modals", {
      screen: "selector-modal-screen",
      params: {
        mode: "static",
        headerTitle: intl.formatMessage({ id: "AddEventModal.paymentMethod" }),
        data: Object.keys(eventPaymentMethods).map(_id => {
          return {
            _id,
            title: eventPaymentMethods[_id],
          };
        }),
        onSelect: selectedData => {
          const paymentMethod = selectedData[0] as GenericModalData;
          setFieldValue("paymentMethod", paymentMethod._id);
        },
      },
    });
  }, [navigation, setFieldValue, intl]);

  if (createEventStatus.isLoading) {
    return <ActivityIndicator />;
  }

  const selectedServiceHasDuration = !isNaN(selectedService?.durationInMin);

  return (
    <FormContainer footer={renderSubmitButton}>
      <TextFieldCard
        title={intl.formatMessage({ id: "AddEventModal.name" })}
        placeholder={intl.formatMessage({ id: "AddEventModal.name" })}
        value={values.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
      />
      <TextFieldCard
        title={intl.formatMessage({ id: "AddEventModal.description" })}
        placeholder={intl.formatMessage({ id: "AddEventModal.enterDescription" })}
        value={values.description}
        onChangeText={handleChange("description")}
        isTouched={touched.description}
        errors={errors.description}
      />
      <ButtonCard
        title={intl.formatMessage({ id: "AddEventModal.service.title" })}
        subTitle={selectedService ? selectedService.name : intl.formatMessage({ id: "AddEventModal.service.description" })}
        leftIconName={selectedService ? "circle" : "circle-outline"}
        leftIconColor={selectedService?.serviceColor?.hexCode ?? "grey"}
        onPress={handleServicePress}
        isTouched={touched.serviceId}
        errors={errors.serviceId}
      />
      <TimePickerFieldCard
        title={intl.formatMessage({ id: "AddEventModal.startTime" })}
        date={new Date(values.startTime)}
        onChange={handleChange("startTime")}
        isTouched={touched.startTime}
        errors={errors.startTime}
      />
      {selectedService?.durationInMin === 0 ? (
        <Messages size="small" hasShadow={false} type="info" message="This service has no time limit." />
      ) : (
        <TimePickerFieldCard
          disabled={selectedServiceHasDuration}
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
          title={intl.formatMessage({ id: "AddEventModal.paymentMethod" })}
          subTitle={values.paymentMethod ? eventPaymentMethods[values.paymentMethod] : intl.formatMessage({ id: "AddEventModal.selectPaymentMethod" })}
          onPress={handlePaymentMethodPress}
        />
        <ButtonCard
          disabled={!!selectedService}
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
          disabled={!!selectedService || isFree}
          title={intl.formatMessage({ id: "AddEventModal.price" })}
          keyboardType="number-pad"
          placeholder={intl.formatMessage({ id: "AddEventModal.enterPrice" })}
          value={values.priceExpected}
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
          title={intl.formatMessage({ id: "AddEventModal.client.title" })}
          subTitle={
            values.clientsIds.length + values.localClientsIds.length > 0
              ? `${intl.formatMessage({ id: "AddEventModal.client.description" })}: ${values.clientsIds.length + values.localClientsIds.length}`
              : intl.formatMessage({ id: "AddEventModal.client.emptyDescription" })
          }
          onPress={handleClientPress}
        />
        <ButtonCard
          title={intl.formatMessage({ id: "AddEventModal.staff.title" })}
          subTitle={
            values.staffIds.length > 0
              ? `${intl.formatMessage({ id: "AddEventModal.staff.description" })}: ${values.staffIds.length}`
              : intl.formatMessage({ id: "AddEventModal.staff.emptyDescription" })
          }
          onPress={handleStaffPress}
        />
        <ButtonCard
          isVisible={!selectedService}
          rightIconName={values?.isPublicEvent ? "checkbox-outline" : "checkbox-blank-outline"}
          title={intl.formatMessage({ id: "AddEventModal.isPublicEvent" })}
          subTitle={intl.formatMessage({ id: "AddEventModal.isPublicEvent.description" }, { isPublicEvent: values?.isPublicEvent })}
          onPress={() => {
            setFieldValue("isPublicEvent", !values?.isPublicEvent);
          }}
        />
        {/* <ButtonCard
          title={intl.formatMessage({ id: "AddEventModal.availableDiscountCodes.title" })}
          subTitle={values.selectedDiscountCode ? values.selectedDiscountCode.code : intl.formatMessage({ id: "AddEventModal.availableDiscountCodes.subTitle" })}
          onPress={handleDiscountCodeUpdate}
      /> */}
        {/* {values?.selectedDiscountCode?.code === "MANUAL" ? (
          <CurrencyFieldCard
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
          subTitle={values.labels.length > 0 ? `${emojis}` : intl.formatMessage({ id: "AddEventModal.selectLabels" })}
          onPress={handleLabelPress}
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
