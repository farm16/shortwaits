import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { CreateServiceDtoType } from "@shortwaits/shared-lib";

import {
  Space,
  ServiceColors,
  CurrencyFieldCard,
  TextFieldCard,
  Text,
  DurationFieldCard,
  Card,
  FormContainer,
  Button,
  BackButton,
} from "../../../../components";
import { ModalsScreenProps } from "../../../../navigation";
import { useBusiness, useMobileAdmin } from "../../../../store";
import { useForm } from "../../../../hooks";
import { useCreateServiceMutation } from "../../../../services";
import { Alert } from "react-native";
import { noop } from "lodash";

export const AddServicesModal: FC<ModalsScreenProps<"form-modal-screen">> = ({ navigation, route }) => {
  const { onSubmit = noop } = route.params;

  const mobileAdminData = useMobileAdmin();
  const business = useBusiness();
  const [createService, createServiceStatus] = useCreateServiceMutation();

  const defaultService = useMemo(() => {
    const defaultServiceColor = Object.keys(mobileAdminData.shortwaits.serviceColors)[0];
    return {
      businessId: business._id,
      name: "",
      description: "",
      hours: business.hours,
      applicableCategories: business.categories,
      staff: [],
      durationInMin: 30,
      price: 0,
      currency: "USD",
      isPrivate: false,
      isVideoConference: false,
      serviceColor: mobileAdminData.shortwaits.serviceColors[defaultServiceColor] ?? null,
      imageUrl: "",
    } as CreateServiceDtoType;
  }, [business._id, business.categories, business.hours, mobileAdminData.shortwaits.serviceColors]);

  const { touched, errors, values, handleChange, setFieldValue, handleSubmit } = useForm(
    {
      initialValues: defaultService,
      onSubmit: formData => {
        createService({
          businessId: business._id,
          body: formData,
        });
        onSubmit(formData);
      },
    },
    "addService"
  );

  useEffect(() => {
    if (createServiceStatus.isSuccess) {
      navigation.goBack();
    } else if (createServiceStatus.isError) {
      Alert.alert("Oops!", "Something went wrong. Please try again.", [
        {
          text: "Retry",
          onPress: () => {
            createService({
              businessId: business._id,
              body: values,
            });
          },
        },
        {
          text: "Cancel",
        },
      ]);
    }
  }, [business._id, createService, createServiceStatus.isError, createServiceStatus.isSuccess, navigation, values]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="text" text={"Add Service"} />,
    });
  }, [navigation]);

  const handleServiceColorChange = useCallback(
    serviceColor => {
      setFieldValue("serviceColor", serviceColor);
    },
    [setFieldValue]
  );

  const renderFooter = (
    <Button
      preset="primary"
      onPress={() => {
        handleSubmit();
      }}
      text="Submit"
    />
  );

  const renderDurationBar = useCallback(() => {
    const handleDurationTimeChange = durationInMin => {
      setFieldValue("durationInMin", durationInMin[0]);
    };

    return (
      <DurationFieldCard title="Duration" values={[values.durationInMin]} onValuesChange={handleDurationTimeChange} />
    );
  }, [setFieldValue, values.durationInMin]);

  return (
    <FormContainer footer={renderFooter}>
      {/**
       * @TODO this will be enabled after MVP
       * <Avatar imageUrl={values.imageUrl} size="medium" mode="upload" />
       * */}
      <Space size="small" />
      <Card mode="static">
        <Text preset="cardTitle" text={"Service color"} />
        <Space size="small" />
        <ServiceColors selectedColor={values?.serviceColor} onSelect={handleServiceColorChange} />
        <Space size="small" />
      </Card>
      <TextFieldCard
        title="Name"
        placeholder="Yoga class"
        value={values.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
      />
      <CurrencyFieldCard
        title="Price"
        keyboardType="number-pad"
        placeholder={"0.00"}
        value={values.price / 100}
        onChangeValue={price => setFieldValue("price", price * 100)}
        isTouched={touched.price}
        errors={errors.price}
        currencyType={"USD"}
      />
      <Space size="small" />
      {renderDurationBar()}
    </FormContainer>
  );
};
