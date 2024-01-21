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
  ServiceColors,
  Space,
  Text,
  TextFieldCard,
} from "@shortwaits/shared-ui";
import { CreateServiceDtoType } from "@shortwaits/shared-utils";
import { FormikErrors } from "formik";
import { noop } from "lodash";
import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { useForm } from "../../../hooks";
import { ModalsScreenProps } from "../../../navigation";
import { useCreateServiceMutation } from "../../../services";
import { useBusiness, useMobileAdmin } from "../../../store";

export const AddServicesModal: FC<ModalsScreenProps<"add-service-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit ?? noop;

  const intl = useIntl();
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
        if (onSubmit) {
          onSubmit(formData);
        }
      },
    },
    "addService"
  );

  useEffect(() => {
    if (createServiceStatus.isSuccess) {
      navigation.goBack();
    } else if (createServiceStatus.isError) {
      Alert.alert(intl.formatMessage({ id: "Common.error.oops" }), intl.formatMessage({ id: "Common.error.somethingWentWrong" }), [
        {
          text: intl.formatMessage({ id: "Common.retry" }),
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
  }, [business._id, createService, createServiceStatus.isError, createServiceStatus.isSuccess, intl, navigation, values]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => (
        <Text
          preset="text"
          text={intl.formatMessage({
            id: "Common.addService",
          })}
        />
      ),
    });
  }, [intl, navigation]);

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
      text={intl.formatMessage({
        id: "Common.add",
      })}
    />
  );

  const renderDurationBar = useCallback(() => {
    const handleDurationTimeChange = durationInMin => {
      setFieldValue("durationInMin", durationInMin[0]);
    };

    return (
      <DurationFieldCard
        title={intl.formatMessage({
          id: "AddServiceModal.duration",
        })}
        values={[values.durationInMin]}
        onValuesChange={handleDurationTimeChange}
      />
    );
  }, [intl, setFieldValue, values.durationInMin]);

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
        <Text
          preset="cardTitle"
          text={intl.formatMessage({
            id: "AddServiceModal.serviceColor",
          })}
        />
        <Space size="small" />
        <ServiceColors selectedColor={values?.serviceColor} onSelect={handleServiceColorChange} />
        <Space size="small" />
      </Card>
      <TextFieldCard
        title={intl.formatMessage({
          id: "AddServiceModal.name",
        })}
        placeholder={intl.formatMessage({
          id: "AddServiceModal.name.placeholder",
        })}
        value={values.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
      />
      <CurrencyFieldCard
        title={intl.formatMessage({
          id: "AddServiceModal.price",
        })}
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
          title={intl.formatMessage({ id: "AddServiceModal.makePrivate" })}
          subTitle={intl.formatMessage({ id: "AddServiceModal.makePrivate.description" })}
          onPress={() => {
            setFieldValue("isPrivate", !values?.isPrivate);
          }}
        />
        <ButtonCard
          rightIconName={values?.isVideoConference ? "checkbox-outline" : "checkbox-blank-outline"}
          title={intl.formatMessage({ id: "AddServiceModal.enableVideoConference" })}
          subTitle={intl.formatMessage({ id: "AddServiceModal.enableVideoConference.description" })}
          onPress={() => {
            setFieldValue("isVideoConference", !values?.isVideoConference);
          }}
        />
        <TextFieldCard
          disabled={!values?.isVideoConference}
          title={intl.formatMessage({ id: "AddServiceModal.enableVideoConference.link" })}
          value={values?.urls?.other1}
          placeholder={intl.formatMessage({ id: "AddServiceModal.enableVideoConference.link.description" })}
          onChangeText={handleChange("urls.other1")}
          isTouched={touched.urls?.other1 ? true : false}
          errors={errors.urls?.other1 ? (errors.urls.other1 as FormikErrors<string>) ?? "" : ""}
        />
      </ExpandableSection>
    </FormContainer>
  );
};
