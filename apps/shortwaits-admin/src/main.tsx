import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import { App } from "./App";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
AppRegistry.registerComponent("ShortwaitsAdmin", () => App);
