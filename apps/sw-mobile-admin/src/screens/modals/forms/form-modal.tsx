import React, { FC, useEffect } from "react";

import { useHideGhostComponent } from "../../../store";
import { ModalsScreenProps, FormType } from "../../../navigation";
import { AddClientModal } from "./add-client";
import { AddEventModal } from "./add-event";
import { AddStaffModal } from "./add-staff";

const forms: Record<FormType, FC<ModalsScreenProps<"form-modal-screen">>> = {
  addClient: AddClientModal,
  addEvent: AddEventModal,
  addStaff: AddStaffModal,
};

export const FormModalScreen: FC<
  ModalsScreenProps<"form-modal-screen">
> = props => {
  const form = props.route.params.form;
  const Form = forms[form];

  useHideGhostComponent();

  return <Form {...props} />;
};
