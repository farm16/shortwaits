import { Storage } from "redux-persist";
import { MMKV } from "react-native-mmkv";

const mmkvStorage = new MMKV();

const storage: Storage = {
  setItem: (key, value) => {
    mmkvStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = mmkvStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    mmkvStorage.delete(key);
    return Promise.resolve();
  },
};

export const persistRootConfig = {
  key: "root",
  version: 1,
  storage,
};
