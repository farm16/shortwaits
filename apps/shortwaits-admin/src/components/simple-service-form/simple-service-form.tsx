/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ServicesType } from "@shortwaits/shared-types";

import { Space, Text, Button, ScrollView } from "../common";
import { ServiceColors } from "../service-colors/service-colors";
import { useMobileAdmin } from "../../redux";
import { TextFieldCard, TimeDurationCard, CurrencyFieldCard } from "../cards";

interface SimpleServiceFormProps {
  mode: "update" | "create";
  initialValues: Partial<ServicesType> | undefined;
  onSubmit: (serviceFormData: Partial<ServicesType>) => void;
}

export function SimpleServiceForm({
  mode,
  initialValues,
  onSubmit,
}: SimpleServiceFormProps) {
  const defaultData = useMobileAdmin();

  const [form, setForm] = useState<Partial<ServicesType>>({
    name: "",
    durationInMin: 15,
    price: 150,
    serviceColor: defaultData?.serviceColors.red,
    currency: "USD",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (mode === "update" && initialValues) {
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
  const handleServiceColorChange = useCallback(
    (serviceColor) => {
      setForm((formValues) => ({
        ...formValues,
        serviceColor: serviceColor
          ? serviceColor
          : defaultData?.serviceColors.red,
      }));
    },
    [defaultData?.serviceColors.red]
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Space />
        <Text
          text={mode === "create" ? "Add Service" : initialValues?.name}
          preset="title3"
        />
        <Space />
        {/**
         * @TODO this will be enabled after MVP
         * <ServiceAvatar imageUrl={form.imageUrl} size="medium" mode="upload" />
         * */}
      </View>

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
      <TimeDurationCard
        title="Duration"
        values={[form.durationInMin!]}
        onValuesChange={handleDurationTimeChange}
      />

      <View style={styles.bottomContainer}>
        <Space />
        <Button text="Advance Options" preset="outline" />
        <Space size="small" />
        <Button text="Save" onPress={() => onSubmit(form)} />
        <Space size="large" />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
  },
  bottomContainer: {
    marginTop: "auto",
  },
});
