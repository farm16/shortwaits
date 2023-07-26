import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const createClientSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(3, "a longer name is required")
    .required("this field is required"),
  accountImageUrl: Yup.string(),
  phoneNumber1: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  phoneNumber2: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  addresses1: Yup.string(),
  addresses2: Yup.string(),
  city: Yup.string(),
  region: Yup.string(),
  state: Yup.string(),
  postCode: Yup.string(),
  country: Yup.string(),
  year: Yup.number(),
  month: Yup.number(),
  day: Yup.number(),
  email: Yup.string()
    .email("Please enter a valid email")
    .min(2, "Must be more than 10 characters")
    .required("this field is required"),
});

export const createStaffSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(3, "a longer name is required")
    .required("this field is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .min(2, "Must be more than 10 characters")
    .required("this field is required"),
  phoneNumber1: Yup.string()
    .min(3, "invalid phone number")
    .required("this field is required"),
  accountImageUrl: Yup.string(),
  addresses1: Yup.string(),
  addresses2: Yup.string(),
  city: Yup.string(),
  region: Yup.string(),
  state: Yup.string(),
  postCode: Yup.string(),
  country: Yup.string(),
  year: Yup.number(),
  month: Yup.number(),
  day: Yup.number(),
});
