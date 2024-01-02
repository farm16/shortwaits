import { onboarding1Schema, userLocalSignInSchema, userLocalSignUpSchema } from "./auth";
import { addBusinessUserSchema } from "./business-users";
import { UpdateLocalClientSchema, addClientSchema, addLocalClientSchema } from "./clients";
import { createEventSchema, updateEventSchema } from "./events";
import { updateBusinessSchema } from "./my-business";
import { createServiceSchema, updateServiceSchema } from "./services";

type FormSchemas = {
  addService: typeof createServiceSchema;
  updateService: typeof updateServiceSchema;
  addLocalClient: typeof addLocalClientSchema;
  updateLocalClient: typeof UpdateLocalClientSchema;
  addStaff: typeof addBusinessUserSchema;
  createEvent: typeof createEventSchema;
  updateEvent: typeof updateEventSchema;
  onboarding1: typeof onboarding1Schema;
  userLocalSignIn: typeof userLocalSignInSchema;
  userLocalSignUp: typeof userLocalSignUpSchema;
  updateBusiness: typeof updateBusinessSchema;
  addClient: typeof addClientSchema;
};

export const formSchemas: FormSchemas = {
  //auth
  onboarding1: onboarding1Schema,
  userLocalSignIn: userLocalSignInSchema,
  userLocalSignUp: userLocalSignUpSchema,

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
