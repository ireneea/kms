import { useState, useCallback } from "react";

import { AsyncStatuses } from "../ts/appTypes";

type Options = {
  handleError?: (errorMsg: string) => void;
  handleSuccess?: (result?: any) => void;
};

/**
 * @param asyncFunction An async function that will be called by the returned `execute` function
 */
const useAsync = <T, E = string>(asyncFunction: (...args: any) => Promise<T>, options?: Options) => {
  // OPTIMIZE: include an options parameter to specify { handleError, handleSuccess, immediate}
  // OPTIMIZE: define the arguments that need to be passed to the the execute function in the typescript
  const { handleError, handleSuccess } = options || {};

  const [status, setStatus] = useState(AsyncStatuses.IDLE);
  const [value, setValue] = useState<T | undefined>(undefined);
  const [error, setError] = useState<E | undefined>(undefined);

  const execute = useCallback(
    async (...args) => {
      setStatus(AsyncStatuses.PENDING);
      setValue(undefined);
      setError(undefined);

      try {
        const result = await asyncFunction(...args);
        setValue(result);
        setStatus(AsyncStatuses.SUCCESS);
        if (handleSuccess) {
          handleSuccess(result);
        }
      } catch (error) {
        const errorMsg = error.message || "Unexpected Error";
        setError(errorMsg);
        setStatus(AsyncStatuses.ERROR);
        if (handleError) {
          handleError(errorMsg);
        }
      }
    },
    [asyncFunction, handleError, handleSuccess]
  );

  return { execute, status, value, error };
};

export default useAsync;
