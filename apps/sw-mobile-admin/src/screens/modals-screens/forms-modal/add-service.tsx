import { CreateServiceDtoType } from "@shortwaits/shared-lib";
import {
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
  useForm,
} from "@shortwaits/shared-ui";
import { FormikErrors } from "formik";
import { noop } from "lodash";
import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
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
      hasDuration: false,
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

  // console.log("mobileAdminData.shortwaits >>>", JSON.stringify(mobileAdminData.shortwaits, null, 2));
  console.log("errors >>>", errors);

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
      headerTitle: () => <Text preset="headerTitle" text={intl.formatMessage({ id: "Common.addService" })} />,
    });
  }, [intl, navigation]);

  const handleServiceColorChange = useCallback(
    serviceColor => {
      console.log("serviceColor >>>", serviceColor);
      setFieldValue("serviceColor", serviceColor);
    },
    [setFieldValue]
  );

  const renderFooter = (
    <Button
      preset="secondary"
      onPress={() => {
        handleSubmit();
      }}
      text={intl.formatMessage({
        id: "Common.submit",
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
      <Space size="small" />
      <Card mode="static">
        <Text
          preset="cardTitle"
          text={intl.formatMessage({
            id: "AddServiceModal.serviceColor",
          })}
        />
        <Space size="small" />
        <ServiceColors selectedColor={values?.serviceColor} onSelect={handleServiceColorChange} serviceColors={mobileAdminData.shortwaits.serviceColors} />
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
        value={values.price}
        onChangeValue={price => setFieldValue("price", price)}
        isTouched={touched.price}
        errors={errors.price}
        currencyType={"USD"}
      />
      <Space size="small" />
      <ButtonCard
        // disabled={isEventDisabled || !!selectedService}
        rightIconName={values?.durationInMin === 0 ? "checkbox-outline" : "checkbox-blank-outline"}
        title={"No Duration"}
        onPress={() => {
          if (values?.durationInMin === 0) {
            setFieldValue("durationInMin", 30);
          } else {
            setFieldValue("durationInMin", 0);
          }
        }}
      />
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
