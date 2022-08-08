import * as Yup from "yup"

export const formSchemas = {
  simpleService: Yup.object().shape({
    name: Yup.string()
      .min(3, "a longer name is required")
      .required("this field is required"),
    price: Yup.string()
  }),
  onBoarding1: Yup.object().shape({
    businessShortName: Yup.string()
      .min(3, "a longer name is required")
      .required("this field is required"),
    businessDescription: Yup.string()
      .max(140)
      .required("this field is required")
  }),
  signInSchema: Yup.object().shape({
    email: Yup.string().email("invalid email").required("no email provided."),
    password: Yup.string().required("no password provided.")
  }),
  signUpSchema: Yup.object().shape({
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
      .required("required")
  })
}
