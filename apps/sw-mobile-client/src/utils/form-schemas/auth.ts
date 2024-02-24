import * as Yup from "yup";

export const adminAppLocalSignInSchema = Yup.object({
  email: Yup.string().email("invalid email").required("this field is required"),
  password: Yup.string().required("no password provided."),
});

export const adminAppLocalSignUpSchema = Yup.object({
  email: Yup.string().required("this field is required").email("invalid email"),
  password: Yup.string()
    .required("no password provided.")
    .min(6, "password is too short - should be 8 chars minimum.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "must contain 6 characters, one uppercase, one lowercase and one number."),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords must match")
    .required("required"),
});
