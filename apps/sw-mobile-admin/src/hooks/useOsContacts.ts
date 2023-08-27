import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import Contacts from "react-native-contacts";
import { getUsersFromOsContacts } from "../utils/getUsersFromOsContacts";

export function useOsContacts() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getContacts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (Platform.OS === "android") {
        const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: "Contacts",
          message: "This app would like to access your contacts.",
          buttonPositive: "",
        });
        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error("Permission denied from useOsContacts.");
        }
      }

      const contacts = await Contacts.getAll();
      const count = await Contacts.getCount();

      const dataPayload = getUsersFromOsContacts(contacts);

      setIsLoading(false);
      return {
        contactsCount: count,
        data: dataPayload,
      };
    } catch (error) {
      console.log("[hook:useOsContacts] >>>", error);
      setIsLoading(false);
      setError(error);
      throw error;
    }
  };

  return {
    isLoading,
    error,
    getContacts,
  };
}
