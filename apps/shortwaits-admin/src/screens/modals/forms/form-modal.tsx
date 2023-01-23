import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import { changeFloatingActionButtonVisibility } from "../../../redux";
import { AuthorizedScreenProps, FormType } from "../../../navigation";
import { AddClientModal } from "./add-client";
import { AddEventModal } from "./add-event";
import { AddStaffModal } from "./add-staff";

const forms: Record<
  FormType,
  FC<AuthorizedScreenProps<"form-modal-screen">>
> = {
  addClient: AddClientModal,
  addEvent: AddEventModal,
  addStaff: AddStaffModal,
};

export const FormModalScreen: FC<AuthorizedScreenProps<"form-modal-screen">> = (
  props
) => {
  const form = props.route.params.form;
  const Form = forms[form];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeFloatingActionButtonVisibility());
    return () => {
      dispatch(changeFloatingActionButtonVisibility());
    };
  }, [dispatch]);
  return <Form {...props} />;
};
