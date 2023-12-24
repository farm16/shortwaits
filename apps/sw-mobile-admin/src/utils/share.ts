import { useCallback, useState } from "react";
import Share from "react-native-share";
import { ShareOpenResult, ShareOptions } from "react-native-share/lib/typescript/src/types";

function getErrorString(error, defaultValue = "Something went wrong. Please try again") {
  let e = defaultValue;
  if (typeof error === "string") {
    e = error;
  } else if (error && error.message) {
    e = error.message;
  } else if (error && error.props) {
    e = error.props;
  }
  return e;
}

/**
 * Basic share with url & message
 */

export const useShareUrlWithMessage = () => {
  const [result, setResult] = useState<ShareOpenResult>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const share = useCallback(async (shareOptions: ShareOptions) => {
    setLoading(true);
    try {
      const shareResponse = await Share.open(shareOptions);
      setResult(shareResponse);
    } catch (error) {
      setError(getErrorString(error));
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data: result,
    error,
    loading,
    share,
  };
};
