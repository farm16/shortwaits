import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { View, StyleSheet } from "react-native";

import {
  Button,
  Screen,
  Card,
  TextField,
  Space,
  TextHeaderButton,
  ButtonCard,
  ServiceColors,
  UploadProfileImage,
  CurrencyFieldCard,
  TextFieldCard,
  AddServiceFormValues,
  Text,
  CircleIconButton,
  DurationFieldCard,
  LeftChevronButton,
} from "../../../components";
import { useTheme } from "../../../theme";
import { ModalsScreenProps } from "../../../navigation";
import { useMobileAdmin } from "../../../redux";
import { useForm } from "../../../hooks";

export const ServicesModal: FC<ModalsScreenProps<"service-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { mode, initialValues } = route.params;
  const { Colors } = useTheme();
  const mobileAdminData = useMobileAdmin();

  const [form, setForm] = useState<AddServiceFormValues["data"]>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          preset="headerLink"
          text="Save"
          style={{
            right: 15,
          }}
        />
      ),
      title: "",
      headerLeft: () => (
        <LeftChevronButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

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
    <Screen preset="scroll" unsafe style={styles.container}>
      {/**
       * @TODO this will be enabled after MVP
       * <Avatar imageUrl={form.imageUrl} size="medium" mode="upload" />
       * */}
      <Space />
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
        currencyType={form.currency}
      />
      <DurationFieldCard
        title="Duration"
        values={[form.durationInMin]}
        onValuesChange={handleDurationTimeChange}
      />
    </Screen>
  );
};
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
