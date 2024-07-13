import * as Yup from "yup";
import { adminAppLocalSignInSchema, adminAppLocalSignUpSchema, clientAppLocalSignInSchema, clientAppLocalSignUpSchema, onboarding1Schema } from "./auth";
import { addClientSchema, addLocalClientSchema, updateClientSchema, updateLocalClientSchema } from "./clients";
import { createEventSchema, updateEventSchema } from "./events";
import { updateBusinessSchema } from "./my-business";
import { createServiceSchema, updateServiceSchema } from "./services";
import { addStaffSchema, updateStaffSchema } from "./staff";

export type FormSchemaTypes = {
  addService: Yup.InferType<typeof createServiceSchema>;
  updateService: Yup.InferType<typeof updateServiceSchema>;
  addLocalClient: Yup.InferType<typeof addLocalClientSchema>;
  updateLocalClient: Yup.InferType<typeof updateLocalClientSchema>;
  addStaff: Yup.InferType<typeof addStaffSchema>;
  updateStaff: Yup.InferType<typeof updateStaffSchema>;
  createBusinessEvent: Yup.InferType<typeof createEventSchema>;
  updateBusinessEvent: Yup.InferType<typeof updateEventSchema>;
  onboarding1: Yup.InferType<typeof onboarding1Schema>;
  adminAppLocalSignIn: Yup.InferType<typeof adminAppLocalSignInSchema>;
  adminAppLocalSignUp: Yup.InferType<typeof adminAppLocalSignUpSchema>;
  clientAppLocalSignIn: Yup.InferType<typeof clientAppLocalSignInSchema>;
  clientAppLocalSignUp: Yup.InferType<typeof clientAppLocalSignUpSchema>;
  updateBusiness: Yup.InferType<typeof updateBusinessSchema>;
  addClient: Yup.InferType<typeof addClientSchema>;
  updateClient: Yup.InferType<typeof updateClientSchema>;
};

export type FormSchemaKeys = keyof typeof formSchemas;

export const formSchemas = {
  //auth
  onboarding1: onboarding1Schema,
  adminAppLocalSignIn: adminAppLocalSignInSchema,
  adminAppLocalSignUp: adminAppLocalSignUpSchema,
  clientAppLocalSignIn: clientAppLocalSignInSchema,
  clientAppLocalSignUp: clientAppLocalSignUpSchema,

  // My business
  updateBusiness: updateBusinessSchema,

  // services
  addService: createServiceSchema,
  updateService: updateServiceSchema,

  // staff (business users)
  addStaff: addStaffSchema,
  updateStaff: updateStaffSchema,

  //clients
  addClient: addClientSchema,
  updateClient: updateClientSchema,
  addLocalClient: addLocalClientSchema,
  updateLocalClient: updateLocalClientSchema,

  //events
  createBusinessEvent: createEventSchema,
  updateBusinessEvent: updateEventSchema,
};
