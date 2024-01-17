import { useNavigation } from "@react-navigation/native";
import { AUTHORIZED_SCREENS_TYPES, AuthorizedScreenProps, MODAL_SCREENS_TYPES, ModalsScreenProps, UNAUTHORIZED_SCREENS_TYPES, UnauthorizedScreenProps } from "../navigation-types";

export const useModalScreensNavigation = <T extends MODAL_SCREENS_TYPES>() => {
  const _ = useNavigation<ModalsScreenProps<T>["navigation"]>();
  return _;
};

export const useAuthorizedScreensNavigation = <T extends AUTHORIZED_SCREENS_TYPES>() => {
  const _ = useNavigation<AuthorizedScreenProps<T>["navigation"]>();
  return _;
};

export const useUnauthorizedScreensNavigation = <T extends UNAUTHORIZED_SCREENS_TYPES>() => {
  const _ = useNavigation<UnauthorizedScreenProps<T>["navigation"]>();
  return _;
};
