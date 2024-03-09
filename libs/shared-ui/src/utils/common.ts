import { ClientsDtoType, LocalClientsDtoType } from "@shortwaits/shared-lib";
import { isEqual, noop } from "lodash";
import { Alert } from "react-native";

export const getArrCount = (arr: string[] | null) => arr?.length ?? 0;

export const isObjsEqual = (obj1: any, obj2: any) => {
  return isEqual(obj1, obj2);
};

export const compareFormObjectsBeforeAbort = ({ obj1, obj2, onAbort = noop }) => {
  console.log("obj1", obj1);
  console.log("obj2", obj2);

  if (isEqual(obj1, obj2)) {
    onAbort();
  } else {
    Alert.alert("Changes detected", "You have unsaved changes. Are you sure you want to leave?", [
      {
        text: "Yes",
        onPress: () => onAbort(),
      },
      { text: "No", onPress: () => console.log("No Pressed") },
    ]);
  }
};

// this combines clients with local clients into a single array
export const getCombinedClientTypes = (clients: ClientsDtoType, localClients: LocalClientsDtoType) => {
  const combinedClients = [...clients, ...localClients];
  return combinedClients;
};

// this converts id to asdd-asdas-asdds every 4 characters
export const getFriendlyShortId = (inputId: string) => {
  // Check if the inputId is a valid string
  if (typeof inputId !== "string") {
    return "";
  }

  // Remove any non-alphanumeric characters from the inputId
  const cleanedId = inputId.replace(/[^a-zA-Z0-9]/g, "");
  // Split the cleanedId into chunks of 4 characters
  const chunks = cleanedId.match(/.{1,4}/g) || [];
  // Join the chunks with dashes to get the desired format
  const formattedId = chunks.join("-");

  return formattedId;
};
