import { useTranslation } from "react-i18next";
import { useDebugLoading } from "./use_debug_loading";

export const useTranslationWithSkeleton = (
  ...args: Parameters<typeof useTranslation>
) => {
  const translation = useTranslation(...args);
  const debugLoading = useDebugLoading();
  const loading = !translation.ready || debugLoading;

  return {
    ...translation,
    loading,
  };
};
