import ToastMessage, { ToastProps } from "react-native-toast-message";

export const Toast = (props: ToastProps) => {
  return <ToastMessage {...props} />;
};
