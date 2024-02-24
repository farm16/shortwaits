import { formSchemas } from "@shortwaits/shared-ui";
import { FormikConfig, useFormik } from "formik";
import { GestureResponderEvent } from "react-native";
import * as Yup from "yup";
import { TypedSchema } from "yup/lib/util/types";
import { FormSchemaTypes } from "../utils";

type SchemaType<T extends TypedSchema> = Yup.InferType<T>;
type Config<T extends TypedSchema> = FormikConfig<SchemaType<T>>;
type FormSchemaKeys = keyof typeof formSchemas;

export const useForm = <T extends FormSchemaKeys>(config: Config<FormSchemaTypes[T]>, schema: FormSchemaKeys): ReturnType<typeof useFormik> => {
  return useFormik({
    validationSchema: formSchemas[schema],
    ...config,
  });
};

export type HandleOnPress = (event: GestureResponderEvent) => void;
