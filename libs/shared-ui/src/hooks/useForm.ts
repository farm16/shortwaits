import { FormikConfig, useFormik } from "formik";
import { FormSchemaKeys, formSchemas } from "../";

export const useForm = <T>(config: FormikConfig<T>, schema: FormSchemaKeys) => {
  const validationSchema = formSchemas[schema];
  return useFormik({
    validationSchema: validationSchema,
    ...config,
  });
};
