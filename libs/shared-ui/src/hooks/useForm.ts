import { FormikConfig, useFormik } from "formik";
import { FormSchemaKeys, FormSchemaTypes, formSchemas } from "../";

export const useForm = <T extends FormSchemaKeys>(config: FormikConfig<FormSchemaTypes[T]>, schema: T) => {
  const validationSchema = formSchemas[schema];
  return useFormik({
    validationSchema: validationSchema,
    ...config,
  });
};
