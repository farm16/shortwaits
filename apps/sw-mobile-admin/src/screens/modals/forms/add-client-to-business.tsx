import { AddClientToBusinessDtoType } from "@shortwaits/shared-lib";
import React, { FC, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { Alert, StatusBar } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { noop } from "lodash";
import { Camera, WithPermission } from "../../../components";
import { useForm } from "../../../hooks";
import { ModalsScreenProps } from "../../../navigation";
import { useAddClientToBusinessMutation } from "../../../services";
import { useBusiness } from "../../../store";

export const AddClientToBusinessModal: FC<ModalsScreenProps<"add-client-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit ?? noop;

  const intl = useIntl(); // Access the intl object
  const business = useBusiness();
  const [addClientToBusiness, addClientToBusinessStatus] = useAddClientToBusinessMutation();
  const initialValues = useMemo(() => {
    const _initialValues: AddClientToBusinessDtoType = {
      shortId: "",
    };
    return _initialValues;
  }, []);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  const { touched, errors, values, validateField, setFieldTouched, handleChange, handleSubmit, setFieldError, setFieldValue } = useForm(
    {
      initialValues,
      onSubmit: formData => {
        addClientToBusiness({
          businessId: business._id,
          body: formData,
        });
      },
    },
    "addClientToBusiness"
  );

  useEffect(() => {
    if (addClientToBusinessStatus.isSuccess) {
      navigation.goBack();
    }
  }, [addClientToBusinessStatus.isSuccess, navigation]);

  useEffect(() => {
    const cleanup = async () => {
      if (onSubmit) {
        try {
          await onSubmit();
        } catch (error) {
          console.error("Error in onSubmit:", error);
        }
      }
    };
    return () => {
      cleanup();
    };
  }, []);

  if (addClientToBusinessStatus.isError) {
    console.log("addClientToBusinessStatus.error >>>", addClientToBusinessStatus.error);
    Alert.alert("Error", addClientToBusinessStatus.error.data.message);
  }

  if (addClientToBusinessStatus.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <WithPermission permission="camera">
      <Camera
        onClose={() => {
          navigation.goBack();
        }}
        onCodeScanned={value => {
          console.log("camera >>>", value);
          addClientToBusiness({
            businessId: business._id,
            body: {
              shortId: value,
            },
          });
        }}
      />
    </WithPermission>
  );
};
