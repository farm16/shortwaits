import { FormikConfig, FormikProps, useFormik } from "formik";
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
