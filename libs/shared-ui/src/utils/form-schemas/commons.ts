import { BusinessVideoConferenceIntegrationType, BusinessVideoConferenceType } from "@shortwaits/shared-lib";
import { ObjectSchema, array, boolean, number, object, string } from "yup";

export const hours = object({
  mon: array().of(
    object({
      startTime: number(),
      endTime: number(),
      isActive: boolean(),
    })
  ),
  tue: array().of(
    object({
      startTime: number(),
      endTime: number(),
      isActive: boolean(),
    })
  ),
  wed: array().of(
    object({
      startTime: number(),
      endTime: number(),
      isActive: boolean(),
    })
  ),
  thu: array().of(
    object({
      startTime: number(),
      endTime: number(),
      isActive: boolean(),
    })
  ),
  fri: array().of(
    object({
      startTime: number(),
      endTime: number(),
      isActive: boolean(),
    })
  ),
  sat: array().of(
    object({
      startTime: number(),
      endTime: number(),
      isActive: boolean(),
    })
  ),
  sun: array().of(
    object({
      startTime: number(),
      endTime: number(),
      isActive: boolean(),
    })
  ),
});

export const hoursOptional = hours.optional();

type BusinessVideoConferenceUpdateType = Omit<BusinessVideoConferenceType, "url"> & {
  url?: string;
};

export const videoConference: ObjectSchema<BusinessVideoConferenceUpdateType> = object({
  type: string<BusinessVideoConferenceIntegrationType>().defined(),
  label: string().required(),
  name: string().optional(),
  isActive: boolean().required(),
  url: string().when("isActive", {
    is: true,
    // custom error message
    then: schema => schema.url("Please provide a valid URL\n* Provide full URL").required("Please provide a valid URL"),
    otherwise: schema => schema.url("Please provide a valid URL").optional(),
  }),
});

export const videoConferences = array(videoConference);
