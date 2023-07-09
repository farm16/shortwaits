import { FormikConfig, useFormik } from "formik";
import { GestureResponderEvent } from "react-native";
import { formSchemas } from "../utils";

export const useForm = <T>(
  config: FormikConfig<T>,
  schema: keyof typeof formSchemas
) => {
  return useFormik({
    validationSchema: formSchemas[schema],
    ...config,
  });
};

export type HandleOnPress = (event: GestureResponderEvent) => void;
