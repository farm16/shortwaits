import { UpdateBusinessDtoType } from "@shortwaits/shared-lib";
import {
  Avatar,
  BackButton,
  Button,
  ButtonCard,
  FormContainer,
  PhoneNumberCard,
  STATIC_FORM_AMERICAN_COUNTRIES,
  STATIC_FORM_USA_STATES,
  Space,
  Text,
  TextFieldCard,
  compareFormObjectsBeforeAbort,
} from "@shortwaits/shared-ui";
import React, { Fragment, useEffect, useLayoutEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { useForm, useSelectImage } from "../../../hooks";
import { AuthorizedScreenProps } from "../../../navigation";
import { useUpdateBusinessMutation } from "../../../services";
import { useBusiness } from "../../../store";

export function BusinessProfileScreen({ navigation }: AuthorizedScreenProps<"business-profile-screen">) {
  const business = useBusiness();
  const intl = useIntl();

  const initialValues = useMemo(() => {
    const _initialValues: UpdateBusinessDtoType = {
      web: business.web,
      shortName: business.shortName,
      longName: business.longName,
      description: business.description,
      email: business.email,
      phone1: business.phone1,
      location: business.location,
      // todo: add these fields
      // labels: business.labels,
      // currency: business.currency,
      // taggedClients: business.taggedClients,
      // isWebBookingEnabled: business.isWebBookingEnabled,
      // isSmsNotificationEnabled: business.isSmsNotificationEnabled,
      // isAppNotificationEnabled: business.isAppNotificationEnabled,
      // videoConference: business.videoConference,
      // isVideoConferenceEnabled: business.isVideoConferenceEnabled,
    };
    return _initialValues;
  }, [business]);

  const { init, isLoading: isImageLoading, imageUrl } = useSelectImage();
  const [updateBusiness, { isError, isLoading, isSuccess }] = useUpdateBusinessMutation();
  const { touched, errors, values, handleChange, handleSubmit, setFieldTouched, validateField, setFieldValue, setFieldError } = useForm(
    {
      initialValues,
      onSubmit: formData => {
        // console.log("BUSINESS PROFILLE >>>>", JSON.stringify(formData, null, 2));
        updateBusiness({
          body: formData,
          businessId: business._id,
        });
      },
    },
    "updateBusiness"
  );

  console.log(errors);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            compareFormObjectsBeforeAbort({ obj1: initialValues, obj2: values, onAbort: () => navigation.goBack() });
          }}
        />
      ),
      headerTitleAlign: "center",
      headerTitle: () => (
        <Text
          preset="headerTitle"
          text={intl.formatMessage({
            id: "BusinessProfile_screen.headerTitle",
          })}
        />
      ),
    });
  }, [initialValues, intl, navigation, values]);

  useEffect(() => {
    if (imageUrl) {
      setFieldValue("web.logoImageUrl", imageUrl);
    }
  }, [imageUrl, setFieldValue]);

  useEffect(() => {
    if (isError) {
      Alert.alert("Oops", "Something went wrong");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      Alert.alert("Success", "Business updated successfully");
    }
  }, [isSuccess]);

  const renderSubmitButton = (
    <Button
      preset={isLoading ? "secondary-disabled" : "secondary"}
      text={"Update"}
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  return (
    <FormContainer footer={renderSubmitButton} isLoading={isLoading}>
      <Avatar
        style={{ alignSelf: "center" }}
        url={values.web.logoImageUrl}
        isLoading={isImageLoading}
        disabled={isImageLoading}
        mode="upload"
        onPress={() => {
          init();
        }}
      />
      <Space />
      <TextFieldCard
        title={intl.formatMessage({
          id: "BusinessProfile_screen.id",
        })}
        textStyle={{
          textTransform: "capitalize",
        }}
        value={business.shortId.toUpperCase()}
        disabled
      />
      <ButtonCard
        title={intl.formatMessage({
          id: "BusinessProfile_screen.accountType",
        })}
        subTitle={business.accountType.toUpperCase()}
      />
      <TextFieldCard
        title={intl.formatMessage({
          id: "BusinessProfile_screen.shortName",
        })}
        onChangeText={handleChange("shortName")}
        value={values.shortName}
        isTouched={touched.shortName}
        errors={errors.shortName}
      />
      <TextFieldCard
        title={intl.formatMessage({
          id: "BusinessProfile_screen.longName",
        })}
        placeholder={intl.formatMessage({
          id: "BusinessProfile_screen.longName.placeholder",
        })}
        onChangeText={handleChange("longName")}
        value={values.longName}
        isTouched={touched.longName}
        errors={errors.longName}
      />
      <TextFieldCard
        title={intl.formatMessage({
          id: "BusinessProfile_screen.description",
        })}
        placeholder={intl.formatMessage({
          id: "BusinessProfile_screen.description.placeholder",
        })}
        maxLength={200}
        onChangeText={handleChange("description")}
        value={values.description}
        isTouched={touched.description}
        errors={errors.description}
      />
      <TextFieldCard
        title={intl.formatMessage({
          id: "BusinessProfile_screen.email",
        })}
        placeholder={intl.formatMessage({
          id: "BusinessProfile_screen.email.placeholder",
        })}
        onChangeText={handleChange("email")}
        value={values.email}
        isTouched={touched.email}
        errors={errors.email}
      />
      <PhoneNumberCard
        title={intl.formatMessage({
          id: "BusinessProfile_screen.phone",
        })}
        onChangeText={handleChange("phone1")}
        isValid={async isValid => {
          await setFieldTouched("phone1", true);
          if (isValid) {
            await validateField("phone1");
          } else {
            await setFieldError("phone1", "Invalid phone number");
          }
        }}
        isTouched={touched?.phone1}
        errors={errors.phone1}
      />
      <TextFieldCard
        title={intl.formatMessage({
          id: "BusinessProfile_screen.address",
        })}
        placeholder={intl.formatMessage({
          id: "BusinessProfile_screen.address.placeholder",
        })}
        onChangeText={handleChange("location.streetAddress")}
        value={values.location.streetAddress}
      />
      <ButtonCard
        title={intl.formatMessage({
          id: "BusinessProfile_screen.country",
        })}
        subTitle={STATIC_FORM_AMERICAN_COUNTRIES.find(country => country.key === values.location.country)?.title ?? "Select Country"}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "static",
              headerTitle: "Select a Country",
              data: STATIC_FORM_AMERICAN_COUNTRIES,
              closeOnSelect: true,
              onSelect: country => {
                setFieldValue("location.country", country.key);
              },
            },
          })
        }
      />
      {values.location?.country === "US" ? (
        <Fragment>
          <TextFieldCard
            title={intl.formatMessage({
              id: "BusinessProfile_screen.city",
            })}
            onChangeText={handleChange("location.city")}
            value={values.location.city}
          />
          <ButtonCard
            title={intl.formatMessage({
              id: "BusinessProfile_screen.state",
            })}
            subTitle={STATIC_FORM_USA_STATES.find(state => state.key === values.location.state)?.title ?? "Select State"}
            onPress={() =>
              navigation.navigate("modals", {
                screen: "selector-modal-screen",
                params: {
                  type: "static",
                  headerTitle: "Select a State",
                  data: STATIC_FORM_USA_STATES,
                  closeOnSelect: true,
                  onSelect: state => {
                    setFieldValue("location.state", state.key);
                  },
                },
              })
            }
          />
          <TextFieldCard
            title={intl.formatMessage({
              id: "BusinessProfile_screen.zipCode",
            })}
            onChangeText={handleChange("location.postalCode")}
            value={values.location.postalCode}
          />
        </Fragment>
      ) : null}
      <Space />
    </FormContainer>
  );
}
