import * as Yup from "yup";

export const hours = Yup.object().shape({
  mon: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.number(),
      endTime: Yup.number(),
      isActive: Yup.boolean(),
    })
  ),
  tue: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.number(),
      endTime: Yup.number(),
      isActive: Yup.boolean(),
    })
  ),
  wed: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.number(),
      endTime: Yup.number(),
      isActive: Yup.boolean(),
    })
  ),
  thu: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.number(),
      endTime: Yup.number(),
      isActive: Yup.boolean(),
    })
  ),
  fri: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.number(),
      endTime: Yup.number(),
      isActive: Yup.boolean(),
    })
  ),
  sat: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.number(),
      endTime: Yup.number(),
      isActive: Yup.boolean(),
    })
  ),
  sun: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.number(),
      endTime: Yup.number(),
      isActive: Yup.boolean(),
    })
  ),
});

export const hoursOptional = hours.optional();
