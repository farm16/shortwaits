import { ServiceColorType, ServiceDtoType } from "@shortwaits/shared-lib";
import {
  ActivityIndicator,
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
  useForm,
} from "@shortwaits/shared-ui";
import { FormikErrors } from "formik";
import { noop } from "lodash";
import React, { FC, useCallback, useEffect, useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { ModalsScreenProps } from "../../../navigation";
import { useDeleteServiceMutation, useUpdateServiceMutation } from "../../../services";
import { useBusiness, useMobileAdmin } from "../../../store";

export const UpdateServicesModal: FC<ModalsScreenProps<"update-service-modal-screen">> = ({ navigation, route }) => {
  const service = route?.params?.initialValues as ServiceDtoType;

  const intl = useIntl();
  const business = useBusiness();
  const shortwaitsAdmin = useMobileAdmin();
  const [deleteService, deleteServiceStatus] = useDeleteServiceMutation();
  const [updateService, updateServiceStatus] = useUpdateServiceMutation();

  const isLoading = deleteServiceStatus.isLoading || updateServiceStatus.isLoading;

  const { touched, errors, values, handleChange, setFieldValue, handleSubmit, dirty } = useForm<ServiceDtoType>(
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

  console.log(">>>", errors);

  useEffect(() => {
    if (deleteServiceStatus.isSuccess || updateServiceStatus.isSuccess) {
      navigation.goBack();
    }
  }, [deleteServiceStatus.isSuccess, navigation, updateServiceStatus.isSuccess]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            if (dirty) {
              Alert.alert("Are you sure you want to leave?", "You have unsaved changes.", [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Accept",
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ]);
            } else {
              navigation.goBack();
            }
          }}
        />
      ),
      headerTitle: () => <Text preset="headerTitle" text={service.name} />,
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
  }, [business._id, deleteService, dirty, intl, navigation, service._id, service.name]);

  const handleServiceColorChange = useCallback(
    (serviceColor: ServiceColorType) => {
      // remove # from hexCode
      const hexCode = serviceColor.hexCode.replace("#", "");
      const newImageUrl = `https://ui-avatars.com/api/?name=S3&background=${hexCode}&color=fff`;
      setFieldValue("imageUrl", newImageUrl);
      setFieldValue("serviceColor", serviceColor);
    },
    [setFieldValue]
  );

  const renderFooter = <Button preset="secondary" disabled={!dirty} onPress={() => handleSubmit()} text={intl.formatMessage({ id: "Common.done" })} />;

  const renderDurationBar = useCallback(() => {
    const handleDurationTimeChange = durationInMin => {
      console.log("durationInMin", durationInMin);
      setFieldValue("durationInMin", durationInMin[0]);
    };

    return <DurationFieldCard title={intl.formatMessage({ id: "UpdateServiceModal.duration" })} values={[values.durationInMin]} onValuesChange={handleDurationTimeChange} />;
  }, [intl, setFieldValue, values.durationInMin]);

  console.log("DIRTY >>>", dirty);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FormContainer footer={renderFooter}>
      <Avatar
        url={values.imageUrl}
        style={{
          alignSelf: "center",
        }}
        size="medium"
        mode="static"
        onPress={noop}
      />
      <Space size="small" />
      <Card mode="static">
        <Text preset="cardTitle" text={intl.formatMessage({ id: "UpdateServiceModal.serviceColor" })} />
        <Space size="small" />
        <ServiceColors selectedColor={values?.serviceColor} onSelect={handleServiceColorChange} serviceColors={shortwaitsAdmin.shortwaits.serviceColors} />
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
        value={values.price}
        onChangeValue={price => {
          setFieldValue("price", price);
        }}
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
