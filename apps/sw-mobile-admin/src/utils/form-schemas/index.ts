import { onboarding1Schema, userLocalSignInSchema, userLocalSignUpSchema } from "./auth";
import { createEventSchema, updateEventSchema } from "./events";
import { updateBusinessSchema } from "./my-business";
import { createServiceSchema, updateServiceSchema } from "./services";
import { createBusinessUserSchema, createLocalClientUserSchema } from "./users";

type FormSchemas = {
  addService: typeof createServiceSchema;
  updateService: typeof updateServiceSchema;
  addLocalClient: typeof createLocalClientUserSchema;
  addStaff: typeof createBusinessUserSchema;
  createEvent: typeof createEventSchema;
  updateEvent: typeof updateEventSchema;
  onboarding1: typeof onboarding1Schema;
  userLocalSignIn: typeof userLocalSignInSchema;
  userLocalSignUp: typeof userLocalSignUpSchema;
  updateBusiness: typeof updateBusinessSchema;
};

export const formSchemas: FormSchemas = {
  // My business
  updateBusiness: updateBusinessSchema,

  // services
  addService: createServiceSchema,
  updateService: updateServiceSchema,

  // users (business-user, client-user)
  addLocalClient: createLocalClientUserSchema,
  addStaff: createBusinessUserSchema,
  // updateClient: createLocalClientUserSchema,
  // updateStaff: createBusinessUserSchema,

  //events
  createEvent: createEventSchema,
  updateEvent: updateEventSchema,

  //auth
  onboarding1: onboarding1Schema,
  userLocalSignIn: userLocalSignInSchema,
  userLocalSignUp: userLocalSignUpSchema,
};
