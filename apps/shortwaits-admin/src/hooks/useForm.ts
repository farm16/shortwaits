import { FormikConfig, FormikProps, useFormik } from "formik";
import { formSchemas } from "../utils";

export const useForm = <T = never>(
  config: FormikConfig<T>,
  schema: keyof typeof formSchemas
): FormikProps<T> => {
  const { initialValues, validationSchema, onSubmit, ...rest } = config;

  return useFormik({
    initialValues,
    validationSchema: formSchemas[schema],
    onSubmit,
    ...rest,
  });
};
