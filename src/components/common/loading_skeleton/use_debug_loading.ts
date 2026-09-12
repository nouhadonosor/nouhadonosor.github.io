import { useEffect, useState } from "react";

const DEBUG_LOADING_PARAM = "debugLoading";
const DEFAULT_DEBUG_LOADING_DURATION = 2000;

export const useDebugLoading = (
  duration = DEFAULT_DEBUG_LOADING_DURATION
): boolean => {
  const [debugLoadingActive, setDebugLoadingActive] = useState(() =>
    new URLSearchParams(window.location.search).has(DEBUG_LOADING_PARAM)
  );

  useEffect(() => {
    if (!debugLoadingActive) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setDebugLoadingActive(false);
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [debugLoadingActive, duration]);

  return debugLoadingActive;
};
