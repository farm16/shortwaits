import {
  ActivityIndicator,
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
  useForm,
} from "@shortwaits/shared-ui";
import React, { Fragment, useEffect, useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { useSelectImage } from "../../../hooks";
import { AuthorizedScreenProps, GenericModalData } from "../../../navigation";
import { useUpdateBusinessMutation } from "../../../services";
import { useBusiness } from "../../../store";

export function UpdateBusinessProfileModal({ navigation }: AuthorizedScreenProps<"update-business-profile-screen">) {
  const business = useBusiness();
  const intl = useIntl();
  const { init, isLoading: isImageLoading, imageUrl } = useSelectImage();
  const [updateBusiness, { isError, isLoading, isSuccess }] = useUpdateBusinessMutation();
  const { touched, errors, values, handleChange, handleSubmit, setFieldTouched, validateField, setFieldValue, setFieldError, dirty, resetForm } = useForm(
    {
      initialValues: business,
      onSubmit: formData => {
        updateBusiness({
          body: formData,
          businessId: business._id,
        });
      },
    },
    "updateBusiness"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            if (dirty) {
              Alert.alert("Warning", "You have unsaved changes. Are you sure you want to leave?", [
                {
                  text: "Yes",
                  onPress: () => {
                    navigation.goBack();
                  },
                },
                {
                  text: "No",
                },
              ]);
            } else {
              navigation.goBack();
            }
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
  }, [dirty, intl, navigation]);

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
      resetForm();
      Alert.alert("Success", "Business updated successfully");
    }
  }, [isSuccess, resetForm]);

  const renderSubmitButton = (
    <Button
      preset={dirty ? "secondary" : "secondary-disabled"}
      text={"Update"}
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (business === null) {
    return null;
  }

  return (
    <FormContainer footer={renderSubmitButton}>
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
      <TextFieldCard
        title={intl.formatMessage({
          id: "BusinessProfile_screen.accountType",
        })}
        disabled
        value={business.accountType.toUpperCase()}
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
        initialValue={values.phone1}
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
        subTitle={STATIC_FORM_AMERICAN_COUNTRIES.find(country => country._id === values.location.country)?.title ?? "Select Country"}
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              mode: "static",
              headerTitle: "Select a Country",
              data: STATIC_FORM_AMERICAN_COUNTRIES,
              selectedData: STATIC_FORM_AMERICAN_COUNTRIES.filter(country => country._id === values.location.country).map(country => country._id),
              onSelect: (data: GenericModalData[]) => {
                setFieldValue("location.country", data[0]._id);
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
            subTitle={STATIC_FORM_USA_STATES.find(state => state._id === values.location.state)?.title ?? "Select State"}
            onPress={() =>
              navigation.navigate("modals", {
                screen: "selector-modal-screen",
                params: {
                  mode: "static",
                  headerTitle: "Select a State",
                  data: STATIC_FORM_USA_STATES,
                  selectedData: STATIC_FORM_USA_STATES.filter(state => state._id === values.location.state).map(state => state._id),
                  onSelect: (data: GenericModalData[]) => {
                    const state = data[0];
                    setFieldValue("location.state", state._id);
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
