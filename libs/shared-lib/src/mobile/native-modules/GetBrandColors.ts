import { NativeModules } from "react-native";

interface BrandColorsType {
  primary: string;
  secondary: string;
  accent: string;
}

export const isNativeModuleAvailable = (): boolean => {
  return NativeModules["GetBrandColors"] !== undefined;
};

export const getBrandColors = (): Promise<BrandColorsType> => {
  return new Promise((resolve, reject) => {
    if (isNativeModuleAvailable()) {
      NativeModules["GetBrandColors"]
        .then((result: BrandColorsType) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    } else {
      reject(new Error("GetBrandColors is not available."));
    }
  });
};
