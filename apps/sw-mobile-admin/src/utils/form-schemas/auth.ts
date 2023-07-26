import * as Yup from "yup";

export const onboarding1Schema = Yup.object().shape({
  longName: Yup.string().optional(),
  phone1: Yup.string().optional(),
  country: Yup.string().optional(),
  shortName: Yup.string()
    .min(3, "a longer name is required")
    .required("this field is required"),
  description: Yup.string().max(140).required("this field is required"),
});

export const userLocalSignInSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("no email provided."),
  password: Yup.string().required("no password provided."),
});

export const userLocalSignUpSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("no email provided."),
  password: Yup.string()
    .required("no password provided.")
    .min(6, "password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "must contain 6 characters, one uppercase, one lowercase and one number."
    ),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords must match")
    .required("required"),
});
