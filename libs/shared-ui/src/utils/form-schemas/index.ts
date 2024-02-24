import * as Yup from "yup";
import { adminAppLocalSignInSchema, adminAppLocalSignUpSchema, clientAppLocalSignInSchema, clientAppLocalSignUpSchema, onboarding1Schema } from "./auth";
import { addBusinessUserSchema } from "./business-users";
import { UpdateLocalClientSchema, addClientSchema, addLocalClientSchema } from "./clients";
import { createEventSchema, updateEventSchema } from "./events";
import { updateBusinessSchema } from "./my-business";
import { createServiceSchema, updateServiceSchema } from "./services";

export type FormSchemaTypes = {
  addService: Yup.InferType<typeof createServiceSchema>;
  updateService: Yup.InferType<typeof updateServiceSchema>;
  addLocalClient: Yup.InferType<typeof addLocalClientSchema>;
  updateLocalClient: Yup.InferType<typeof UpdateLocalClientSchema>;
  addStaff: Yup.InferType<typeof addBusinessUserSchema>;
  createEvent: Yup.InferType<typeof createEventSchema>;
  updateEvent: Yup.InferType<typeof updateEventSchema>;
  onboarding1: Yup.InferType<typeof onboarding1Schema>;
  adminAppLocalSignIn: Yup.InferType<typeof adminAppLocalSignInSchema>;
  adminAppLocalSignUp: Yup.InferType<typeof adminAppLocalSignUpSchema>;
  clientAppLocalSignIn: Yup.InferType<typeof clientAppLocalSignInSchema>;
  clientAppLocalSignUp: Yup.InferType<typeof clientAppLocalSignUpSchema>;
  updateBusiness: Yup.InferType<typeof updateBusinessSchema>;
  addClient: Yup.InferType<typeof addClientSchema>;
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

  // business users (staff)
  addStaff: addBusinessUserSchema,

  //clients
  addClient: addClientSchema,
  addLocalClient: addLocalClientSchema,
  updateLocalClient: UpdateLocalClientSchema,

  //events
  createEvent: createEventSchema,
  updateEvent: updateEventSchema,
};
