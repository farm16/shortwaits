import React, { FC, useCallback, useEffect, useLayoutEffect } from "react";
import { ServiceDtoType } from "@shortwaits/shared-lib";
import { Alert } from "react-native";

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
  IconButton,
  ExpandableSection,
  ButtonCard,
} from "../../../../components";
import { ModalsScreenProps } from "../../../../navigation";
import { useForm } from "../../../../hooks";
import { useDeleteServiceMutation, useUpdateServiceMutation } from "../../../../services";
import { useBusiness } from "../../../../store";
import { FormikErrors } from "formik";

export const UpdateServicesModal: FC<ModalsScreenProps<"form-modal-screen">> = ({ navigation, route }) => {
  const service = route?.params?.initialValues as ServiceDtoType;

  const business = useBusiness();
  const [deleteService, deleteServiceStatus] = useDeleteServiceMutation();
  const [updateService, updateServiceStatus] = useUpdateServiceMutation();

  const { touched, errors, values, handleChange, setFieldValue, handleSubmit } = useForm(
    {
      initialValues: service,
      onSubmit: formData => {
        console.log("formData", JSON.stringify(formData, null, 2));
        updateService({
          businessId: business._id,
          body: formData,
        });
      },
    },
    "updateService"
  );

  useEffect(() => {
    if (deleteServiceStatus.isSuccess || updateServiceStatus.isSuccess) {
      navigation.goBack();
    }
  }, [deleteServiceStatus.isSuccess, navigation, updateServiceStatus.isSuccess]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="text" text={service.name} />,
      headerRight: () => (
        <IconButton
          iconType="delete"
          withMarginRight
          onPress={() => {
            Alert.alert("Delete Service", "Are you sure you want to delete this service?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Delete",
                onPress: () => {
                  deleteService({
                    businessId: business._id,
                    serviceId: service._id,
                  });
                },
              },
            ]);
          }}
        />
      ),
    });
  }, [business._id, deleteService, navigation, service._id, service.name]);

  const handleServiceColorChange = useCallback(
    serviceColor => {
      setFieldValue("serviceColor", serviceColor);
    },
    [setFieldValue]
  );

  console.log("errors >>>", errors);
  console.log("values", JSON.stringify(values, null, 2));

  const renderFooter = <Button preset="primary" onPress={() => handleSubmit()} text="Submit" />;

  const renderDurationBar = useCallback(() => {
    const handleDurationTimeChange = durationInMin => {
      console.log("durationInMin", durationInMin);
      setFieldValue("durationInMin", durationInMin[0]);
    };

    return (
      <DurationFieldCard title="Duration" values={[values.durationInMin]} onValuesChange={handleDurationTimeChange} />
    );
  }, [setFieldValue, values.durationInMin]);

  console.log("values", values?.serviceColor);

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

      <ExpandableSection>
        <Space size="small" />
        <ButtonCard
          rightIconName={values?.isPrivate ? "checkbox-outline" : "checkbox-blank-outline"}
          title={"Make Private"}
          subTitle={"Clients will need to request access\nto this service."}
          onPress={() => {
            setFieldValue("isPrivate", !values?.isPrivate);
          }}
        />
        <ButtonCard
          rightIconName={values?.isVideoConference ? "checkbox-outline" : "checkbox-blank-outline"}
          title={"Enable Video Conference"}
          onPress={() => {
            setFieldValue("isVideoConference", !values?.isVideoConference);
          }}
        />
        {values?.isVideoConference ? (
          <TextFieldCard
            title="Video Conference Link"
            value={values?.urls?.other1}
            placeholder="Insert link here (Zoom, Google Meet, etc.)"
            onChangeText={handleChange("urls.other1")}
            isTouched={touched.urls?.other1 ? true : false}
            errors={errors.urls?.other1 ? (errors.urls.other1 as FormikErrors<string>) ?? "" : ""}
          />
        ) : null}
      </ExpandableSection>
    </FormContainer>
  );
};
