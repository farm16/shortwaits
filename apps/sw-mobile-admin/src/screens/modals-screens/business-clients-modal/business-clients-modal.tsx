import { FC } from "react";
import { BusinessClientsModalScreenMode, ModalsScreenProps } from "../../../navigation";
import { ClientsListModal } from "./clients-list";
import { ClientsSelectorModal } from "./clients-selector";
import { LocalClientsListModal } from "./local-clients-list";
import { LocalClientsSelectorModal } from "./local-clients-selector";
import { SwClientsListModal } from "./sw-clients-list";
import { SwClientsSelectorModal } from "./sw-clients-selector";

const businessClientsModalModes: Record<BusinessClientsModalScreenMode, FC<ModalsScreenProps<"business-clients-modal-screen">>> = {
  "clients-list": ClientsListModal,
  "client-selector": ClientsSelectorModal,
  "local-clients-list": LocalClientsListModal,
  "local-client-selector": LocalClientsSelectorModal,
  "sw-clients-list": SwClientsListModal,
  "sw-client-selector": SwClientsSelectorModal,
};

export const BusinessClientsModal: FC<ModalsScreenProps<"business-clients-modal-screen">> = props => {
  const mode = props.route.params.mode;
  const BusinessClientsModalComponent = businessClientsModalModes[mode];

  return <BusinessClientsModalComponent {...props} />;
};
