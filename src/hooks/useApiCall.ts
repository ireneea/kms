import { useState } from "react";

/**
 * OPTIMIZE: rename this async call
 */
export const useApiCall = () => {
  const [lastResponse, setLastResponse] = useState((): any => undefined);
  const [isLoading, setIsLoading] = useState((): boolean => false);
  const [lastError, setLastError] = useState((): any => undefined);

  const callApi = (apiCall: () => Promise<any>) => {
    const start = async () => {
      let response;
      setIsLoading(true);

      try {
        response = await apiCall();
        setLastResponse(response);
        setLastError(undefined);
      } catch (err) {
        setLastResponse(undefined);
        setLastError(err);
      }

      setIsLoading(false);
    };

    start();
  };

  return {
    lastResponse,
    lastError,
    isLoading,
    callApi,
  };
};

export default useApiCall;
