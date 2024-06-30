import { BusinessDtoType, ClientsDtoType, LocalClientsDtoType } from "@shortwaits/shared-lib";
import { isEqual } from "lodash";
import { Alert } from "react-native";

export const getArrCount = (arr: string[] | null) => {
  //check if array is null or undefined or empty
  if (!arr || arr.length === 0) {
    return 0;
  } else {
    return arr.length;
  }
};

export const isObjsEqual = (obj1: any, obj2: any) => {
  return isEqual(obj1, obj2);
};

type CompareFormObjectsBeforeAbortType = {
  obj1: object;
  obj2: object;
  onAbort?: () => void;
};
export const compareFormObjectsBeforeAbort = ({ obj1, obj2, onAbort }: CompareFormObjectsBeforeAbortType) => {
  console.log("obj1 >>>", obj1);
  console.log("obj2 >>>", obj2);

  if (isEqual(obj1, obj2)) {
    console.log("isEqual");
    onAbort && onAbort();
  } else {
    console.log("not equal");
    Alert.alert("Changes detected", "You have unsaved changes. Are you sure you want to leave?", [
      {
        text: "Yes",
        onPress: () => {
          onAbort && onAbort();
        },
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

export const getSelectedClients = (clients: ClientsDtoType, localClients: LocalClientsDtoType) => {
  const selectedClientsIds = clients.map(client => client._id);
  const selectedLocalClientsIds = localClients.map(client => client._id);
  return {
    clients: selectedClientsIds,
    localClients: selectedLocalClientsIds,
  };
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

export const getIsBusinessOpenToday = (business: BusinessDtoType) => {
  const today = new Date().getDay();

  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  console.log("days >>>", days);
  const day = days[today];

  console.log("today >>>", today);
  console.log("day >>>", JSON.stringify(day));

  const todaysHours = business?.hours[day as keyof BusinessDtoType["hours"]];
  return todaysHours.some(hour => hour.isActive);
};
