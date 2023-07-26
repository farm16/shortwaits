import { createEventSchema, updateEventSchema } from "./events";
import {
  onboarding1Schema,
  userLocalSignInSchema,
  userLocalSignUpSchema,
} from "./auth";
import { createClientSchema, createStaffSchema } from "./user";
import { createServiceSchema } from "./services";

interface FormSchemas {
  addService: typeof createServiceSchema;
  addClient: typeof createClientSchema;
  addStaff: typeof createStaffSchema;
  createEvent: typeof createEventSchema;
  updateEvent: typeof updateEventSchema;
  onboarding1: typeof onboarding1Schema;
  userLocalSignIn: typeof userLocalSignInSchema;
  userLocalSignUp: typeof userLocalSignUpSchema;
}

export const formSchemas: FormSchemas = {
  addService: createServiceSchema,
  addClient: createClientSchema,
  addStaff: createStaffSchema,
  //events
  createEvent: createEventSchema,
  updateEvent: updateEventSchema,
  //auth
  onboarding1: onboarding1Schema,
  userLocalSignIn: userLocalSignInSchema,
  userLocalSignUp: userLocalSignUpSchema,
};
