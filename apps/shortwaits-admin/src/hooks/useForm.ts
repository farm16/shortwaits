import { FormikConfig, FormikProps, useFormik } from "formik";
import { formSchemas } from "../utils";

export const useForm = <T>(
  config: FormikConfig<T>,
  schema: keyof typeof formSchemas
) => {
  const { initialValues, validationSchema, onSubmit, ...rest } = config;

  return useFormik({
    initialValues,
    validationSchema: formSchemas[schema],
    onSubmit,
    ...rest,
  });
};
