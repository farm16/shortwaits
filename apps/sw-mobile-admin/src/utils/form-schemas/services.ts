import * as Yup from "yup";

export const createServiceSchema = Yup.object().shape({
  serviceName: Yup.string()
    .min(3, "a longer name is required")
    .required("this field is required"),
  price: Yup.string(),
});
