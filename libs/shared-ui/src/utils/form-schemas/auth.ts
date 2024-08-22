import * as Yup from "yup";

export const onboarding1Schema = Yup.object({
  longName: Yup.string().optional(),
  phone1: Yup.string().optional(),
  country: Yup.string().optional(),
  shortName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  description: Yup.string().max(140).required("this field is required"),
});

export const adminAppLocalSignInSchema = Yup.object({
  email: Yup.string().email("Validation.email").required(),
  password: Yup.string().required("Validation.password").required(),
});

export const adminAppLocalSignUpSchema = Yup.object({
  email: Yup.string().email("invalid email").required(),
  username: Yup.string()
    .min(3)
    .max(320, "Username or email address is too long")
    .test("is-email-or-username", "Invalid format", (value?: string) => {
      if (!value) return true;
      // check if value is an email or username
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const usernameRegex = /^[A-Za-z0-9_]+$/;
      return emailRegex.test(value) || usernameRegex.test(value);
    })
    .optional(),
  password: Yup.string()
    .required("no password provided.")
    .min(6, "password is too short - should be 8 chars minimum.")
    // allow minimum 6 characters, one uppercase, one lowercase and one number, allow special characters
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "must contain 6 characters, one uppercase, one lowercase and one number."),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords must match")
    .required("required"),
});

export const clientAppLocalSignInSchema = Yup.object({
  email: Yup.string().email("Validation.email").required(),
  password: Yup.string().required("Validation.password"),
});

export const clientAppLocalSignUpSchema = Yup.object({
  email: Yup.string().email("invalid email").required(),
  username: Yup.string()
    .min(3)
    .max(320, "Username or email address is too long")
    .test("is-email-or-username", "Invalid format", value => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const usernameRegex = /^[A-Za-z0-9_]+$/;
      return emailRegex.test(value) || usernameRegex.test(value);
    })
    .optional(),
  password: Yup.string()
    .required("no password provided.")
    .min(6, "password is too short - should be 8 chars minimum.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "must contain 6 characters, one uppercase, one lowercase and one number."),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords must match")
    .required("required"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email("invalid email").required(),
});
