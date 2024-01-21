import {
  Avatar,
  BackButton,
  Button,
  ButtonCard,
  Card,
  CurrencyFieldCard,
  DurationFieldCard,
  ExpandableSection,
  FormContainer,
  IconButton,
  ServiceColors,
  Space,
  Text,
  TextFieldCard,
} from "@shortwaits/shared-ui";
import { ServiceDtoType } from "@shortwaits/shared-utils";
import { FormikErrors } from "formik";
import { noop } from "lodash";
import React, { FC, useCallback, useEffect, useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { useForm } from "../../../hooks";
import { ModalsScreenProps } from "../../../navigation";
import { useDeleteServiceMutation, useUpdateServiceMutation } from "../../../services";
import { useBusiness } from "../../../store";

export const UpdateServicesModal: FC<ModalsScreenProps<"update-service-modal-screen">> = ({ navigation, route }) => {
  const service = route?.params?.initialValues as ServiceDtoType;

  const intl = useIntl();
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
            Alert.alert(intl.formatMessage({ id: "UpdateServiceModal.alertDelete.title" }), intl.formatMessage({ id: "UpdateServiceModal.alertDelete.message" }), [
              {
                text: intl.formatMessage({ id: "Common.cancel" }),
                style: "cancel",
              },
              {
                text: intl.formatMessage({ id: "Common.delete" }),
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
  }, [business._id, deleteService, intl, navigation, service._id, service.name]);

  const handleServiceColorChange = useCallback(
    serviceColor => {
      setFieldValue("serviceColor", serviceColor);
    },
    [setFieldValue]
  );

  const renderFooter = <Button preset="primary" onPress={() => handleSubmit()} text={intl.formatMessage({ id: "Common.update" })} />;

  const renderDurationBar = useCallback(() => {
    const handleDurationTimeChange = durationInMin => {
      console.log("durationInMin", durationInMin);
      setFieldValue("durationInMin", durationInMin[0]);
    };

    return <DurationFieldCard title={intl.formatMessage({ id: "UpdateServiceModal.duration" })} values={[values.durationInMin]} onValuesChange={handleDurationTimeChange} />;
  }, [intl, setFieldValue, values.durationInMin]);

  console.log("values", values?.serviceColor);

  return (
    <FormContainer footer={renderFooter}>
      <Avatar
        url={values.imageUrl}
        style={{
          alignSelf: "center",
        }}
        size="medium"
        mode="upload"
        onPress={noop}
      />
      <Space size="small" />
      <Card mode="static">
        <Text preset="cardTitle" text={intl.formatMessage({ id: "UpdateServiceModal.serviceColor" })} />
        <Space size="small" />
        <ServiceColors selectedColor={values?.serviceColor} onSelect={handleServiceColorChange} />
        <Space size="small" />
      </Card>
      <TextFieldCard
        title={intl.formatMessage({ id: "UpdateServiceModal.name" })}
        placeholder="Yoga class"
        value={values.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
      />
      <CurrencyFieldCard
        title={intl.formatMessage({ id: "UpdateServiceModal.price" })}
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
          title={intl.formatMessage({ id: "UpdateServiceModal.makePrivate" })}
          subTitle={intl.formatMessage({ id: "UpdateServiceModal.makePrivate.description" })}
          onPress={() => {
            setFieldValue("isPrivate", !values?.isPrivate);
          }}
        />
        <ButtonCard
          rightIconName={values?.isVideoConference ? "checkbox-outline" : "checkbox-blank-outline"}
          title={intl.formatMessage({ id: "UpdateServiceModal.enableVideoConference" })}
          subTitle={intl.formatMessage({ id: "UpdateServiceModal.enableVideoConference.description" })}
          onPress={() => {
            setFieldValue("isVideoConference", !values?.isVideoConference);
          }}
        />
        <TextFieldCard
          disabled={!values?.isVideoConference}
          title={intl.formatMessage({ id: "UpdateServiceModal.enableVideoConference.link" })}
          value={values?.urls?.other1}
          placeholder={intl.formatMessage({ id: "UpdateServiceModal.enableVideoConference.link.description" })}
          onChangeText={handleChange("urls.other1")}
          isTouched={touched.urls?.other1 ? true : false}
          errors={errors.urls?.other1 ? (errors.urls.other1 as FormikErrors<string>) ?? "" : ""}
        />
      </ExpandableSection>
    </FormContainer>
  );
};
