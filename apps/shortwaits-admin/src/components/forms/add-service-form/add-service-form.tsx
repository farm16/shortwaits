/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DocType, ServicesType } from "@shortwaits/shared-types";

import { Space, Text, Button, Screen } from "../../common";
import { ServiceColors } from "../../service-colors/service-colors";
import { useMobileAdmin } from "../../../redux";
import {
  TextFieldCard,
  DurationFieldCard,
  CurrencyFieldCard,
} from "../../cards";
import { useForm } from "../../../hooks";
import { CircleIconButton } from "../../navigator-action-buttons/navigator-action-buttons";

export interface AddServiceFormValues {
  data: DocType<ServicesType>;
  mode: "update" | "create";
}
interface AddServiceFormProps {
  mode: AddServiceFormValues["mode"];
  initialValues: AddServiceFormValues["data"];
}

export function AddServiceForm({ mode, initialValues }: AddServiceFormProps) {
  const mobileAdminData = useMobileAdmin();

  const [form, setForm] = useState<AddServiceFormValues["data"]>(null);

  useEffect(() => {
    if (mode === "update") {
      setForm({ ...initialValues });
    }
    if (mode === "create") {
      setForm({ ...initialValues });
    }
  }, [mode, initialValues]);

  const handlePriceChange = useCallback((price) => {
    setForm((formValues) => ({ ...formValues, price: price * 100 }));
  }, []);
  const handleDurationTimeChange = useCallback((durationTime) => {
    setForm((formValues) => ({
      ...formValues,
      durationInMin: durationTime ? durationTime[0] : 0,
    }));
  }, []);
  const handleServiceColorChange = useCallback((serviceColor) => {
    setForm((formValues) => ({
      ...formValues,
      serviceColor: serviceColor,
    }));
  }, []);

  const { touched, errors, values, handleChange, handleSubmit } = useForm(
    {
      initialValues,
      onSubmit: (formData) => {
        return null;
      },
    },
    "addService"
  );

  if (!form) {
    return null;
  }

  return (
    <>
      <View
        style={{
          marginTop: 15,
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          // style={{ backgroundColor: "blue" }}
          preset="text"
          text="Add Service"
        />
        <CircleIconButton
          marginRight
          style={{ position: "absolute", right: 0 }}
          iconType="check"
        />
      </View>
      <Screen preset="scroll" unsafe style={styles.container}>
        {/**
         * @TODO this will be enabled after MVP
         * <ServiceAvatar imageUrl={form.imageUrl} size="medium" mode="upload" />
         * */}
        <ServiceColors
          color={form.serviceColor}
          onSelect={handleServiceColorChange}
        />
        <Space size="small" />

        <TextFieldCard
          title="Name"
          placeholder="Yoga class"
          value={form.name}
          onChangeText={(text) => {
            setForm((formState) => {
              return { ...formState, name: text };
            });
          }}
        />
        <CurrencyFieldCard
          title="Price"
          onChangeValue={handlePriceChange}
          value={form.price! / 100}
          currencyType={form.currency!}
        />
        <DurationFieldCard
          title="Duration"
          values={[form.durationInMin!]}
          onValuesChange={handleDurationTimeChange}
        />

        <View style={styles.bottomContainer}>
          <Space />
          <Button text="Advance Options" preset="outline" />
          <Space size="small" />
          <Button text="Save" onPress={() => null} />
          <Space size="large" />
        </View>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  bottomContainer: {
    marginTop: "auto",
  },
});
