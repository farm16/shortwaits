import { merge } from "lodash";

export let initialProps = {
  brandColors: {
    primary: "#FF0000",
    secondary: "#00FF00",
    tertiary: "#0000FF",
  },
};

export type InitialProps = typeof initialProps;

export const setInitialProps = (props: InitialProps) => {
  const initialPropsObject = JSON.parse(JSON.stringify(props));
  console.log("Setting initialPropsObject >>>", initialPropsObject);
  initialProps = merge(initialProps, initialPropsObject);
};
