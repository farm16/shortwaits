import * as Yup from "yup";
import { hoursOptional } from "./commons";

export const createServiceSchema = Yup.object({
  businessId: Yup.string(),
  name: Yup.string().min(3, "a longer name is required").required("this field is required"),
  description: Yup.string().optional(),
  hours: hoursOptional,
  applicableCategories: Yup.array().of(Yup.string()).optional(),
  staff: Yup.array().of(Yup.string()).optional().nullable(),
  durationInMin: Yup.number(),
  price: Yup.number(),
  currency: Yup.mixed().required().oneOf(["USD", "PEN"]).optional(),
  isPrivate: Yup.boolean().optional(),
  urls: Yup.object()
    .shape({
      zoom: Yup.string(),
      other1: Yup.string(),
      other2: Yup.string(),
    })
    .optional(),
  isVideoConference: Yup.boolean().optional(),
  serviceColor: Yup.object({
    colorId: Yup.string(),
    colorName: Yup.string(),
    hexCode: Yup.string(),
    isSelected: Yup.mixed().optional(),
    isDefault: Yup.mixed().optional(),
  }),
  imageUrl: Yup.string().optional(),
});

export const updateServiceSchema = Yup.object({
  name: Yup.string().min(3, "a longer name is required").nullable().optional(),
  description: Yup.string().nullable().optional(),
  hours: Yup.object().optional(),
  applicableCategories: Yup.array().of(Yup.string()).nullable().optional(),
  staff: Yup.array().of(Yup.string()).optional().nullable(),
  durationInMin: Yup.number().optional().nullable(),
  price: Yup.number().optional().nullable(),
  currency: Yup.mixed().required().oneOf(["USD", "PEN"]).nullable().optional(),
  isPrivate: Yup.boolean().nullable().optional(),
  urls: Yup.object()
    .shape({
      zoom: Yup.string(),
      other1: Yup.string(),
      other2: Yup.string(),
    })
    .nullable()
    .optional(),
  isVideoConference: Yup.boolean().nullable().optional(),
  serviceColor: Yup.object({
    colorId: Yup.string(),
    colorName: Yup.string(),
    hexCode: Yup.string(),
    isSelected: Yup.mixed(),
    isDefault: Yup.mixed(),
  }),
  imageUrl: Yup.string().nullable().optional(),
});
