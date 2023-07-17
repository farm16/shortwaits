import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { ActivityIndicator } from "react-native-paper";
import { Alert } from "react-native";
import { useCreateBusinessClientsMutation } from "../../../services";
import { useForm } from "../../../hooks";
import { useBusiness } from "../../../store";
import {
  Text,
  TextFieldCard,
  TimePickerFieldCard,
  BackButton,
  Button,
  ButtonCard,
  AnimatedHiddenView,
  PhoneNumberCard,
} from "../../../components";
import { ModalsScreenProps } from "../../../navigation";
import { formatAddClientsValues } from "./form-utils";
import { FormBody } from "./commons/form-body";
import { useTheme } from "../../../theme";

export const AddStaffModal: FC<ModalsScreenProps<"form-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { onSubmit, onDone, closeOnSubmit = true } = route.params;
  const [isWithMoreInfo, setIsWithMoreInfo] = useState(false);
  const business = useBusiness();
  const { Colors } = useTheme();
  const [createBusinessClients, createBusinessClientsStatus] =
    useCreateBusinessClientsMutation();

  const initialValues = useMemo(
    () => ({
      displayName: "",
      businessId: business._id,
      username: "",
      accountImageUrl: "",
      phoneNumber1: "",
      phoneNumber2: "",
      addresses1: "",
      addresses2: "",
      desiredCurrencies: "",
      city: "",
      region: "",
      state: "",
      postCode: "",
      country: "",
      doe: new Date().toISOString(),
      email: "",
    }),
    [business._id]
  );

  const {
    touched,
    errors,
    values,
    handleChange,
    handleSubmit,
    setFieldError,
    validateField,
    setFieldTouched,
  } = useForm(
    {
      initialValues,
      onSubmit: formData => {
        const formattedValues = formatAddClientsValues(formData);
        if (onSubmit) {
          onSubmit<"addClient">(formattedValues);
        } else {
          createBusinessClients({
            businessId: business._id,
            businessClients: formattedValues,
          });
        }
      },
    },
    "addStaff"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <Button
          onPress={() => {
            handleSubmit();
          }}
          preset="headerLink"
          text="Save"
        />
      ),
      headerTitle: () => <Text preset="text" text="Add Staff" />,
    });
  }, [closeOnSubmit, handleSubmit, navigation]);

  useEffect(() => {
    if (createBusinessClientsStatus.isSuccess && closeOnSubmit) {
      navigation.goBack();
    }
  }, [closeOnSubmit, createBusinessClientsStatus.isSuccess, navigation]);

  useEffect(() => {
    const cleanup = async () => {
      if (onDone) {
        try {
          await onDone();
        } catch (error) {
          console.error("Error in onDone:", error);
        }
      }
    };
    return () => {
      cleanup();
    };
  }, []);

  if (createBusinessClientsStatus.isError) {
    Alert.alert("Error", createBusinessClientsStatus.error.message);
  }

  return createBusinessClientsStatus.isLoading ? (
    <ActivityIndicator />
  ) : (
    <FormBody>
      {/* <Card mode="button">
        <Text preset="cardTitle" text={"Tag"} />
        <Text
          preset="cardSubtitle"
          text={"Add an emoji to represent your client"}
        />
      </Card> */}
      <TextFieldCard
        title="Name"
        placeholder="John Smith"
        value={values.displayName}
        onChangeText={handleChange("displayName")}
        isTouched={touched.displayName}
        errors={errors.displayName}
      />
      <TextFieldCard
        title="Email"
        placeholder="jhon_smith@shortwaits.com"
        value={values.email}
        onChangeText={handleChange("email")}
        isTouched={touched.email}
        errors={errors.email}
      />
      <PhoneNumberCard
        title={"Phone Number"}
        // initialValue={values.phonber1}
        onChangeText={handleChange("phoneNumber1")}
        isValid={async isValid => {
          await setFieldTouched("phoneNumber1", true);
          if (isValid) {
            await validateField("phoneNumber1");
          } else {
            await setFieldError("phoneNumber1", "Invalid phone number");
          }
        }}
        isTouched={touched.phoneNumber1}
        errors={errors.phoneNumber1}
      />
      <Button
        preset="link"
        leftIconName={isWithMoreInfo ? "chevron-up" : "chevron-down"}
        leftIconColor={Colors.brandSecondary}
        leftIconSize={24}
        textStyle={{
          color: Colors.brandSecondary,
          padding: 0,
          marginBottom: 0,
          fontSize: 16,
        }}
        style={{
          marginTop: 16,
          height: undefined,
          width: "100%",
        }}
        text={isWithMoreInfo ? "With less fields" : "Add more fields"}
        onPress={() => {
          setIsWithMoreInfo(s => !s);
        }}
      />
      <AnimatedHiddenView isVisible={isWithMoreInfo}>
        <TextFieldCard
          title="Address 1"
          placeholder="123 Maiden Ave."
          value={values.addresses1}
          onChangeText={handleChange("addresses1")}
          isTouched={touched.addresses1}
          errors={errors.addresses1}
        />
        <TextFieldCard
          title="Address 2"
          placeholder="Apt. 100"
          value={values.addresses2}
          onChangeText={handleChange("addresses2")}
          isTouched={touched.addresses2}
          errors={errors.addresses2}
        />
        <TextFieldCard
          title="City"
          placeholder=""
          keyboardType="number-pad"
          value={values.city}
          onChangeText={handleChange("city")}
          isTouched={touched.city}
          errors={errors.city}
        />
        <ButtonCard
          title="State"
          subTitle={values.state}
          onPress={() => {
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                type: "static",
                data: [{ subTitle: "sd", title: "sdsd" }],
                headerTitle: "State",
              },
            });
          }}
          isTouched={touched.state}
          errors={errors.state}
        />
        <ButtonCard
          title="Country"
          subTitle={values.country}
          onPress={() => {}}
          isTouched={touched.country}
          errors={errors.country}
        />
        <TextFieldCard
          title="Zip Code"
          placeholder="12345"
          keyboardType="number-pad"
          value={values.postCode}
          onChangeText={handleChange("postCode")}
          isTouched={touched.postCode}
          errors={errors.postCode}
        />
        <TimePickerFieldCard
          withTime={false}
          title={"DOE (date of birth)"}
          date={new Date(values.doe)}
          onChange={handleChange("doe")}
          isTouched={touched.postCode}
          errors={errors.postCode}
        />
      </AnimatedHiddenView>
    </FormBody>
  );
};
