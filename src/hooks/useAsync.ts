import { useState, useCallback } from "react";

import { AsyncStatuses } from "../ts/appTypes";

/**
 *
 * @param asyncFunction An async function that will be called by the returned `execute` function
 */
const useAsync = <T, E = string>(asyncFunction: (...args: any) => Promise<T>) => {
  // OPTIMIZE: include an options parameter to specify { handleError, handleSuccess, immediate}
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
      } catch (error) {
        setError(error.message || "Unexpected Error");
        setStatus(AsyncStatuses.ERROR);
      }
    },
    [asyncFunction]
  );

  return { execute, status, value, error };
};

export default useAsync;
