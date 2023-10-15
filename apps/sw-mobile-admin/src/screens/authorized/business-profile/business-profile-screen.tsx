import React, { useLayoutEffect, useMemo } from "react";
import { Text, BackButton, TextFieldCard, ButtonCard, Button, FormContainer, Avatar, Space } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useBusiness } from "../../../store";
import { useForm, useSelectImage } from "../../../hooks";
import { UpdateBusinessDtoType } from "@shortwaits/shared-lib";

export function BusinessProfileScreen({ navigation }: AuthorizedScreenProps<"business-profile-screen">) {
  const business = useBusiness();

  const initialValues = useMemo(() => {
    const _initialValues: UpdateBusinessDtoType = {
      shortName: business.shortName,
      description: business.description,
      events: business.events,
      services: business.services,
      email: business.email,
      labels: business.labels,
      staff: business.staff,
      categories: business.categories,
      currency: business.currency,
      country: business.country,
      phone1: business.phone1,
      longName: business.longName,
      hours: business.hours,
      location: business.location,
      updatedBy: business.updatedBy,
      clients: business.clients,
      taggedClients: business.taggedClients,
      isWebBookingEnabled: business.isWebBookingEnabled,
      isSmsNotificationEnabled: business.isSmsNotificationEnabled,
      isAppNotificationEnabled: business.isAppNotificationEnabled,
      videoConference: business.videoConference,
      isVideoConferenceEnabled: business.isVideoConferenceEnabled,
      web: business.web,
    };
    return _initialValues;
  }, [business]);

  const { init, isLoading, imageBase64 } = useSelectImage();

  console.log("imageBase64", imageBase64);
  console.log("isLoading", isLoading);

  const { touched, errors, values, handleChange, handleSubmit, setFieldValue } = useForm(
    {
      initialValues,
      onSubmit: formData => {
        console.log("formData", JSON.stringify(formData, null, 2));
      },
    },
    "createEvent"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitleAlign: "center",
      headerTitle: () => <Text preset="text" text={"Business Info"} />,
    });
  }, [navigation]);

  const renderSubmitButton = (
    <Button
      text={"Update"}
      onPress={() => {
        handleSubmit();
      }}
    />
  );

  return (
    <FormContainer footer={renderSubmitButton}>
      <Avatar
        style={{ alignSelf: "center" }}
        url={business.web.logoImageUrl}
        mode="upload"
        onPress={() => {
          init();
        }}
      />
      <Space />
      <TextFieldCard title="ID" value={business.shortId} disabled />
      <ButtonCard title="Account Type" subTitle={business.accountType.toUpperCase()} />
      <TextFieldCard title="Short Name" value={values.shortName} />
      <TextFieldCard title="Long Name" value={values.longName} />
      <TextFieldCard title="Business Description" value={values.description} />
      <TextFieldCard title="Email" value={values.email} />
      <TextFieldCard title="Phone" value={values.phone1} />
      <ButtonCard title="Business location" />
      <Space />
    </FormContainer>
  );
}
