import { FormikConfig, FormikValues, useFormik } from "formik";
import { FormSchemaKeys, formSchemas } from "../";

export const useForm = <T extends FormikValues>(config: FormikConfig<T>, schemaName: FormSchemaKeys) => {
  const validationSchema = formSchemas[schemaName];
  return useFormik<T>({
    ...config,
    validationSchema,
  });
};
