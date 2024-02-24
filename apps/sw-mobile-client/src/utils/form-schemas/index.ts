import * as Yup from "yup";
import { adminAppLocalSignInSchema, adminAppLocalSignUpSchema } from "./auth";

export type FormSchemas = {
  // addService: typeof createServiceSchema;
  // updateService: typeof updateServiceSchema;
  // addClient: typeof createClientUserSchema;
  // addStaff: typeof createBusinessUserSchema;
  // createEvent: typeof createEventSchema;
  // updateEvent: typeof updateEventSchema;
  //updateBusiness: typeof updateBusinessSchema;
  adminAppLocalSignIn: typeof adminAppLocalSignInSchema;
  adminAppLocalSignUp: typeof adminAppLocalSignUpSchema;
};

export const formSchemas: FormSchemas = {
  // // My business
  // updateBusiness: updateBusinessSchema,

  // // services
  // addService: createServiceSchema,
  // updateService: updateServiceSchema,

  // // users (business-user, client-user)
  // addClient: createClientUserSchema,
  // addStaff: createBusinessUserSchema,
  // // updateClient: createClientUserSchema,
  // // updateStaff: createBusinessUserSchema,

  // //events
  // createEvent: createEventSchema,
  // updateEvent: updateEventSchema,

  //auth
  adminAppLocalSignIn: adminAppLocalSignInSchema,
  adminAppLocalSignUp: adminAppLocalSignUpSchema,
};

export type FormSchemaTypes = {
  adminAppLocalSignIn: Yup.InferType<typeof adminAppLocalSignInSchema>;
  adminAppLocalSignUp: Yup.InferType<typeof adminAppLocalSignUpSchema>;
};

export type FormSchemaKeys = keyof FormSchemaTypes;
