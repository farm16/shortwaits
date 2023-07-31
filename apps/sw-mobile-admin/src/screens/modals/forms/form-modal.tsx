import React, { FC, useEffect } from "react";

import { ModalsScreenProps, FormType } from "../../../navigation";
import { AddClientModal } from "./add-client";
import { AddEventModal } from "./add-event";
import { AddStaffModal } from "./add-staff";
import { UpdateEventModal } from "./update-event";

const forms: Record<FormType, FC<ModalsScreenProps<"form-modal-screen">>> = {
  addClient: AddClientModal,
  addEvent: AddEventModal,
  addStaff: AddStaffModal,
  updateEvent: UpdateEventModal,
};

export const FormModalScreen: FC<ModalsScreenProps<"form-modal-screen">> = props => {
  const form = props.route.params.form;
  const Form = forms[form];

  return <Form {...props} />;
};
