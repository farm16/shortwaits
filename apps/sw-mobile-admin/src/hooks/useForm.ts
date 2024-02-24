import { FormSchemaKeys, formSchemas } from "@shortwaits/shared-ui";
import { FormikConfig, useFormik } from "formik";

export const useForm = <T>(config: FormikConfig<T>, schema: FormSchemaKeys) => {
  const validationSchema = formSchemas[schema];
  return useFormik({
    validationSchema,
    ...config,
  });
};
