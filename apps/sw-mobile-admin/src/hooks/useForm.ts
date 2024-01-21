import { formSchemas } from "@shortwaits/shared-ui";
import { FormikConfig, useFormik } from "formik";
import { useIntl } from "react-intl";
import { GestureResponderEvent } from "react-native";

export const useForm = <T>(config: FormikConfig<T>, schema: keyof typeof formSchemas) => {
  const intl = useIntl();
  const validationSchema = formSchemas[schema]({ intl });
  return useFormik({
    validationSchema,
    ...config,
  });
};

export type HandleOnPress = (event: GestureResponderEvent) => void;
