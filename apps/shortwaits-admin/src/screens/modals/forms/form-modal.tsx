import React, { FC } from "react";

import { AuthorizedScreenProps, FormModalTypes } from "../../../navigation";
import { AddClientModal } from "./add-client";
import { AddEventModal } from "./add-event";
import { AddStaffModal } from "./add-staff";

const formTypes: Record<
  FormModalTypes,
  FC<AuthorizedScreenProps<"form-modal-screen">>
> = {
  addClient: AddClientModal,
  addEvent: AddEventModal,
  addStaff: AddStaffModal,
};

export const FormModalScreen: FC<AuthorizedScreenProps<"form-modal-screen">> = (
  props
) => {
  const formType = props.route.params.formType;
  const Form = formTypes[formType];
  return <Form {...props} />;
};
