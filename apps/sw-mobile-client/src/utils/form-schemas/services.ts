import {CreateServiceDtoType} from '@shortwaits/shared-lib';
import * as Yup from 'yup';
import {hoursOptional} from './commons';

export const createServiceSchema: Yup.Schema<CreateServiceDtoType> =
  Yup.object().shape({
    businessId: Yup.string(),
    name: Yup.string()
      .min(3, 'a longer name is required')
      .required('this field is required'),
    description: Yup.string().optional(),
    hours: hoursOptional,
    applicableCategories: Yup.array().of(Yup.string()).optional(),
    staff: Yup.array().of(Yup.string()).optional().nullable(),
    durationInMin: Yup.number(),
    price: Yup.number(),
    currency: Yup.mixed().required().oneOf(['USD', 'PEN']).optional(),
    isPrivate: Yup.boolean().optional(),
    urls: Yup.object()
      .shape({
        zoom: Yup.string(),
        other1: Yup.string(),
        other2: Yup.string(),
      })
      .optional(),
    isVideoConference: Yup.boolean().optional(),
    serviceColor: Yup.object().shape({
      colorId: Yup.string(),
      colorName: Yup.string(),
      hexCode: Yup.string(),
      isSelected: Yup.mixed().optional(),
      isDefault: Yup.mixed().optional(),
    }),
    imageUrl: Yup.string().optional(),
  });

export const updateServiceSchema: Yup.Schema<CreateServiceDtoType> =
  Yup.object().shape({
    businessId: Yup.string(),
    name: Yup.string()
      .min(3, 'a longer name is required')
      .required('this field is required'),
    description: Yup.string().optional(),
    hours: Yup.object()
      .shape({
        mon: Yup.array().of(
          Yup.object().shape({
            startTime: Yup.number(),
            endTime: Yup.number(),
            isActive: Yup.boolean(),
          }),
        ),
        tue: Yup.array().of(
          Yup.object().shape({
            startTime: Yup.number(),
            endTime: Yup.number(),
            isActive: Yup.boolean(),
          }),
        ),
        wed: Yup.array().of(
          Yup.object().shape({
            startTime: Yup.number(),
            endTime: Yup.number(),
            isActive: Yup.boolean(),
          }),
        ),
        thu: Yup.array().of(
          Yup.object().shape({
            startTime: Yup.number(),
            endTime: Yup.number(),
            isActive: Yup.boolean(),
          }),
        ),
        fri: Yup.array().of(
          Yup.object().shape({
            startTime: Yup.number(),
            endTime: Yup.number(),
            isActive: Yup.boolean(),
          }),
        ),
        sat: Yup.array().of(
          Yup.object().shape({
            startTime: Yup.number(),
            endTime: Yup.number(),
            isActive: Yup.boolean(),
          }),
        ),
        sun: Yup.array().of(
          Yup.object().shape({
            startTime: Yup.number(),
            endTime: Yup.number(),
            isActive: Yup.boolean(),
          }),
        ),
      })
      .optional(),
    applicableCategories: Yup.array().of(Yup.string()).optional(),
    staff: Yup.array().of(Yup.string()).optional().nullable(),
    durationInMin: Yup.number(),
    price: Yup.number(),
    currency: Yup.mixed().required().oneOf(['USD', 'PEN']).optional(),
    isPrivate: Yup.boolean().optional(),
    urls: Yup.object()
      .shape({
        zoom: Yup.string(),
        other1: Yup.string(),
        other2: Yup.string(),
      })
      .optional(),
    isVideoConference: Yup.boolean().optional(),
    serviceColor: Yup.object().shape({
      colorId: Yup.string(),
      colorName: Yup.string(),
      hexCode: Yup.string(),
      isSelected: Yup.mixed().optional(),
      isDefault: Yup.mixed().optional(),
    }),
    imageUrl: Yup.string().optional(),
  });
