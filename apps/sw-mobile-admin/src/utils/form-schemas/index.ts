import { createEventSchema, updateEventSchema } from "./events";
import { onboarding1Schema, userLocalSignInSchema, userLocalSignUpSchema } from "./auth";
import { createClientUserSchema, createBusinessUserSchema } from "./users";
import { createServiceSchema, updateServiceSchema } from "./services";
import { updateBusinessSchema } from "./my-business";

type FormSchemas = {
  addService: typeof createServiceSchema;
  updateService: typeof updateServiceSchema;
  addClient: typeof createClientUserSchema;
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
  addClient: createClientUserSchema,
  addStaff: createBusinessUserSchema,
  // updateClient: createClientUserSchema,
  // updateStaff: createBusinessUserSchema,

  //events
  createEvent: createEventSchema,
  updateEvent: updateEventSchema,

  //auth
  onboarding1: onboarding1Schema,
  userLocalSignIn: userLocalSignInSchema,
  userLocalSignUp: userLocalSignUpSchema,
};
