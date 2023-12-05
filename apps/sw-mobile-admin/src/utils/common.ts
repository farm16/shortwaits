import { ClientUsersDtoType, LocalClientUsersDtoType } from "@shortwaits/shared-lib";
import { isEqual, noop } from "lodash";
import { Alert } from "react-native";

export const getArrCount = (arr: string[] | null) => arr?.length ?? 0;

export const isObjsEqual = (obj1: any, obj2: any) => {
  return isEqual(obj1, obj2);
};

export const isObjsEqualWithAlert = (obj1: any, obj2: any, onAccept = noop) => {
  if (!isEqual(obj1, obj2)) {
    Alert.alert("Changes detected", "You have unsaved changes. Are you sure you want to leave?", [
      {
        text: "Yes",
        onPress: () => onAccept(),
      },
      { text: "No", onPress: () => console.log("No Pressed") },
    ]);
  } else {
    onAccept();
  }
};

// this combines clients with local clients into a single array
export const getCombinedClientTypes = (clients: ClientUsersDtoType, localClients: LocalClientUsersDtoType) => {
  const combinedClients = [...clients, ...localClients];
  return combinedClients;
};
