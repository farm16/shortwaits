import React, { FC, useLayoutEffect, useMemo } from "react";
import { ActivityIndicator } from "react-native-paper";
import { noop } from "lodash";

import { useCreateBusinessClientsMutation } from "../../../services";
import { useForm } from "../../../hooks";
import { useBusiness, useServices } from "../../../redux";
import {
  Text,
  TextFieldCard,
  TimePickerFieldCard,
  Button,
  BackButton,
  DurationFieldCard,
  Card,
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { FormBody } from "./commons/form-body";

export const AddEventModal: FC<AuthorizedScreenProps<"form-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { onSaved = noop } = route.params;

  const business = useBusiness();
  const services = useServices();

  const [createBusinessClient, createBusinessClientResult] =
    useCreateBusinessClientsMutation();
  const initialValues = useMemo(
    () => ({
      name: "",
      description: "",
      leadClientName: "",
      eventImage: "",
      businessId: "",
      serviceId: "",
      staffIds: [],
      clientsIds: [],
      features: [],
      priceExpected: 0,
      priceFinal: 0,
      isGroupEvent: false,
      isVideoMeeting: false,
      repeat: false,
      // payment: object;
      notes: "",
      labels: [],
      //duration
      durationInMin: 0,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      endTimeExpected: new Date().toISOString(),
      hasNoDuration: false,
    }),
    []
  );

  const { touched, errors, values, handleChange, handleSubmit, setFieldValue } =
    useForm(
      {
        initialValues,
        onSubmit: (formData) => {
          console.log("dd>>>", formData);
        },
      },
      "addEvent"
    );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => <Button preset="headerLink" text="Save" />,
      headerTitle: () => <Text preset="text" text="Add Event" />,
    });
  }, [handleSubmit, navigation]);

  const isLoading =
    createBusinessClientResult.isLoading &&
    !createBusinessClientResult.isSuccess;

  const handleFormValue = (values, cb) => cb(values);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormBody>
      <TextFieldCard
        title="Name"
        placeholder="Yoga class"
        value={values.name}
        onChangeText={handleChange("name")}
        isTouched={touched.name}
        errors={errors.name}
      />
      <TextFieldCard
        title="Description"
        placeholder="15 minutes hot Yoga"
        value={values.description}
        onChangeText={handleChange("description")}
        isTouched={touched.description}
        errors={errors.description}
      />
      <TimePickerFieldCard
        title={"Starts"}
        date={new Date(values.startTime)}
        onChange={handleChange("startTime")}
        isTouched={touched.startTime}
        errors={errors.startTime}
      />
      <DurationFieldCard
        title={"Duration"}
        values={[values.durationInMin]}
        onValuesChange={(values) =>
          handleFormValue(values[0].toString(), handleChange("durationInMin"))
        }
      />
      <Card
        mode="button"
        rightIconSize={"large"}
        onPress={() => setFieldValue("isVideoMeeting", !values.isVideoMeeting)}
        rightIconName={
          values.isVideoMeeting ? "checkbox-outline" : "checkbox-blank-outline"
        }
      >
        <Text preset="cardTitle" text={"Video call"} />
      </Card>
      <TextFieldCard
        title="Notes"
        multiline
        placeholder="Include notes here"
        value={values.notes}
        onChangeText={handleChange("notes")}
        isTouched={touched.notes}
        errors={errors.notes}
      />
    </FormBody>
  );
};
