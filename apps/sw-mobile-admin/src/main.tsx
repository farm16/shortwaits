import "fast-text-encoding"; // polyfill for TextEncoder and TextDecoder, remove when when RN gets updated to 0.74
import { AppRegistry, LogBox } from "react-native";
import "react-native-gesture-handler";
import "react-native-get-random-values";
import { App } from "./App";

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state", "Require cycle: ../../node_modules/victory"]);

AppRegistry.registerComponent("SwMobileAdmin", () => App);
