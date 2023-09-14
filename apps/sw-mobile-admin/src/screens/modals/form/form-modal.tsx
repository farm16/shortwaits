import React, { FC } from "react";

import { ModalsScreenProps, FormType } from "../../../navigation";
import { AddClientModal } from "./forms/add-client";
import { AddEventModal } from "./forms/add-event";
import { AddStaffModal } from "./forms/add-staff";
import { UpdateEventModal } from "./forms/update-event";
import { AddServicesModal } from "./forms/add-service";
import { UpdateServicesModal } from "./forms/update-service";

const forms: Record<FormType, FC<ModalsScreenProps<"form-modal-screen">>> = {
  addClient: AddClientModal,
  addEvent: AddEventModal,
  addStaff: AddStaffModal,
  addService: AddServicesModal,
  updateService: UpdateServicesModal,
  updateEvent: UpdateEventModal,
};

export const FormModalScreen: FC<ModalsScreenProps<"form-modal-screen">> = props => {
  const form = props.route.params.form;
  const Form = forms[form];

  return <Form {...props} />;
};
